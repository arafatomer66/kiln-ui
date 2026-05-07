import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  inject,
  input,
  output,
  signal,
  InjectionToken,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

let nextRadioId = 0;

interface RadioContext {
  readonly value: () => unknown;
  readonly disabled: () => boolean;
  readonly name: () => string;
  select(value: unknown): void;
}

const KN_RADIO_GROUP = new InjectionToken<RadioContext>('KN_RADIO_GROUP');

@Component({
  selector: 'kn-radio-group',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-content />`,
  styleUrl: './radio.scss',
  host: {
    role: 'radiogroup',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.data-orientation]': 'orientation()',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => KnRadioGroupComponent),
      multi: true,
    },
    {
      provide: KN_RADIO_GROUP,
      useExisting: forwardRef(() => KnRadioGroupComponent),
    },
  ],
})
export class KnRadioGroupComponent implements ControlValueAccessor, RadioContext {
  readonly groupName = `kn-radio-group-${nextRadioId++}`;

  readonly orientation = input<'horizontal' | 'vertical'>('vertical');
  readonly disabled = input<boolean>(false);
  readonly ariaLabel = input<string>('');
  readonly nameInput = input<string>('', { alias: 'name' });

  readonly valueChange = output<unknown>();

  private readonly _value = signal<unknown>(null);
  readonly value = computed(() => this._value());

  name = () => this.nameInput() || this.groupName;

  private onChange: (v: unknown) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: unknown): void { this._value.set(value); }
  registerOnChange(fn: (v: unknown) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(_: boolean): void {}

  select(value: unknown): void {
    if (this.disabled()) return;
    this._value.set(value);
    this.onChange(value);
    this.onTouched();
    this.valueChange.emit(value);
  }
}

@Component({
  selector: 'kn-radio',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <label class="kn-radio" [attr.aria-disabled]="isDisabled() ? 'true' : null">
      <input
        type="radio"
        class="kn-radio__input"
        [name]="group?.name?.() || ''"
        [value]="value()"
        [checked]="isChecked()"
        [disabled]="isDisabled()"
        (change)="onSelect()"
      />
      <span class="kn-radio__circle" aria-hidden="true">
        <span class="kn-radio__dot"></span>
      </span>
      @if (label()) {
        <span>{{ label() }}</span>
      }
      <ng-content />
    </label>
  `,
  styleUrl: './radio.scss',
  host: {
    '[attr.data-checked]': 'isChecked() ? "true" : null',
  },
})
export class KnRadioComponent {
  protected readonly group = inject(KN_RADIO_GROUP, { optional: true });

  readonly value = input<unknown>(null);
  readonly label = input<string>('');
  readonly disabled = input<boolean>(false);

  isChecked = (): boolean => !!this.group && this.group.value() === this.value();
  isDisabled = (): boolean => this.disabled() || !!this.group?.disabled();

  protected onSelect(): void {
    this.group?.select(this.value());
  }
}
