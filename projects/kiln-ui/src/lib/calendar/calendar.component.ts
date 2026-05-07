import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';

export interface KnCalendarEvent {
  readonly id: string;
  readonly title: string;
  readonly date: Date;
  readonly tone?: 'brand' | 'success' | 'warn' | 'danger' | 'accent' | 'neutral';
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'];
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface CalendarCell {
  date: Date;
  iso: string;
  inMonth: boolean;
  isToday: boolean;
  events: KnCalendarEvent[];
}

@Component({
  selector: 'kn-calendar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="kn-cal__head">
      <button type="button" class="kn-cal__nav" (click)="prev()" aria-label="Previous month">‹</button>
      <h3 class="kn-cal__title">{{ monthLabel() }}</h3>
      <button type="button" class="kn-cal__nav" (click)="next()" aria-label="Next month">›</button>
      <button type="button" class="kn-cal__today" (click)="goToday()">Today</button>
    </header>

    <div class="kn-cal__grid">
      @for (wd of weekdays; track $index) {
        <div class="kn-cal__weekday">{{ wd }}</div>
      }
      @for (cell of cells(); track cell.iso) {
        <div
          class="kn-cal__cell"
          [class.is-other-month]="!cell.inMonth"
          [class.is-today]="cell.isToday"
          [class.is-selected]="cell.iso === selectedIso()"
          (click)="onCellClick(cell)"
        >
          <div class="kn-cal__cell-head">
            <span class="kn-cal__day">{{ cell.date.getDate() }}</span>
          </div>
          @if (cell.events.length > 0) {
            <div class="kn-cal__events">
              @for (e of cell.events.slice(0, 3); track e.id) {
                <span class="kn-cal__event" [attr.data-tone]="e.tone ?? 'brand'" [title]="e.title">
                  {{ e.title }}
                </span>
              }
              @if (cell.events.length > 3) {
                <span class="kn-cal__more">+{{ cell.events.length - 3 }} more</span>
              }
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    :host { display: block; font-family: var(--kn-font-sans); color: var(--kn-text); }

    .kn-cal__head {
      display: flex;
      align-items: center;
      gap: var(--kn-sp-2);
      margin-bottom: var(--kn-sp-3);
    }
    .kn-cal__nav {
      all: unset;
      cursor: pointer;
      width: 32px;
      height: 32px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: var(--kn-text-muted);
      border: var(--kn-bw-1) solid var(--kn-border);
      border-radius: var(--kn-r-xs);
    }
    .kn-cal__nav:hover { color: var(--kn-text); background: var(--kn-surface); }
    .kn-cal__title {
      flex: 1;
      font-family: var(--kn-font-display);
      font-size: var(--kn-fs-xl);
      font-weight: var(--kn-fw-bold);
      margin: 0;
      letter-spacing: var(--kn-tracking-tight);
    }
    .kn-cal__today {
      all: unset;
      cursor: pointer;
      padding: 6px var(--kn-sp-3);
      font-family: var(--kn-font-mono);
      font-size: var(--kn-fs-xs);
      font-weight: var(--kn-fw-bold);
      letter-spacing: var(--kn-tracking-mono);
      text-transform: uppercase;
      color: var(--kn-brand);
      border: var(--kn-bw-1) solid var(--kn-border);
      border-radius: var(--kn-r-xs);
    }
    .kn-cal__today:hover { background: var(--kn-info-bg); }

    .kn-cal__grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      border: var(--kn-bw-2) solid var(--kn-border-strong);
      border-radius: var(--kn-r-sm);
      overflow: hidden;
      box-shadow: var(--kn-shadow-stamp);
      background: var(--kn-bg);
    }

    .kn-cal__weekday {
      padding: var(--kn-sp-2);
      text-align: center;
      font-family: var(--kn-font-mono);
      font-size: var(--kn-fs-xs);
      font-weight: var(--kn-fw-bold);
      letter-spacing: var(--kn-tracking-mono);
      text-transform: uppercase;
      color: var(--kn-text-muted);
      background: var(--kn-surface);
      border-bottom: var(--kn-bw-1) solid var(--kn-border);
    }

    .kn-cal__cell {
      min-height: 96px;
      padding: var(--kn-sp-2);
      border-right: var(--kn-bw-1) solid var(--kn-border);
      border-bottom: var(--kn-bw-1) solid var(--kn-border);
      cursor: pointer;
      display: flex;
      flex-direction: column;
      gap: 4px;
      transition: background var(--kn-dur-fast) var(--kn-ease);
    }
    .kn-cal__cell:hover { background: var(--kn-surface); }
    .kn-cal__cell:nth-child(7n) { border-right: none; }
    .kn-cal__cell.is-other-month { background: var(--kn-jute-50); }
    .kn-cal__cell.is-other-month .kn-cal__day { color: var(--kn-text-muted); opacity: 0.4; }
    .kn-cal__cell.is-today .kn-cal__day {
      background: var(--kn-brand);
      color: var(--kn-text-inverse);
      border-radius: 50%;
      width: 22px;
      height: 22px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    .kn-cal__cell.is-selected { background: var(--kn-info-bg); }

    .kn-cal__day { font-size: var(--kn-fs-sm); font-weight: var(--kn-fw-semibold); }

    .kn-cal__events { display: flex; flex-direction: column; gap: 2px; overflow: hidden; }

    .kn-cal__event {
      font-size: var(--kn-fs-xs);
      padding: 2px 6px;
      border-radius: var(--kn-r-xs);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .kn-cal__event[data-tone='brand']   { background: var(--kn-info-bg);    color: var(--kn-brand); }
    .kn-cal__event[data-tone='success'] { background: var(--kn-success-bg); color: var(--kn-success); }
    .kn-cal__event[data-tone='warn']    { background: var(--kn-warn-bg);    color: var(--kn-marigold-700); }
    .kn-cal__event[data-tone='danger']  { background: var(--kn-danger-bg);  color: var(--kn-danger); }
    .kn-cal__event[data-tone='accent']  { background: var(--kn-warn-bg);    color: var(--kn-marigold-700); }
    .kn-cal__event[data-tone='neutral'] { background: var(--kn-surface-alt); color: var(--kn-text); }

    .kn-cal__more {
      font-family: var(--kn-font-mono);
      font-size: 10px;
      color: var(--kn-text-muted);
      letter-spacing: var(--kn-tracking-mono);
    }
  `],
})
export class KnCalendarComponent {
  readonly events = input<KnCalendarEvent[]>([]);
  readonly initialDate = input<Date | null>(null);

  readonly dateSelected = output<Date>();
  readonly monthChanged = output<Date>();

  protected readonly weekdays = WEEKDAYS;
  protected readonly viewMonth = signal<Date>(new Date());
  protected readonly selectedIso = signal<string | null>(null);

  constructor() {
    queueMicrotask(() => {
      const init = this.initialDate();
      if (init) this.viewMonth.set(init);
    });
  }

  protected readonly monthLabel = computed(() => {
    const m = this.viewMonth();
    return `${MONTHS[m.getMonth()]} ${m.getFullYear()}`;
  });

  protected readonly cells = computed<CalendarCell[]>(() => {
    const m = this.viewMonth();
    const year = m.getFullYear();
    const month = m.getMonth();
    const first = new Date(year, month, 1);
    const start = new Date(first);
    start.setDate(start.getDate() - first.getDay());
    const todayIso = toIso(new Date());
    const eventMap = this.eventMap();

    const out: CalendarCell[] = [];
    for (let i = 0; i < 42; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      const iso = toIso(d);
      out.push({
        date: d,
        iso,
        inMonth: d.getMonth() === month,
        isToday: iso === todayIso,
        events: eventMap.get(iso) ?? [],
      });
    }
    return out;
  });

  private readonly eventMap = computed<Map<string, KnCalendarEvent[]>>(() => {
    const map = new Map<string, KnCalendarEvent[]>();
    for (const e of this.events()) {
      const iso = toIso(e.date);
      const list = map.get(iso) ?? [];
      list.push(e);
      map.set(iso, list);
    }
    return map;
  });

  protected prev(): void {
    const m = this.viewMonth();
    const next = new Date(m.getFullYear(), m.getMonth() - 1, 1);
    this.viewMonth.set(next);
    this.monthChanged.emit(next);
  }

  protected next(): void {
    const m = this.viewMonth();
    const next = new Date(m.getFullYear(), m.getMonth() + 1, 1);
    this.viewMonth.set(next);
    this.monthChanged.emit(next);
  }

  protected goToday(): void {
    const today = new Date();
    this.viewMonth.set(new Date(today.getFullYear(), today.getMonth(), 1));
    this.monthChanged.emit(this.viewMonth());
  }

  protected onCellClick(cell: CalendarCell): void {
    this.selectedIso.set(cell.iso);
    this.dateSelected.emit(cell.date);
  }
}

function toIso(d: Date): string {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}
