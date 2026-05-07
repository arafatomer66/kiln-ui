import { CdkConnectedOverlay, CdkOverlayOrigin, ConnectedPosition } from '@angular/cdk/overlay';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
  output,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

let nextComboId = 0;

export interface KnComboOption<T = unknown> {
  value: T;
  label: string;
  description?: string;
  disabled?: boolean;
}

const POSITIONS: ConnectedPosition[] = [
  { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top',    offsetY: 4 },
  { originX: 'start', originY: 'top',    overlayX: 'start', overlayY: 'bottom', offsetY: -4 },
];

@Component({
  selector: 'kn-combobox',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CdkConnectedOverlay, CdkOverlayOrigin],
  template: `
    @if (label()) {
      <label class="kn-combo__label" [attr.for]="comboId">{{ label() }}</label>
    }

    <div
      class="kn-combo"
      cdkOverlayOrigin
      #origin="cdkOverlayOrigin"
      [attr.data-invalid]="invalid() ? 'true' : null"
    >
      <input
        #input
        class="kn-combo__input"
        type="text"
        autocomplete="off"
        [id]="comboId"
        [placeholder]="placeholder()"
        [disabled]="disabled()"
        [value]="displayValue()"
        [attr.aria-expanded]="open()"
        [attr.aria-controls]="comboId + '-listbox'"
        [attr.aria-autocomplete]="'list'"
        [attr.role]="'combobox'"
        (input)="onInput($event)"
        (focus)="onFocus()"
        (blur)="onBlur()"
        (keydown)="onKeydown($event)"
      />
      @if (selectedValue() !== null && clearable()) {
        <button type="button" class="kn-combo__clear" aria-label="Clear" (click)="clear()">×</button>
      }
      <span class="kn-combo__caret" aria-hidden="true">▾</span>
    </div>

    <ng-template
      cdkConnectedOverlay
      [cdkConnectedOverlayOrigin]="origin"
      [cdkConnectedOverlayOpen]="open()"
      [cdkConnectedOverlayPositions]="positions"
      [cdkConnectedOverlayHasBackdrop]="false"
      (overlayOutsideClick)="close()"
    >
      <ul class="kn-combo__menu" [id]="comboId + '-listbox'" role="listbox">
        @if (loading()) {
          <li class="kn-combo__state">Loading…</li>
        } @else if (filtered().length === 0) {
          <li class="kn-combo__state">{{ noResultsText() }}</li>
        } @else {
          @for (option of filtered(); track option.value; let i = $index) {
            <li
              class="kn-combo__option"
              role="option"
              [attr.aria-selected]="selectedValue() === option.value"
              [class.is-active]="i === activeIndex()"
              [class.is-selected]="selectedValue() === option.value"
              [class.is-disabled]="option.disabled"
              (mousedown)="onSelect(option, $event)"
              (mouseenter)="activeIndex.set(i)"
            >
              <div class="kn-combo__option-label">{{ option.label }}</div>
              @if (option.description) {
                <div class="kn-combo__option-desc">{{ option.description }}</div>
              }
            </li>
          }
        }
      </ul>
    </ng-template>

    @if (helperText()) {
      <div class="kn-combo__helper">{{ helperText() }}</div>
    }
  `,
  styles: [`
    :host { display: block; font-family: var(--kn-font-sans); position: relative; }

    .kn-combo__label {
      display: block;
      font-family: var(--kn-font-mono);
      font-size: var(--kn-fs-xs);
      font-weight: var(--kn-fw-bold);
      letter-spacing: var(--kn-tracking-mono);
      text-transform: uppercase;
      color: var(--kn-text);
      margin-bottom: var(--kn-sp-2);
    }

    .kn-combo {
      display: flex;
      align-items: center;
      background: var(--kn-bg);
      border: var(--kn-bw-2) solid var(--kn-border-strong);
      border-radius: var(--kn-r-sm);
      transition: box-shadow var(--kn-dur-fast) var(--kn-ease);
    }
    .kn-combo:focus-within { box-shadow: var(--kn-ring); }
    .kn-combo[data-invalid='true'] { border-color: var(--kn-danger); }

    .kn-combo__input {
      flex: 1;
      min-width: 0;
      height: 36px;
      padding: 0 var(--kn-sp-3);
      background: transparent;
      color: var(--kn-text);
      font-family: inherit;
      font-size: var(--kn-fs-base);
      border: none;
      outline: none;
    }
    .kn-combo__input::placeholder { color: var(--kn-text-muted); opacity: 0.7; }
    .kn-combo__input:disabled { opacity: 0.6; cursor: not-allowed; }

    .kn-combo__clear, .kn-combo__caret {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      color: var(--kn-text-muted);
      font-size: 14px;
    }
    .kn-combo__clear { all: unset; cursor: pointer; }
    .kn-combo__clear:hover { color: var(--kn-text); }

    .kn-combo__menu {
      list-style: none;
      margin: 0;
      padding: var(--kn-sp-1);
      max-height: 280px;
      overflow-y: auto;
      background: var(--kn-bg);
      border: var(--kn-bw-2) solid var(--kn-border-strong);
      border-radius: var(--kn-r-sm);
      box-shadow: var(--kn-shadow-stamp-strong);
      min-width: 200px;
    }

    .kn-combo__state {
      padding: var(--kn-sp-3);
      color: var(--kn-text-muted);
      font-size: var(--kn-fs-sm);
      text-align: center;
      font-style: italic;
    }

    .kn-combo__option {
      padding: var(--kn-sp-2) var(--kn-sp-3);
      cursor: pointer;
      border-radius: var(--kn-r-xs);
    }
    .kn-combo__option.is-active { background: var(--kn-surface); }
    .kn-combo__option.is-selected { background: var(--kn-info-bg); color: var(--kn-brand); }
    .kn-combo__option.is-disabled { opacity: 0.5; cursor: not-allowed; }

    .kn-combo__option-label { font-size: var(--kn-fs-base); }
    .kn-combo__option-desc {
      font-size: var(--kn-fs-xs);
      color: var(--kn-text-muted);
      margin-top: 2px;
    }

    .kn-combo__helper {
      margin-top: var(--kn-sp-2);
      font-size: var(--kn-fs-sm);
      color: var(--kn-text-muted);
    }
  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => KnComboboxComponent),
      multi: true,
    },
  ],
})
export class KnComboboxComponent<T = unknown> implements ControlValueAccessor {
  readonly comboId = `kn-combo-${nextComboId++}`;

  readonly options = input<KnComboOption<T>[]>([]);
  readonly label = input<string>('');
  readonly placeholder = input<string>('Type to search…');
  readonly noResultsText = input<string>('No matches found');
  readonly helperText = input<string>('');
  readonly disabled = input<boolean>(false);
  readonly invalid = input<boolean>(false);
  readonly clearable = input<boolean>(true);
  readonly loading = input<boolean>(false);

  readonly searchChange = output<string>();
  readonly valueChange = output<T | null>();

  protected readonly positions = POSITIONS;

  readonly selectedValue = signal<T | null>(null);
  readonly searchTerm = signal<string>('');
  readonly open = signal<boolean>(false);
  readonly activeIndex = signal<number>(0);

  readonly displayValue = computed(() => {
    if (this.open()) return this.searchTerm();
    const v = this.selectedValue();
    if (v === null || v === undefined) return '';
    return this.options().find((o) => o.value === v)?.label ?? '';
  });

  readonly filtered = computed<KnComboOption<T>[]>(() => {
    const term = this.searchTerm().toLowerCase().trim();
    const all = this.options();
    if (!term) return all;
    return all.filter((o) =>
      o.label.toLowerCase().includes(term) ||
      o.description?.toLowerCase().includes(term)
    );
  });

  protected onInput(event: Event): void {
    const v = (event.target as HTMLInputElement).value;
    this.searchTerm.set(v);
    this.searchChange.emit(v);
    this.open.set(true);
    this.activeIndex.set(0);
  }

  protected onFocus(): void {
    if (this.disabled()) return;
    this.open.set(true);
  }

  protected onBlur(): void {
    this.onTouched();
  }

  protected close(): void {
    this.open.set(false);
    this.searchTerm.set('');
  }

  protected onKeydown(event: KeyboardEvent): void {
    const items = this.filtered();
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.open.set(true);
      this.activeIndex.update((i) => Math.min(i + 1, items.length - 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.activeIndex.update((i) => Math.max(i - 1, 0));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      const item = items[this.activeIndex()];
      if (item && !item.disabled) this.commit(item);
    } else if (event.key === 'Escape') {
      this.close();
    }
  }

  protected onSelect(option: KnComboOption<T>, event: MouseEvent): void {
    event.preventDefault();
    if (option.disabled) return;
    this.commit(option);
  }

  protected clear(): void {
    this.selectedValue.set(null);
    this.searchTerm.set('');
    this.onChange(null);
    this.valueChange.emit(null);
  }

  private commit(option: KnComboOption<T>): void {
    this.selectedValue.set(option.value);
    this.searchTerm.set('');
    this.onChange(option.value);
    this.valueChange.emit(option.value);
    this.close();
  }

  // CVA
  private onChange: (v: T | null) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: T | null): void { this.selectedValue.set(value); }
  registerOnChange(fn: (v: T | null) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(_: boolean): void {}
}
