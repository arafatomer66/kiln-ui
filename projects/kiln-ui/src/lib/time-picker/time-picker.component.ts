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

let nextId = 0;

@Component({
  selector: 'kn-time-picker',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (label()) {
      <label class="kn-tp__label" [attr.for]="tpId">{{ label() }}</label>
    }

    <div class="kn-tp" [attr.data-disabled]="disabled() ? 'true' : null">
      <input
        class="kn-tp__cell"
        [id]="tpId"
        type="text"
        inputmode="numeric"
        maxlength="2"
        [value]="hourDisplay()"
        [disabled]="disabled()"
        [attr.aria-label]="'Hours'"
        (input)="onHourInput($event)"
        (blur)="onBlur()"
      />
      <span class="kn-tp__sep" aria-hidden="true">:</span>
      <input
        class="kn-tp__cell"
        type="text"
        inputmode="numeric"
        maxlength="2"
        [value]="minuteDisplay()"
        [disabled]="disabled()"
        [attr.aria-label]="'Minutes'"
        (input)="onMinuteInput($event)"
        (blur)="onBlur()"
      />
      @if (use12Hour()) {
        <button
          type="button"
          class="kn-tp__period"
          [disabled]="disabled()"
          (click)="togglePeriod()"
        >{{ period() }}</button>
      }
    </div>

    @if (helperText()) {
      <div class="kn-tp__helper">{{ helperText() }}</div>
    }
  `,
  styles: [`
    :host { display: block; font-family: var(--kn-font-sans); }

    .kn-tp__label {
      display: block;
      font-family: var(--kn-font-mono);
      font-size: var(--kn-fs-xs);
      font-weight: var(--kn-fw-bold);
      letter-spacing: var(--kn-tracking-mono);
      text-transform: uppercase;
      color: var(--kn-text);
      margin-bottom: var(--kn-sp-2);
    }

    .kn-tp {
      display: inline-flex;
      align-items: center;
      gap: 2px;
      background: var(--kn-bg);
      border: var(--kn-bw-2) solid var(--kn-border-strong);
      border-radius: var(--kn-r-sm);
      padding: 0 var(--kn-sp-2);
      transition: box-shadow var(--kn-dur-fast) var(--kn-ease);
    }
    .kn-tp:focus-within { box-shadow: var(--kn-ring); }
    .kn-tp[data-disabled='true'] { opacity: 0.6; }

    .kn-tp__cell {
      width: 36px;
      height: 36px;
      text-align: center;
      font-family: var(--kn-font-mono);
      font-size: var(--kn-fs-md);
      font-weight: var(--kn-fw-semibold);
      color: var(--kn-text);
      background: transparent;
      border: none;
      outline: none;
    }

    .kn-tp__sep { color: var(--kn-text-muted); font-weight: var(--kn-fw-bold); }

    .kn-tp__period {
      all: unset;
      cursor: pointer;
      padding: 0 var(--kn-sp-3);
      height: 36px;
      display: inline-flex;
      align-items: center;
      font-family: var(--kn-font-mono);
      font-size: var(--kn-fs-xs);
      font-weight: var(--kn-fw-bold);
      letter-spacing: var(--kn-tracking-mono);
      color: var(--kn-brand);
      border-left: var(--kn-bw-1) solid var(--kn-border);
    }
    .kn-tp__period:hover { background: var(--kn-surface); }

    .kn-tp__helper {
      margin-top: var(--kn-sp-2);
      font-size: var(--kn-fs-sm);
      color: var(--kn-text-muted);
    }
  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => KnTimePickerComponent),
      multi: true,
    },
  ],
})
export class KnTimePickerComponent implements ControlValueAccessor {
  readonly tpId = `kn-tp-${nextId++}`;

  readonly label = input<string>('');
  readonly helperText = input<string>('');
  readonly disabled = input<boolean>(false);
  readonly use12Hour = input<boolean>(false);

  readonly valueChange = output<string>();

  readonly hour = signal<number>(0);
  readonly minute = signal<number>(0);
  readonly period = signal<'AM' | 'PM'>('AM');

  readonly hourDisplay = computed(() => String(this.use12Hour() ? this.toTwelve(this.hour()) : this.hour()).padStart(2, '0'));
  readonly minuteDisplay = computed(() => String(this.minute()).padStart(2, '0'));

  protected onHourInput(event: Event): void {
    const raw = (event.target as HTMLInputElement).value.replace(/\D/g, '');
    let h = parseInt(raw, 10);
    if (isNaN(h)) h = 0;
    const max = this.use12Hour() ? 12 : 23;
    h = Math.max(0, Math.min(max, h));
    if (this.use12Hour()) {
      // store as 24-hour internally
      const period = this.period();
      this.hour.set(this.toTwentyFour(h, period));
    } else {
      this.hour.set(h);
    }
    this.commit();
  }

  protected onMinuteInput(event: Event): void {
    const raw = (event.target as HTMLInputElement).value.replace(/\D/g, '');
    let m = parseInt(raw, 10);
    if (isNaN(m)) m = 0;
    this.minute.set(Math.max(0, Math.min(59, m)));
    this.commit();
  }

  protected togglePeriod(): void {
    if (this.disabled()) return;
    const next = this.period() === 'AM' ? 'PM' : 'AM';
    this.period.set(next);
    // Adjust internal 24-hour hour
    this.hour.set(this.toTwentyFour(this.toTwelve(this.hour()), next));
    this.commit();
  }

  protected onBlur(): void { this.onTouched(); }

  private commit(): void {
    const v = `${String(this.hour()).padStart(2, '0')}:${String(this.minute()).padStart(2, '0')}`;
    this.onChange(v);
    this.valueChange.emit(v);
  }

  private toTwelve(h: number): number {
    const t = h % 12;
    return t === 0 ? 12 : t;
  }

  private toTwentyFour(h12: number, period: 'AM' | 'PM'): number {
    if (period === 'AM') return h12 === 12 ? 0 : h12;
    return h12 === 12 ? 12 : h12 + 12;
  }

  // CVA
  private onChange: (v: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string | null): void {
    if (!value) {
      this.hour.set(0); this.minute.set(0); this.period.set('AM');
      return;
    }
    const [h, m] = value.split(':').map((n) => parseInt(n, 10));
    if (!isNaN(h)) this.hour.set(h);
    if (!isNaN(m)) this.minute.set(m);
    this.period.set(h >= 12 ? 'PM' : 'AM');
  }

  registerOnChange(fn: (v: string) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(_: boolean): void {}
}
