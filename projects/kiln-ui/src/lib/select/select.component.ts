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

let nextSelectId = 0;

export interface KnSelectOption<T = unknown> {
  value: T;
  label: string;
  disabled?: boolean;
}

const POSITIONS: ConnectedPosition[] = [
  { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top',    offsetY: 4 },
  { originX: 'start', originY: 'top',    overlayX: 'start', overlayY: 'bottom', offsetY: -4 },
];

@Component({
  selector: 'kn-select',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CdkConnectedOverlay, CdkOverlayOrigin],
  template: `
    @if (label()) {
      <label class="kn-field__label">
        <span>{{ label() }}</span>
        @if (hint()) { <span class="kn-field__label__hint">{{ hint() }}</span> }
      </label>
    }

    <button
      type="button"
      class="kn-select__trigger"
      cdkOverlayOrigin
      #origin="cdkOverlayOrigin"
      [id]="selectId"
      [disabled]="disabled()"
      [attr.aria-haspopup]="'listbox'"
      [attr.aria-expanded]="open()"
      [attr.aria-invalid]="invalid() ? 'true' : null"
      (click)="toggle()"
      (blur)="onBlur()"
    >
      <span class="kn-select__value" [class.is-placeholder]="!selectedLabel()">
        {{ selectedLabel() || placeholder() }}
      </span>
      <span class="kn-select__caret" aria-hidden="true">▾</span>
    </button>

    <ng-template
      cdkConnectedOverlay
      [cdkConnectedOverlayOrigin]="origin"
      [cdkConnectedOverlayOpen]="open()"
      [cdkConnectedOverlayPositions]="positions"
      [cdkConnectedOverlayHasBackdrop]="true"
      cdkConnectedOverlayBackdropClass="kn-overlay-transparent-backdrop"
      [cdkConnectedOverlayWidth]="triggerWidth()"
      (backdropClick)="close()"
    >
      <ul class="kn-select__panel" role="listbox">
        @for (option of options(); track option.value) {
          <li
            class="kn-select__option"
            role="option"
            [attr.aria-selected]="value() === option.value"
            [attr.aria-disabled]="option.disabled ? 'true' : null"
            [class.is-selected]="value() === option.value"
            [class.is-disabled]="option.disabled"
            (click)="onSelect(option)"
          >
            {{ option.label }}
          </li>
        }
      </ul>
    </ng-template>

    @if (errorMessage() && invalid()) {
      <div class="kn-field__helper kn-field__helper--error">
        <span class="kn-field__helper__icon">✕</span>{{ errorMessage() }}
      </div>
    } @else if (helperText()) {
      <div class="kn-field__helper">{{ helperText() }}</div>
    }
  `,
  styles: [`
    :host { display: block; font-family: var(--kn-font-sans); position: relative; }

    .kn-field__label {
      display: flex;
      justify-content: space-between;
      font-family: var(--kn-font-mono);
      font-size: var(--kn-fs-xs);
      font-weight: var(--kn-fw-bold);
      letter-spacing: var(--kn-tracking-mono);
      text-transform: uppercase;
      color: var(--kn-text);
      margin-bottom: var(--kn-sp-2);
    }

    .kn-field__label__hint {
      color: var(--kn-text-muted);
      font-weight: var(--kn-fw-regular);
    }

    .kn-select__trigger {
      all: unset;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 36px;
      padding: 0 var(--kn-sp-3);
      background: var(--kn-bg);
      color: var(--kn-text);
      border: var(--kn-bw-2) solid var(--kn-border-strong);
      border-radius: var(--kn-r-sm);
      cursor: pointer;
      transition: box-shadow var(--kn-dur-fast) var(--kn-ease);

      &:focus-visible { box-shadow: var(--kn-ring); }
      &[disabled] { opacity: 0.6; cursor: not-allowed; }
      &[aria-invalid='true'] { border-color: var(--kn-danger); }
    }

    .kn-select__value { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; text-align: left; }
    .kn-select__value.is-placeholder { color: var(--kn-text-muted); opacity: 0.7; }
    .kn-select__caret { color: var(--kn-text-muted); font-size: 12px; }

    .kn-select__panel {
      list-style: none;
      margin: 0;
      padding: var(--kn-sp-1);
      max-height: 280px;
      overflow-y: auto;
      background: var(--kn-bg);
      border: var(--kn-bw-2) solid var(--kn-border-strong);
      border-radius: var(--kn-r-sm);
      box-shadow: var(--kn-shadow-stamp-strong);
      animation: kn-sel-in 140ms cubic-bezier(0.2, 0.7, 0.2, 1);
    }

    .kn-select__option {
      padding: var(--kn-sp-2) var(--kn-sp-3);
      cursor: pointer;
      border-radius: var(--kn-r-xs);
      font-size: var(--kn-fs-base);
      color: var(--kn-text);

      &:hover, &:focus-visible { background: var(--kn-surface); outline: none; }
      &.is-selected { background: var(--kn-info-bg); color: var(--kn-brand); font-weight: var(--kn-fw-semibold); }
      &.is-disabled { opacity: 0.5; cursor: not-allowed; }
    }

    .kn-field__helper {
      margin-top: var(--kn-sp-2);
      font-size: var(--kn-fs-sm);
      color: var(--kn-text-muted);
    }

    .kn-field__helper--error { color: var(--kn-danger); }
    .kn-field__helper__icon { margin-right: var(--kn-sp-1); font-weight: var(--kn-fw-bold); }

    :host ::ng-deep .kn-overlay-transparent-backdrop { background: transparent; }

    @keyframes kn-sel-in {
      from { opacity: 0; transform: translateY(-4px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => KnSelectComponent),
      multi: true,
    },
  ],
})
export class KnSelectComponent<T = unknown> implements ControlValueAccessor {
  readonly selectId = `kn-select-${nextSelectId++}`;

  readonly options = input<KnSelectOption<T>[]>([]);
  readonly label = input<string>('');
  readonly hint = input<string>('');
  readonly placeholder = input<string>('Select an option');
  readonly disabled = input<boolean>(false);
  readonly invalid = input<boolean>(false);
  readonly helperText = input<string>('');
  readonly errorMessage = input<string>('');

  readonly valueChange = output<T | null>();

  readonly value = signal<T | null>(null);
  readonly open = signal<boolean>(false);

  protected readonly positions = POSITIONS;

  readonly selectedLabel = computed(() => {
    const v = this.value();
    if (v === null || v === undefined) return '';
    return this.options().find((o) => o.value === v)?.label ?? '';
  });

  triggerWidth(): string { return '100%'; }

  protected toggle(): void {
    if (this.disabled()) return;
    this.open.set(!this.open());
  }

  protected close(): void { this.open.set(false); }

  protected onSelect(option: KnSelectOption<T>): void {
    if (option.disabled) return;
    this.value.set(option.value);
    this.onChange(option.value);
    this.valueChange.emit(option.value);
    this.close();
  }

  // CVA
  private onChange: (v: T | null) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: T | null): void { this.value.set(value); }
  registerOnChange(fn: (v: T | null) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(_: boolean): void {}

  protected onBlur(): void { this.onTouched(); }
}
