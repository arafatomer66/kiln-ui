import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  forwardRef,
  input,
  output,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

let nextTagId = 0;

@Component({
  selector: 'kn-tag-input',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (label()) {
      <label class="kn-taginput__label" [attr.for]="tagId">
        <span>{{ label() }}</span>
        @if (hint()) {
          <span class="kn-taginput__hint">{{ hint() }}</span>
        }
      </label>
    }

    <div
      class="kn-taginput"
      [attr.data-invalid]="invalid() ? 'true' : null"
      [attr.data-disabled]="disabled() ? 'true' : null"
      (click)="focus()"
    >
      @for (tag of tags(); track $index; let i = $index) {
        <span class="kn-taginput__tag">
          {{ tag }}
          <button
            type="button"
            class="kn-taginput__remove"
            [attr.aria-label]="'Remove ' + tag"
            (click)="removeAt(i, $event)"
          >×</button>
        </span>
      }
      <input
        #input
        class="kn-taginput__input"
        type="text"
        [id]="tagId"
        [placeholder]="tags().length === 0 ? placeholder() : ''"
        [disabled]="disabled()"
        [attr.aria-label]="ariaLabel() || label() || 'Tags'"
        (keydown)="onKeydown($event)"
        (blur)="commitOnBlur()"
        (input)="onInput($event)"
      />
    </div>

    @if (errorMessage() && invalid()) {
      <div class="kn-taginput__error">
        <span class="kn-taginput__icon">✕</span>{{ errorMessage() }}
      </div>
    } @else if (helperText()) {
      <div class="kn-taginput__helper">{{ helperText() }}</div>
    }
  `,
  styles: [`
    :host { display: block; font-family: var(--kn-font-sans); }

    .kn-taginput__label {
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
    .kn-taginput__hint { color: var(--kn-text-muted); font-weight: var(--kn-fw-regular); }

    .kn-taginput {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--kn-sp-2);
      min-height: 36px;
      padding: 4px var(--kn-sp-2);
      background: var(--kn-bg);
      border: var(--kn-bw-2) solid var(--kn-border-strong);
      border-radius: var(--kn-r-sm);
      cursor: text;
      transition: box-shadow var(--kn-dur-fast) var(--kn-ease);
    }
    .kn-taginput:focus-within { box-shadow: var(--kn-ring); }
    .kn-taginput[data-invalid='true'] { border-color: var(--kn-danger); }
    .kn-taginput[data-disabled='true'] { opacity: 0.6; cursor: not-allowed; }

    .kn-taginput__tag {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 2px var(--kn-sp-2);
      background: var(--kn-info-bg);
      color: var(--kn-brand);
      font-size: var(--kn-fs-sm);
      border-radius: var(--kn-r-xs);
      border: var(--kn-bw-1) solid var(--kn-indigo-300);
    }

    .kn-taginput__remove {
      all: unset;
      cursor: pointer;
      font-size: 14px;
      line-height: 1;
      color: var(--kn-brand);
      padding: 0 2px;
    }
    .kn-taginput__remove:hover { color: var(--kn-brand-strong); }

    .kn-taginput__input {
      flex: 1;
      min-width: 100px;
      border: none;
      outline: none;
      background: transparent;
      color: var(--kn-text);
      font-family: inherit;
      font-size: var(--kn-fs-base);
      padding: 4px 0;
    }
    .kn-taginput__input::placeholder { color: var(--kn-text-muted); opacity: 0.7; }

    .kn-taginput__helper, .kn-taginput__error {
      margin-top: var(--kn-sp-2);
      font-size: var(--kn-fs-sm);
    }
    .kn-taginput__helper { color: var(--kn-text-muted); }
    .kn-taginput__error  { color: var(--kn-danger); }
    .kn-taginput__icon   { margin-right: var(--kn-sp-1); font-weight: var(--kn-fw-bold); }
  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => KnTagInputComponent),
      multi: true,
    },
  ],
})
export class KnTagInputComponent implements ControlValueAccessor {
  readonly tagId = `kn-tag-${nextTagId++}`;

  readonly label = input<string>('');
  readonly hint = input<string>('');
  readonly placeholder = input<string>('Type and press Enter…');
  readonly helperText = input<string>('');
  readonly errorMessage = input<string>('');
  readonly invalid = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly maxTags = input<number>(20);
  readonly allowDuplicates = input<boolean>(false);
  readonly ariaLabel = input<string>('');

  readonly tagsChange = output<string[]>();

  readonly tags = signal<string[]>([]);
  protected readonly inputValue = signal<string>('');

  @ViewChild('input', { static: true }) private inputRef!: ElementRef<HTMLInputElement>;

  protected focus(): void { this.inputRef.nativeElement.focus(); }

  protected onInput(event: Event): void {
    this.inputValue.set((event.target as HTMLInputElement).value);
  }

  protected onKeydown(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    if (event.key === 'Enter' || event.key === ',' || event.key === 'Tab') {
      const v = input.value.trim();
      if (v) {
        event.preventDefault();
        this.add(v);
        input.value = '';
        this.inputValue.set('');
      }
    } else if (event.key === 'Backspace' && !input.value && this.tags().length > 0) {
      event.preventDefault();
      this.removeAt(this.tags().length - 1, event as unknown as MouseEvent);
    }
  }

  protected commitOnBlur(): void {
    const v = this.inputRef.nativeElement.value.trim();
    if (v) {
      this.add(v);
      this.inputRef.nativeElement.value = '';
      this.inputValue.set('');
    }
    this.onTouched();
  }

  protected removeAt(index: number, event: Event): void {
    event.stopPropagation();
    if (this.disabled()) return;
    const next = [...this.tags()];
    next.splice(index, 1);
    this.tags.set(next);
    this.emit();
  }

  private add(value: string): void {
    if (this.disabled()) return;
    if (this.tags().length >= this.maxTags()) return;
    if (!this.allowDuplicates() && this.tags().includes(value)) return;
    this.tags.set([...this.tags(), value]);
    this.emit();
  }

  private emit(): void {
    this.onChange(this.tags());
    this.tagsChange.emit(this.tags());
  }

  // CVA
  private onChange: (v: string[]) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string[] | null): void { this.tags.set(value ?? []); }
  registerOnChange(fn: (v: string[]) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(_: boolean): void {}
}
