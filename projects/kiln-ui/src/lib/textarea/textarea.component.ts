import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
  output,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

let nextTextareaId = 0;

@Component({
  selector: 'kn-textarea',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (label()) {
      <label class="kn-field__label" [attr.for]="textareaId">
        <span>{{ label() }}</span>
        @if (hint()) {
          <span class="kn-field__label__hint">{{ hint() }}</span>
        }
      </label>
    }

    <div class="kn-field__wrap">
      <textarea
        class="kn-field__input kn-field__input--textarea"
        [id]="textareaId"
        [placeholder]="placeholder()"
        [disabled]="disabled()"
        [readonly]="readonly()"
        [rows]="rows()"
        [attr.aria-invalid]="invalid() ? 'true' : null"
        [attr.aria-describedby]="(helperText() || errorMessage()) ? helperId : null"
        [value]="value()"
        (input)="onInput($event)"
        (blur)="onBlur()"
      ></textarea>
    </div>

    @if (errorMessage() && invalid()) {
      <div [id]="helperId" class="kn-field__helper kn-field__helper--error">
        <span class="kn-field__helper__icon">✕</span>{{ errorMessage() }}
      </div>
    } @else if (helperText()) {
      <div [id]="helperId" class="kn-field__helper">{{ helperText() }}</div>
    }
  `,
  styleUrl: './textarea.scss',
  host: {
    '[attr.data-invalid]': 'invalid() ? "true" : null',
    '[attr.data-disabled]': 'disabled() ? "true" : null',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => KnTextareaComponent),
      multi: true,
    },
  ],
})
export class KnTextareaComponent implements ControlValueAccessor {
  readonly textareaId = `kn-textarea-${nextTextareaId++}`;
  readonly helperId = `${this.textareaId}-helper`;

  readonly label = input<string>('');
  readonly hint = input<string>('');
  readonly placeholder = input<string>('');
  readonly rows = input<number>(4);
  readonly helperText = input<string>('');
  readonly errorMessage = input<string>('');
  readonly disabled = input<boolean>(false);
  readonly readonly = input<boolean>(false);
  readonly invalid = input<boolean>(false);

  readonly valueChange = output<string>();

  readonly value = signal<string>('');

  private onChange: (v: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string | null): void {
    this.value.set(value ?? '');
  }

  registerOnChange(fn: (v: string) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(_: boolean): void {}

  protected onInput(event: Event): void {
    const next = (event.target as HTMLTextAreaElement).value;
    this.value.set(next);
    this.onChange(next);
    this.valueChange.emit(next);
  }

  protected onBlur(): void { this.onTouched(); }
}
