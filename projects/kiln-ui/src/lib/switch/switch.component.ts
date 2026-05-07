import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
  output,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

let nextSwitchId = 0;

@Component({
  selector: 'kn-switch',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <label class="kn-switch" [attr.aria-disabled]="disabled() ? 'true' : null">
      <input
        type="checkbox"
        role="switch"
        class="kn-switch__input"
        [id]="switchId"
        [checked]="checked()"
        [disabled]="disabled()"
        [attr.aria-label]="ariaLabel() || null"
        (change)="onChangeEvent($event)"
        (blur)="onBlur()"
      />
      <span class="kn-switch__track" aria-hidden="true">
        <span class="kn-switch__thumb"></span>
      </span>
      @if (label()) {
        <span>{{ label() }}</span>
      }
      <ng-content />
    </label>
  `,
  styleUrl: './switch.scss',
  host: {
    '[attr.data-checked]': 'checked() ? "true" : null',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => KnSwitchComponent),
      multi: true,
    },
  ],
})
export class KnSwitchComponent implements ControlValueAccessor {
  readonly switchId = `kn-switch-${nextSwitchId++}`;

  readonly label = input<string>('');
  readonly disabled = input<boolean>(false);
  readonly ariaLabel = input<string>('');

  readonly checkedChange = output<boolean>();
  readonly checked = signal<boolean>(false);

  private onChange: (v: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: boolean | null): void { this.checked.set(!!value); }
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
