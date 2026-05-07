import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
  output,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

let nextCheckboxId = 0;

@Component({
  selector: 'kn-checkbox',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <label class="kn-checkbox" [attr.aria-disabled]="disabled() ? 'true' : null">
      <input
        type="checkbox"
        class="kn-checkbox__input"
        [id]="checkboxId"
        [checked]="checked()"
        [disabled]="disabled()"
        [attr.aria-label]="ariaLabel() || null"
        (change)="onChangeEvent($event)"
        (blur)="onBlur()"
      />
      <span class="kn-checkbox__box" aria-hidden="true">
        @if (indeterminate()) {
          <span class="kn-checkbox__icon">−</span>
        } @else if (checked()) {
          <span class="kn-checkbox__icon">✓</span>
        }
      </span>
      @if (label()) {
        <span class="kn-checkbox__label">{{ label() }}</span>
      }
      <ng-content />
    </label>
  `,
  styleUrl: './checkbox.scss',
  host: {
    '[attr.data-checked]': 'checked() ? "true" : null',
    '[attr.data-indeterminate]': 'indeterminate() ? "true" : null',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => KnCheckboxComponent),
      multi: true,
    },
  ],
})
export class KnCheckboxComponent implements ControlValueAccessor {
  readonly checkboxId = `kn-checkbox-${nextCheckboxId++}`;

  readonly label = input<string>('');
  readonly disabled = input<boolean>(false);
  readonly indeterminate = input<boolean>(false);
  readonly ariaLabel = input<string>('');

  readonly checkedChange = output<boolean>();

  readonly checked = signal<boolean>(false);

  private onChange: (v: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: boolean | null): void {
    this.checked.set(!!value);
  }

  registerOnChange(fn: (v: boolean) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(_: boolean): void {}

  protected onChangeEvent(event: Event): void {
    const next = (event.target as HTMLInputElement).checked;
    this.checked.set(next);
    this.onChange(next);
    this.checkedChange.emit(next);
  }

  protected onBlur(): void { this.onTouched(); }
}
