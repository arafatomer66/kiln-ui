import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
  output,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

let nextId = 0;

@Component({
  selector: 'kn-number-format-input',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (label()) {
      <label class="kn-nfi__label" [attr.for]="inputId">
        <span>{{ label() }}</span>
        @if (hint()) {
          <span class="kn-nfi__hint">{{ hint() }}</span>
        }
      </label>
    }

    <div class="kn-nfi" [attr.data-invalid]="invalid() ? 'true' : null">
      @if (prefix()) {
        <span class="kn-nfi__addon">{{ prefix() }}</span>
      }
      <input
        class="kn-nfi__input"
        type="text"
        inputmode="decimal"
        [id]="inputId"
        [placeholder]="placeholder()"
        [disabled]="disabled()"
        [value]="display()"
        [attr.aria-invalid]="invalid() ? 'true' : null"
        (input)="onInput($event)"
        (blur)="onBlur()"
      />
      @if (suffix()) {
        <span class="kn-nfi__addon kn-nfi__addon--suffix">{{ suffix() }}</span>
      }
    </div>

    @if (errorMessage() && invalid()) {
      <div class="kn-nfi__error">
        <span class="kn-nfi__icon">✕</span>{{ errorMessage() }}
      </div>
    } @else if (helperText()) {
      <div class="kn-nfi__helper">{{ helperText() }}</div>
    }
  `,
  styles: [`
    :host { display: block; font-family: var(--kn-font-sans); }

    .kn-nfi__label {
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
    .kn-nfi__hint { color: var(--kn-text-muted); font-weight: var(--kn-fw-regular); }

    .kn-nfi {
      display: flex;
      align-items: stretch;
      background: var(--kn-bg);
      border: var(--kn-bw-2) solid var(--kn-border-strong);
      border-radius: var(--kn-r-sm);
      overflow: hidden;
      transition: box-shadow var(--kn-dur-fast) var(--kn-ease);
    }
    .kn-nfi:focus-within { box-shadow: var(--kn-ring); }
    .kn-nfi[data-invalid='true'] { border-color: var(--kn-danger); }

    .kn-nfi__addon {
      display: inline-flex;
      align-items: center;
      padding: 0 var(--kn-sp-3);
      background: var(--kn-surface);
      color: var(--kn-text-muted);
      font-family: var(--kn-font-mono);
      font-size: var(--kn-fs-sm);
      border-right: var(--kn-bw-1) solid var(--kn-border);
    }
    .kn-nfi__addon--suffix { border-right: none; border-left: var(--kn-bw-1) solid var(--kn-border); }

    .kn-nfi__input {
      flex: 1;
      min-width: 0;
      height: 36px;
      padding: 0 var(--kn-sp-3);
      background: transparent;
      color: var(--kn-text);
      font-family: var(--kn-font-mono);
      font-size: var(--kn-fs-base);
      border: none;
      outline: none;
      text-align: right;
    }
    .kn-nfi__input::placeholder { color: var(--kn-text-muted); opacity: 0.7; }

    .kn-nfi__helper, .kn-nfi__error {
      margin-top: var(--kn-sp-2);
      font-size: var(--kn-fs-sm);
    }
    .kn-nfi__helper { color: var(--kn-text-muted); }
    .kn-nfi__error  { color: var(--kn-danger); }
    .kn-nfi__icon   { margin-right: var(--kn-sp-1); font-weight: var(--kn-fw-bold); }
  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => KnNumberFormatInputComponent),
      multi: true,
    },
  ],
})
export class KnNumberFormatInputComponent implements ControlValueAccessor {
  readonly inputId = `kn-nfi-${nextId++}`;

  readonly label = input<string>('');
  readonly hint = input<string>('');
  readonly placeholder = input<string>('0');
  readonly prefix = input<string>('');
  readonly suffix = input<string>('');
  readonly helperText = input<string>('');
  readonly errorMessage = input<string>('');
  readonly invalid = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly decimals = input<number>(0);
  readonly thousandSeparator = input<string>(',');
  readonly decimalSeparator = input<string>('.');
  readonly locale = input<string>('en-IN');

  readonly valueChange = output<number | null>();

  readonly value = signal<number | null>(null);
  readonly display = signal<string>('');

  protected onInput(event: Event): void {
    const raw = (event.target as HTMLInputElement).value;
    const cleaned = raw.replace(new RegExp(`\\${this.thousandSeparator()}`, 'g'), '');
    const parsed = parseFloat(cleaned.replace(this.decimalSeparator(), '.'));
    if (isNaN(parsed)) {
      this.value.set(null);
      this.display.set(raw);
    } else {
      this.value.set(parsed);
      this.display.set(this.format(parsed));
    }
    this.onChange(this.value());
    this.valueChange.emit(this.value());
  }

  protected onBlur(): void {
    if (this.value() !== null) {
      this.display.set(this.format(this.value()!));
    }
    this.onTouched();
  }

  private format(n: number): string {
    return new Intl.NumberFormat(this.locale(), {
      minimumFractionDigits: this.decimals(),
      maximumFractionDigits: this.decimals(),
    }).format(n);
  }

  // CVA
  private onChange: (v: number | null) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: number | null): void {
    this.value.set(value);
    this.display.set(value === null || value === undefined ? '' : this.format(value));
  }

  registerOnChange(fn: (v: number | null) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(_: boolean): void {}
}
