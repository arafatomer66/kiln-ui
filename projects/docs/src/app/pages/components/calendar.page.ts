import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KnCalendarComponent, KnCalendarEvent, KnToastService } from 'kiln-ui';
import { inject } from '@angular/core';
import { ApiTableComponent, ApiRow } from '../../shared/api-table.component';
import { ExampleComponent } from '../../shared/example.component';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { CodeBlockComponent } from '../../shared/code-block.component';

@Component({
  selector: 'app-calendar-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [KnCalendarComponent, PageHeaderComponent, ExampleComponent, ApiTableComponent, CodeBlockComponent],
  template: `
    <app-page-header eyebrow="EXTENDED" title="Calendar" subtitle="Month view with event slots. Tone-coded events, today highlight, navigation, click-to-select." />

    <h2>Import</h2>
    <app-code-block [code]="'import { KnCalendarComponent, KnCalendarEvent } from \\'kiln-ui\\';'" />

    <h2>Examples</h2>

    <app-example title="Month view with events" [code]="basic">
      <div style="width: 100%;">
        <kn-calendar [events]="events" (dateSelected)="onSelect($event)" />
      </div>
    </app-example>

    <h2>API</h2>
    <app-api-table heading="Inputs" [rows]="inputs" />
    <app-api-table heading="Outputs" [rows]="outputs" [showDefault]="false" />

    <h2>KnCalendarEvent shape</h2>
    <app-code-block [code]="shape" />
  `,
  styles: [`:host { display: block; color: var(--kn-text); } h2 { font-family: var(--kn-font-display); font-size: var(--kn-fs-2xl); margin: var(--kn-sp-7) 0 var(--kn-sp-3); }`],
})
export class CalendarPage {
  private readonly toast = inject(KnToastService);

  protected readonly events: KnCalendarEvent[] = (() => {
    const now = new Date();
    const y = now.getFullYear();
    const m = now.getMonth();
    return [
      { id: 'e1', title: 'Sprint kickoff',     date: new Date(y, m, 4),  tone: 'brand' },
      { id: 'e2', title: 'Design review',      date: new Date(y, m, 8),  tone: 'accent' },
      { id: 'e3', title: 'Team standup',       date: new Date(y, m, 10), tone: 'neutral' },
      { id: 'e4', title: 'Customer interview', date: new Date(y, m, 10), tone: 'success' },
      { id: 'e5', title: 'On-call shift',      date: new Date(y, m, 14), tone: 'warn' },
      { id: 'e6', title: 'Q3 planning',        date: new Date(y, m, 18), tone: 'brand' },
      { id: 'e7', title: 'Launch v0.3',        date: new Date(y, m, 22), tone: 'success' },
      { id: 'e8', title: 'Postmortem',         date: new Date(y, m, 25), tone: 'danger' },
    ];
  })();

  protected onSelect(date: Date): void {
    this.toast.info('Date selected', date.toDateString());
  }

  protected readonly basic = `events: KnCalendarEvent[] = [
  { id: 'e1', title: 'Sprint kickoff', date: new Date(2026, 4, 4),  tone: 'brand' },
  { id: 'e2', title: 'Design review',  date: new Date(2026, 4, 8),  tone: 'accent' },
  { id: 'e3', title: 'On-call shift',  date: new Date(2026, 4, 14), tone: 'warn' },
];

<kn-calendar [events]="events" (dateSelected)="onSelect($event)" />`;

  protected readonly shape = `interface KnCalendarEvent {
  id: string;
  title: string;
  date: Date;
  tone?: 'brand' | 'success' | 'warn' | 'danger' | 'accent' | 'neutral';
}`;

  protected readonly inputs: ApiRow[] = [
    { name: 'events', type: 'KnCalendarEvent[]', default: '[]', description: 'Events to render in their date cells.' },
    { name: 'initialDate', type: 'Date | null', default: 'null', description: 'Month to show on first render. Defaults to today.' },
  ];

  protected readonly outputs: ApiRow[] = [
    { name: 'dateSelected', type: 'EventEmitter<Date>', description: 'Fires when a cell is clicked.' },
    { name: 'monthChanged', type: 'EventEmitter<Date>', description: 'Fires when navigation changes the visible month.' },
  ];
}
