import { CdkConnectedOverlay, CdkOverlayOrigin, ConnectedPosition } from '@angular/cdk/overlay';
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

let nextDpId = 0;

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

interface CalendarDay {
  date: Date;
  inMonth: boolean;
  iso: string;
}

const POSITIONS: ConnectedPosition[] = [
  { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top',    offsetY: 4 },
  { originX: 'start', originY: 'top',    overlayX: 'start', overlayY: 'bottom', offsetY: -4 },
];

@Component({
  selector: 'kn-date-picker',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CdkConnectedOverlay, CdkOverlayOrigin],
  template: `
    @if (label()) {
      <label class="kn-field__label" [attr.for]="dpId">
        {{ label() }}
      </label>
    }

    <button
      type="button"
      class="kn-dp__trigger"
      cdkOverlayOrigin
      #origin="cdkOverlayOrigin"
      [id]="dpId"
      [disabled]="disabled()"
      [attr.aria-haspopup]="'dialog'"
      [attr.aria-expanded]="open()"
      (click)="toggle()"
      (blur)="onBlur()"
    >
      <span class="kn-dp__value" [class.is-placeholder]="!displayValue()">
        {{ displayValue() || placeholder() }}
      </span>
      <span class="kn-dp__icon" aria-hidden="true">▾</span>
    </button>

    <ng-template
      cdkConnectedOverlay
      [cdkConnectedOverlayOrigin]="origin"
      [cdkConnectedOverlayOpen]="open()"
      [cdkConnectedOverlayPositions]="positions"
      [cdkConnectedOverlayHasBackdrop]="true"
      cdkConnectedOverlayBackdropClass="kn-overlay-transparent-backdrop"
      (backdropClick)="close()"
    >
      <div class="kn-dp__panel" role="dialog">
        <header class="kn-dp__header">
          <button type="button" class="kn-dp__nav" (click)="prevMonth()" aria-label="Previous month">‹</button>
          <span class="kn-dp__monthLabel">{{ monthLabel() }}</span>
          <button type="button" class="kn-dp__nav" (click)="nextMonth()" aria-label="Next month">›</button>
        </header>
        <div class="kn-dp__grid">
          @for (wd of weekdays; track $index) {
            <span class="kn-dp__wd">{{ wd }}</span>
          }
          @for (day of days(); track day.iso) {
            <button
              type="button"
              class="kn-dp__day"
              [class.is-other-month]="!day.inMonth"
              [class.is-today]="day.iso === todayIso"
              [class.is-selected]="day.iso === selectedIso()"
              (click)="select(day)"
            >{{ day.date.getDate() }}</button>
          }
        </div>
      </div>
    </ng-template>
  `,
  styles: [`
    :host { display: block; font-family: var(--kn-font-sans); }

    .kn-field__label {
      display: block;
      font-family: var(--kn-font-mono);
      font-size: var(--kn-fs-xs);
      font-weight: var(--kn-fw-bold);
      letter-spacing: var(--kn-tracking-mono);
      text-transform: uppercase;
      color: var(--kn-text);
      margin-bottom: var(--kn-sp-2);
    }

    .kn-dp__trigger {
      all: unset;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 36px;
      padding: 0 var(--kn-sp-3);
      background: var(--kn-bg);
      color: var(--kn-text);
      border: var(--kn-bw-2) solid var(--kn-border-strong);
      border-radius: var(--kn-r-sm);
      cursor: pointer;

      &:focus-visible { box-shadow: var(--kn-ring); }
      &[disabled] { opacity: 0.6; cursor: not-allowed; }
    }

    .kn-dp__value { flex: 1; min-width: 0; }
    .kn-dp__value.is-placeholder { color: var(--kn-text-muted); opacity: 0.7; }
    .kn-dp__icon { color: var(--kn-text-muted); font-size: 12px; }

    .kn-dp__panel {
      background: var(--kn-bg);
      border: var(--kn-bw-2) solid var(--kn-border-strong);
      border-radius: var(--kn-r-sm);
      box-shadow: var(--kn-shadow-stamp-strong);
      padding: var(--kn-sp-3);
      animation: kn-dp-in 140ms cubic-bezier(0.2, 0.7, 0.2, 1);
      width: 280px;
    }

    @keyframes kn-dp-in {
      from { opacity: 0; transform: translateY(-4px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .kn-dp__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: var(--kn-sp-2);
    }

    .kn-dp__monthLabel {
      font-weight: var(--kn-fw-semibold);
      font-size: var(--kn-fs-base);
    }

    .kn-dp__nav {
      all: unset;
      cursor: pointer;
      width: 28px;
      height: 28px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: var(--kn-text-muted);
      border-radius: var(--kn-r-xs);

      &:hover { background: var(--kn-surface); color: var(--kn-text); }
      &:focus-visible { box-shadow: var(--kn-ring); }
    }

    .kn-dp__grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 2px;
    }

    .kn-dp__wd {
      font-family: var(--kn-font-mono);
      font-size: 10px;
      font-weight: var(--kn-fw-bold);
      text-transform: uppercase;
      color: var(--kn-text-muted);
      text-align: center;
      padding: var(--kn-sp-1) 0;
    }

    .kn-dp__day {
      all: unset;
      cursor: pointer;
      height: 32px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: var(--kn-fs-sm);
      color: var(--kn-text);
      border-radius: var(--kn-r-xs);
      transition: background var(--kn-dur-fast) var(--kn-ease);

      &:hover { background: var(--kn-surface); }
      &:focus-visible { box-shadow: var(--kn-ring); }
    }

    .kn-dp__day.is-other-month { color: var(--kn-text-muted); opacity: 0.4; }
    .kn-dp__day.is-today { font-weight: var(--kn-fw-bold); border: var(--kn-bw-1) dashed var(--kn-brand); }
    .kn-dp__day.is-selected {
      background: var(--kn-brand);
      color: var(--kn-text-inverse);
    }

    :host ::ng-deep .kn-overlay-transparent-backdrop { background: transparent; }
  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => KnDatePickerComponent),
      multi: true,
    },
  ],
})
export class KnDatePickerComponent implements ControlValueAccessor {
  readonly dpId = `kn-dp-${nextDpId++}`;

  readonly label = input<string>('');
  readonly placeholder = input<string>('Pick a date');
  readonly disabled = input<boolean>(false);
  readonly format = input<string>('yyyy-MM-dd');

  readonly valueChange = output<Date | null>();

  readonly value = signal<Date | null>(null);
  readonly open = signal<boolean>(false);
  readonly viewMonth = signal<Date>(new Date());

  protected readonly weekdays = WEEKDAYS;
  protected readonly positions = POSITIONS;
  protected readonly todayIso = toIso(new Date());

  readonly selectedIso = computed(() => {
    const v = this.value();
    return v ? toIso(v) : null;
  });

  readonly displayValue = computed(() => {
    const v = this.value();
    return v ? toIso(v) : '';
  });

  readonly monthLabel = computed(() => {
    const m = this.viewMonth();
    return `${MONTHS[m.getMonth()]} ${m.getFullYear()}`;
  });

  readonly days = computed<CalendarDay[]>(() => {
    const m = this.viewMonth();
    const year = m.getFullYear();
    const month = m.getMonth();
    const first = new Date(year, month, 1);
    const start = new Date(first);
    start.setDate(start.getDate() - first.getDay());

    const days: CalendarDay[] = [];
    for (let i = 0; i < 42; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      days.push({
        date: d,
        inMonth: d.getMonth() === month,
        iso: toIso(d),
      });
    }
    return days;
  });

  protected toggle(): void {
    if (this.disabled()) return;
    if (!this.open()) {
      this.viewMonth.set(this.value() ?? new Date());
    }
    this.open.set(!this.open());
  }

  protected close(): void { this.open.set(false); }

  protected prevMonth(): void {
    const m = this.viewMonth();
    this.viewMonth.set(new Date(m.getFullYear(), m.getMonth() - 1, 1));
  }

  protected nextMonth(): void {
    const m = this.viewMonth();
    this.viewMonth.set(new Date(m.getFullYear(), m.getMonth() + 1, 1));
  }

  protected select(day: CalendarDay): void {
    this.value.set(day.date);
    this.onChange(day.date);
    this.valueChange.emit(day.date);
    this.close();
  }

  // CVA
  private onChange: (v: Date | null) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: Date | string | null): void {
    if (value instanceof Date) this.value.set(value);
    else if (typeof value === 'string') this.value.set(new Date(value));
    else this.value.set(null);
  }

  registerOnChange(fn: (v: Date | null) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(_: boolean): void {}

  protected onBlur(): void { this.onTouched(); }
}

function toIso(d: Date): string {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}
