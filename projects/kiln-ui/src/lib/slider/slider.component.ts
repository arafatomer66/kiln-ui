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

let nextSliderId = 0;

@Component({
  selector: 'kn-slider',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (label()) {
      <div class="kn-slider__label">
        <span>{{ label() }}</span>
        <span class="kn-slider__current">{{ formatValue() }}</span>
      </div>
    }

    <div class="kn-slider" [attr.data-disabled]="disabled() ? 'true' : null">
      <div class="kn-slider__track" aria-hidden="true">
        <div class="kn-slider__fill" [style.width.%]="pct()"></div>
        @if (showMarks() && marks().length > 0) {
          @for (m of marks(); track $index) {
            <span class="kn-slider__mark" [style.left.%]="((m - min()) / (max() - min())) * 100"></span>
          }
        }
      </div>

      <input
        type="range"
        class="kn-slider__input"
        [id]="sliderId"
        [min]="min()"
        [max]="max()"
        [step]="step()"
        [value]="value()"
        [disabled]="disabled()"
        [attr.aria-label]="ariaLabel() || label() || null"
        (input)="onInput($event)"
        (blur)="onBlur()"
      />
    </div>

    @if (helperText()) {
      <div class="kn-slider__helper">{{ helperText() }}</div>
    }
  `,
  styles: [`
    :host { display: block; font-family: var(--kn-font-sans); }

    .kn-slider__label {
      display: flex;
      justify-content: space-between;
      font-family: var(--kn-font-mono);
      font-size: var(--kn-fs-xs);
      font-weight: var(--kn-fw-bold);
      letter-spacing: var(--kn-tracking-mono);
      text-transform: uppercase;
      color: var(--kn-text);
      margin-bottom: var(--kn-sp-3);
    }
    .kn-slider__current { color: var(--kn-brand); }

    .kn-slider {
      position: relative;
      height: 28px;
      display: flex;
      align-items: center;
    }

    .kn-slider__track {
      position: relative;
      width: 100%;
      height: 6px;
      background: var(--kn-surface-alt);
      border: var(--kn-bw-1) solid var(--kn-border);
      border-radius: var(--kn-r-pill);
      overflow: visible;
    }

    .kn-slider__fill {
      height: 100%;
      background: var(--kn-brand);
      border-radius: var(--kn-r-pill);
      transition: width var(--kn-dur-fast) var(--kn-ease);
    }

    .kn-slider__mark {
      position: absolute;
      top: 50%;
      width: 2px;
      height: 8px;
      background: var(--kn-jute-700);
      transform: translate(-50%, -50%);
      border-radius: var(--kn-r-xs);
      pointer-events: none;
    }

    .kn-slider__input {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      background: transparent;
      -webkit-appearance: none;
      appearance: none;
      cursor: pointer;
    }
    .kn-slider__input:focus { outline: none; }

    .kn-slider__input::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 18px;
      height: 18px;
      background: var(--kn-bg);
      border: var(--kn-bw-2) solid var(--kn-border-strong);
      border-radius: 50%;
      cursor: pointer;
      box-shadow: 2px 2px 0 var(--kn-jute-300);
      transition: transform var(--kn-dur-fast) var(--kn-ease);
    }
    .kn-slider__input::-moz-range-thumb {
      width: 18px;
      height: 18px;
      background: var(--kn-bg);
      border: var(--kn-bw-2) solid var(--kn-border-strong);
      border-radius: 50%;
      cursor: pointer;
      box-shadow: 2px 2px 0 var(--kn-jute-300);
    }

    .kn-slider__input:focus-visible::-webkit-slider-thumb { box-shadow: var(--kn-ring); }
    .kn-slider__input:focus-visible::-moz-range-thumb { box-shadow: var(--kn-ring); }
    .kn-slider__input:active::-webkit-slider-thumb { transform: scale(1.1); }
    .kn-slider__input:active::-moz-range-thumb { transform: scale(1.1); }

    .kn-slider[data-disabled='true'] {
      opacity: 0.6;
      pointer-events: none;
    }

    .kn-slider__helper {
      margin-top: var(--kn-sp-2);
      font-size: var(--kn-fs-sm);
      color: var(--kn-text-muted);
    }
  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => KnSliderComponent),
      multi: true,
    },
  ],
})
export class KnSliderComponent implements ControlValueAccessor {
  readonly sliderId = `kn-slider-${nextSliderId++}`;

  readonly label = input<string>('');
  readonly helperText = input<string>('');
  readonly min = input<number>(0);
  readonly max = input<number>(100);
  readonly step = input<number>(1);
  readonly disabled = input<boolean>(false);
  readonly marks = input<number[]>([]);
  readonly showMarks = input<boolean>(true);
  readonly suffix = input<string>('');
  readonly ariaLabel = input<string>('');

  readonly valueChange = output<number>();

  readonly value = signal<number>(0);

  readonly pct = computed(() => {
    const v = this.value();
    const min = this.min();
    const max = this.max();
    if (max === min) return 0;
    return Math.max(0, Math.min(100, ((v - min) / (max - min)) * 100));
  });

  protected formatValue(): string {
    const s = this.suffix();
    return s ? `${this.value()}${s}` : `${this.value()}`;
  }

  protected onInput(event: Event): void {
    const v = +(event.target as HTMLInputElement).value;
    this.value.set(v);
    this.onChange(v);
    this.valueChange.emit(v);
  }

  protected onBlur(): void { this.onTouched(); }

  // CVA
  private onChange: (v: number) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: number | null): void { this.value.set(value ?? this.min()); }
  registerOnChange(fn: (v: number) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(_: boolean): void {}
}
