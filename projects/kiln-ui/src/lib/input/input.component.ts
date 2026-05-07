import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
  output,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

let nextInputId = 0;

export type KnInputSize = 'sm' | 'md' | 'lg';
export type KnInputType =
  | 'text' | 'email' | 'password' | 'tel' | 'url' | 'number' | 'search';

@Component({
  selector: 'kn-input',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (label()) {
      <label class="kn-field__label" [attr.for]="inputId">
        <span>{{ label() }}</span>
        @if (hint()) {
          <span class="kn-field__label__hint">{{ hint() }}</span>
        }
      </label>
    }

    <div class="kn-field__wrap">
      @if (prefix()) {
        <span class="kn-field__addon">{{ prefix() }}</span>
      }

      <input
        class="kn-field__input"
        [id]="inputId"
        [type]="type()"
        [placeholder]="placeholder()"
        [disabled]="disabled()"
        [readonly]="readonly()"
        [attr.aria-invalid]="invalid() ? 'true' : null"
        [attr.aria-describedby]="helperOrErrorId()"
        [value]="value()"
        (input)="onInput($event)"
        (blur)="onBlur()"
      />

      @if (suffix()) {
        <span class="kn-field__addon kn-field__addon--suffix">{{ suffix() }}</span>
      }
    </div>

    @if (errorMessage() && invalid()) {
      <div [id]="helperId" class="kn-field__helper kn-field__helper--error">
        <span class="kn-field__helper__icon">✕</span>{{ errorMessage() }}
      </div>
    } @else if (helperText()) {
      <div [id]="helperId" class="kn-field__helper">{{ helperText() }}</div>
    }
  `,
  styleUrl: './input.scss',
  host: {
    '[attr.data-size]': 'size()',
    '[attr.data-invalid]': 'invalid() ? "true" : null',
    '[attr.data-disabled]': 'disabled() ? "true" : null',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => KnInputComponent),
      multi: true,
    },
  ],
})
export class KnInputComponent implements ControlValueAccessor {
  readonly inputId = `kn-input-${nextInputId++}`;
  readonly helperId = `${this.inputId}-helper`;

  readonly label = input<string>('');
  readonly hint = input<string>('');
  readonly placeholder = input<string>('');
  readonly type = input<KnInputType>('text');
  readonly size = input<KnInputSize>('md');
  readonly prefix = input<string>('');
  readonly suffix = input<string>('');
  readonly helperText = input<string>('');
  readonly errorMessage = input<string>('');
  readonly disabled = input<boolean>(false);
  readonly readonly = input<boolean>(false);
  readonly invalid = input<boolean>(false);

  readonly valueChange = output<string>();

  readonly value = signal<string>('');

  helperOrErrorId(): string | null {
    if ((this.helperText() || this.errorMessage()) && (this.invalid() || this.helperText())) {
      return this.helperId;
    }
    return null;
  }

  // ControlValueAccessor
  private onChange: (v: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string | null): void {
    this.value.set(value ?? '');
  }

  registerOnChange(fn: (v: string) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }

  setDisabledState(_isDisabled: boolean): void {
    // Disabled is controlled via input signal; CVA-driven disable is supported
    // by parent forms binding to the [disabled] input.
  }

  protected onInput(event: Event): void {
    const next = (event.target as HTMLInputElement).value;
    this.value.set(next);
    this.onChange(next);
    this.valueChange.emit(next);
  }

  protected onBlur(): void {
    this.onTouched();
  }
}
