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

let nextDrpId = 0;

export interface KnDateRange {
  start: Date | null;
  end: Date | null;
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

interface CalendarDay {
  date: Date;
  iso: string;
  inMonth: boolean;
}

const POSITIONS: ConnectedPosition[] = [
  { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top',    offsetY: 4 },
  { originX: 'start', originY: 'top',    overlayX: 'start', overlayY: 'bottom', offsetY: -4 },
];

@Component({
  selector: 'kn-date-range-picker',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CdkConnectedOverlay, CdkOverlayOrigin],
  template: `
    @if (label()) {
      <label class="kn-drp__label" [attr.for]="drpId">{{ label() }}</label>
    }

    <button
      type="button"
      class="kn-drp__trigger"
      cdkOverlayOrigin
      #origin="cdkOverlayOrigin"
      [id]="drpId"
      [disabled]="disabled()"
      (click)="toggle()"
    >
      <span class="kn-drp__value" [class.is-placeholder]="!hasValue()">
        @if (hasValue()) {
          {{ format(range().start) }} <span class="kn-drp__sep">→</span> {{ format(range().end) }}
        } @else {
          {{ placeholder() }}
        }
      </span>
      <span class="kn-drp__icon" aria-hidden="true">▾</span>
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
      <div class="kn-drp__panel" role="dialog">
        <div class="kn-drp__presets">
          <button type="button" class="kn-drp__preset" (click)="applyPreset(7)">Last 7 days</button>
          <button type="button" class="kn-drp__preset" (click)="applyPreset(30)">Last 30 days</button>
          <button type="button" class="kn-drp__preset" (click)="applyPreset(90)">Last 90 days</button>
          <button type="button" class="kn-drp__preset" (click)="applyPresetThisMonth()">This month</button>
          <button type="button" class="kn-drp__preset" (click)="applyPresetThisYear()">This year</button>
        </div>

        <div class="kn-drp__cal">
          <header class="kn-drp__cal-head">
            <button type="button" class="kn-drp__nav" (click)="prevMonth()" aria-label="Previous month">‹</button>
            <span class="kn-drp__cal-label">{{ monthLabel() }}</span>
            <button type="button" class="kn-drp__nav" (click)="nextMonth()" aria-label="Next month">›</button>
          </header>
          <div class="kn-drp__grid">
            @for (wd of weekdays; track $index) {
              <span class="kn-drp__wd">{{ wd }}</span>
            }
            @for (day of days(); track day.iso) {
              <button
                type="button"
                class="kn-drp__day"
                [class.is-other-month]="!day.inMonth"
                [class.is-start]="isStart(day)"
                [class.is-end]="isEnd(day)"
                [class.is-in-range]="isInRange(day)"
                (click)="selectDay(day)"
                (mouseenter)="hover(day)"
              >{{ day.date.getDate() }}</button>
            }
          </div>
        </div>

        <footer class="kn-drp__foot">
          <span class="kn-drp__summary">
            @if (hasValue()) {
              {{ format(range().start) }} → {{ format(range().end) }} · {{ daysInRange() }} days
            } @else {
              Pick a start date
            }
          </span>
          <div class="kn-drp__actions">
            <button type="button" class="kn-drp__btn kn-drp__btn--outline" (click)="clear()">Clear</button>
            <button type="button" class="kn-drp__btn kn-drp__btn--solid" [disabled]="!hasValue()" (click)="close()">Apply</button>
          </div>
        </footer>
      </div>
    </ng-template>
  `,
  styles: [`
    :host { display: block; font-family: var(--kn-font-sans); }

    .kn-drp__label {
      display: block;
      font-family: var(--kn-font-mono);
      font-size: var(--kn-fs-xs);
      font-weight: var(--kn-fw-bold);
      letter-spacing: var(--kn-tracking-mono);
      text-transform: uppercase;
      color: var(--kn-text);
      margin-bottom: var(--kn-sp-2);
    }

    .kn-drp__trigger {
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
    }
    .kn-drp__trigger:focus-visible { box-shadow: var(--kn-ring); }
    .kn-drp__trigger[disabled] { opacity: 0.6; cursor: not-allowed; }

    .kn-drp__value { flex: 1; min-width: 0; text-align: left; }
    .kn-drp__value.is-placeholder { color: var(--kn-text-muted); opacity: 0.7; }
    .kn-drp__sep { color: var(--kn-text-muted); margin: 0 var(--kn-sp-1); }
    .kn-drp__icon { color: var(--kn-text-muted); font-size: 12px; }

    .kn-drp__panel {
      display: grid;
      grid-template-columns: 140px 280px;
      grid-template-rows: 1fr auto;
      grid-template-areas: 'presets cal' 'foot foot';
      background: var(--kn-bg);
      border: var(--kn-bw-2) solid var(--kn-border-strong);
      border-radius: var(--kn-r-sm);
      box-shadow: var(--kn-shadow-stamp-strong);
      animation: kn-drp-in 140ms cubic-bezier(0.2, 0.7, 0.2, 1);
    }

    @keyframes kn-drp-in {
      from { opacity: 0; transform: translateY(-4px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .kn-drp__presets {
      grid-area: presets;
      display: flex;
      flex-direction: column;
      padding: var(--kn-sp-3);
      gap: 2px;
      border-right: var(--kn-bw-1) solid var(--kn-border);
    }

    .kn-drp__preset {
      all: unset;
      cursor: pointer;
      padding: var(--kn-sp-2) var(--kn-sp-3);
      font-size: var(--kn-fs-sm);
      color: var(--kn-text-muted);
      border-radius: var(--kn-r-xs);
    }
    .kn-drp__preset:hover { background: var(--kn-surface); color: var(--kn-text); }

    .kn-drp__cal { grid-area: cal; padding: var(--kn-sp-3); }
    .kn-drp__cal-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: var(--kn-sp-2);
    }
    .kn-drp__cal-label { font-weight: var(--kn-fw-semibold); }
    .kn-drp__nav {
      all: unset;
      cursor: pointer;
      width: 24px;
      height: 24px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: var(--kn-text-muted);
      border-radius: var(--kn-r-xs);
    }
    .kn-drp__nav:hover { background: var(--kn-surface); color: var(--kn-text); }

    .kn-drp__grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 2px;
    }
    .kn-drp__wd {
      font-family: var(--kn-font-mono);
      font-size: 10px;
      color: var(--kn-text-muted);
      text-align: center;
      padding: 4px 0;
      text-transform: uppercase;
    }
    .kn-drp__day {
      all: unset;
      cursor: pointer;
      height: 28px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: var(--kn-fs-sm);
      color: var(--kn-text);
      border-radius: var(--kn-r-xs);
    }
    .kn-drp__day:hover { background: var(--kn-surface); }
    .kn-drp__day.is-other-month { color: var(--kn-text-muted); opacity: 0.4; }
    .kn-drp__day.is-in-range { background: var(--kn-info-bg); color: var(--kn-brand); border-radius: 0; }
    .kn-drp__day.is-start, .kn-drp__day.is-end {
      background: var(--kn-brand);
      color: var(--kn-text-inverse);
    }
    .kn-drp__day.is-start { border-radius: var(--kn-r-xs) 0 0 var(--kn-r-xs); }
    .kn-drp__day.is-end   { border-radius: 0 var(--kn-r-xs) var(--kn-r-xs) 0; }

    .kn-drp__foot {
      grid-area: foot;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--kn-sp-3);
      border-top: var(--kn-bw-1) solid var(--kn-border);
      background: var(--kn-surface);
    }
    .kn-drp__summary {
      font-family: var(--kn-font-mono);
      font-size: var(--kn-fs-xs);
      color: var(--kn-text-muted);
      letter-spacing: var(--kn-tracking-mono);
    }
    .kn-drp__actions { display: flex; gap: var(--kn-sp-2); }
    .kn-drp__btn {
      all: unset;
      cursor: pointer;
      padding: 4px var(--kn-sp-3);
      font-size: var(--kn-fs-sm);
      font-weight: var(--kn-fw-semibold);
      border-radius: var(--kn-r-xs);
    }
    .kn-drp__btn:focus-visible { box-shadow: var(--kn-ring); }
    .kn-drp__btn--outline { color: var(--kn-text); border: var(--kn-bw-1) solid var(--kn-border); }
    .kn-drp__btn--outline:hover { background: var(--kn-surface-alt); }
    .kn-drp__btn--solid { color: var(--kn-text-inverse); background: var(--kn-brand); }
    .kn-drp__btn--solid[disabled] { opacity: 0.5; cursor: not-allowed; }

    :host ::ng-deep .kn-overlay-transparent-backdrop { background: transparent; }
  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => KnDateRangePickerComponent),
      multi: true,
    },
  ],
})
export class KnDateRangePickerComponent implements ControlValueAccessor {
  readonly drpId = `kn-drp-${nextDrpId++}`;

  readonly label = input<string>('');
  readonly placeholder = input<string>('Pick a date range');
  readonly disabled = input<boolean>(false);

  readonly valueChange = output<KnDateRange>();

  readonly range = signal<KnDateRange>({ start: null, end: null });
  readonly open = signal<boolean>(false);
  readonly viewMonth = signal<Date>(new Date());

  protected readonly weekdays = WEEKDAYS;
  protected readonly positions = POSITIONS;

  readonly hasValue = computed(() => !!(this.range().start && this.range().end));

  readonly daysInRange = computed(() => {
    const r = this.range();
    if (!r.start || !r.end) return 0;
    const ms = r.end.getTime() - r.start.getTime();
    return Math.round(ms / (1000 * 60 * 60 * 24)) + 1;
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

    const out: CalendarDay[] = [];
    for (let i = 0; i < 42; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      out.push({ date: d, iso: toIso(d), inMonth: d.getMonth() === month });
    }
    return out;
  });

  protected toggle(): void {
    if (this.disabled()) return;
    if (!this.open()) this.viewMonth.set(this.range().start ?? new Date());
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

  protected selectDay(day: CalendarDay): void {
    const r = this.range();
    if (!r.start || (r.start && r.end)) {
      this.range.set({ start: day.date, end: null });
    } else {
      const start = r.start;
      const end = day.date;
      if (end < start) {
        this.range.set({ start: end, end: start });
      } else {
        this.range.set({ start, end });
      }
      const final = this.range();
      this.onChange(final);
      this.valueChange.emit(final);
    }
  }

  protected hover(_: CalendarDay): void { /* hover preview can be added later */ }

  protected isStart(day: CalendarDay): boolean {
    const r = this.range();
    return !!r.start && day.iso === toIso(r.start);
  }
  protected isEnd(day: CalendarDay): boolean {
    const r = this.range();
    return !!r.end && day.iso === toIso(r.end);
  }
  protected isInRange(day: CalendarDay): boolean {
    const r = this.range();
    if (!r.start || !r.end) return false;
    return day.date > r.start && day.date < r.end;
  }

  protected applyPreset(daysBack: number): void {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - daysBack + 1);
    this.range.set({ start, end });
    this.viewMonth.set(start);
    this.onChange(this.range());
    this.valueChange.emit(this.range());
  }

  protected applyPresetThisMonth(): void {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    this.range.set({ start, end: now });
    this.viewMonth.set(start);
    this.onChange(this.range());
    this.valueChange.emit(this.range());
  }

  protected applyPresetThisYear(): void {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    this.range.set({ start, end: now });
    this.viewMonth.set(start);
    this.onChange(this.range());
    this.valueChange.emit(this.range());
  }

  protected clear(): void {
    this.range.set({ start: null, end: null });
    this.onChange(this.range());
    this.valueChange.emit(this.range());
  }

  protected format(d: Date | null): string {
    if (!d) return '';
    return toIso(d);
  }

  // CVA
  private onChange: (v: KnDateRange) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: KnDateRange | null): void {
    this.range.set(value ?? { start: null, end: null });
  }

  registerOnChange(fn: (v: KnDateRange) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(_: boolean): void {}
}

function toIso(d: Date): string {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}
