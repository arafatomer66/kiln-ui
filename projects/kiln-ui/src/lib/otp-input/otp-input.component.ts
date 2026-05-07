import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChildren,
  QueryList,
  forwardRef,
  input,
  output,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

let nextOtpId = 0;

@Component({
  selector: 'kn-otp-input',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (label()) {
      <label class="kn-otp__label" [attr.for]="otpId + '-0'">{{ label() }}</label>
    }

    <div class="kn-otp" [attr.data-invalid]="invalid() ? 'true' : null">
      @for (slot of slots(); track $index; let i = $index) {
        <input
          #input
          class="kn-otp__cell"
          type="text"
          inputmode="numeric"
          autocomplete="one-time-code"
          maxlength="1"
          [id]="otpId + '-' + i"
          [value]="slot"
          [disabled]="disabled()"
          [attr.aria-label]="'Digit ' + (i + 1)"
          (input)="onInput($event, i)"
          (keydown)="onKeydown($event, i)"
          (paste)="onPaste($event)"
          (focus)="onFocus($event)"
        />
      }
    </div>

    @if (errorMessage() && invalid()) {
      <div class="kn-otp__error">
        <span class="kn-otp__icon">✕</span>{{ errorMessage() }}
      </div>
    } @else if (helperText()) {
      <div class="kn-otp__helper">{{ helperText() }}</div>
    }
  `,
  styles: [`
    :host { display: block; font-family: var(--kn-font-sans); }

    .kn-otp__label {
      display: block;
      font-family: var(--kn-font-mono);
      font-size: var(--kn-fs-xs);
      font-weight: var(--kn-fw-bold);
      letter-spacing: var(--kn-tracking-mono);
      text-transform: uppercase;
      color: var(--kn-text);
      margin-bottom: var(--kn-sp-2);
    }

    .kn-otp {
      display: flex;
      gap: var(--kn-sp-2);
    }

    .kn-otp__cell {
      width: 44px;
      height: 52px;
      text-align: center;
      font-family: var(--kn-font-mono);
      font-size: var(--kn-fs-xl);
      font-weight: var(--kn-fw-bold);
      color: var(--kn-text);
      background: var(--kn-bg);
      border: var(--kn-bw-2) solid var(--kn-border-strong);
      border-radius: var(--kn-r-sm);
      caret-color: var(--kn-brand);
      outline: none;
      transition: box-shadow var(--kn-dur-fast) var(--kn-ease), border-color var(--kn-dur-fast) var(--kn-ease);
    }

    .kn-otp__cell:focus-visible { box-shadow: var(--kn-ring); border-color: var(--kn-brand); }

    .kn-otp[data-invalid='true'] .kn-otp__cell { border-color: var(--kn-danger); }

    .kn-otp__cell:disabled { opacity: 0.6; cursor: not-allowed; }

    .kn-otp__helper, .kn-otp__error {
      margin-top: var(--kn-sp-2);
      font-size: var(--kn-fs-sm);
    }
    .kn-otp__helper { color: var(--kn-text-muted); }
    .kn-otp__error  { color: var(--kn-danger); }
    .kn-otp__icon   { margin-right: var(--kn-sp-1); font-weight: var(--kn-fw-bold); }
  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => KnOtpInputComponent),
      multi: true,
    },
  ],
})
export class KnOtpInputComponent implements ControlValueAccessor {
  readonly otpId = `kn-otp-${nextOtpId++}`;

  readonly length = input<number>(6);
  readonly label = input<string>('');
  readonly helperText = input<string>('');
  readonly errorMessage = input<string>('');
  readonly invalid = input<boolean>(false);
  readonly disabled = input<boolean>(false);

  readonly completed = output<string>();
  readonly valueChange = output<string>();

  readonly slots = signal<string[]>(Array.from({ length: 6 }, () => ''));

  @ViewChildren('input') private inputs!: QueryList<ElementRef<HTMLInputElement>>;

  // CVA
  private onChange: (v: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string | null): void {
    const len = this.length();
    const v = (value ?? '').padEnd(len, ' ').slice(0, len).split('').map((c) => (c === ' ' ? '' : c));
    this.slots.set(v);
  }

  registerOnChange(fn: (v: string) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(_: boolean): void {}

  protected onInput(event: Event, index: number): void {
    const target = event.target as HTMLInputElement;
    const raw = target.value.replace(/\D/g, '');
    if (!raw) {
      this.updateSlot(index, '');
      return;
    }
    this.updateSlot(index, raw[0]);
    if (raw.length > 1) {
      this.fillFrom(index, raw);
    } else {
      this.focusInput(index + 1);
    }
  }

  protected onKeydown(event: KeyboardEvent, index: number): void {
    if (event.key === 'Backspace' && !this.slots()[index]) {
      event.preventDefault();
      this.focusInput(index - 1);
      this.updateSlot(index - 1, '');
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.focusInput(index - 1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.focusInput(index + 1);
    }
  }

  protected onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const text = event.clipboardData?.getData('text') ?? '';
    const digits = text.replace(/\D/g, '');
    if (digits) this.fillFrom(0, digits);
  }

  protected onFocus(event: Event): void {
    (event.target as HTMLInputElement).select();
    this.onTouched();
  }

  private updateSlot(index: number, value: string): void {
    if (index < 0 || index >= this.length()) return;
    const next = [...this.slots()];
    next[index] = value;
    this.slots.set(next);
    const joined = next.join('');
    this.onChange(joined);
    this.valueChange.emit(joined);
    if (joined.length === this.length() && next.every((s) => s !== '')) {
      this.completed.emit(joined);
    }
  }

  private fillFrom(start: number, digits: string): void {
    const next = [...this.slots()];
    let cursor = start;
    for (const d of digits) {
      if (cursor >= this.length()) break;
      next[cursor++] = d;
    }
    this.slots.set(next);
    const joined = next.join('');
    this.onChange(joined);
    this.valueChange.emit(joined);
    this.focusInput(Math.min(cursor, this.length() - 1));
    if (joined.length === this.length() && next.every((s) => s !== '')) {
      this.completed.emit(joined);
    }
  }

  private focusInput(index: number): void {
    const el = this.inputs?.toArray()[index]?.nativeElement;
    el?.focus();
  }
}
