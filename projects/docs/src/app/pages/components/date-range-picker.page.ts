import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KnDateRangePickerComponent } from 'kiln-ui';
import { ApiTableComponent, ApiRow } from '../../shared/api-table.component';
import { ExampleComponent } from '../../shared/example.component';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { CodeBlockComponent } from '../../shared/code-block.component';

@Component({
  selector: 'app-date-range-picker-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, KnDateRangePickerComponent, PageHeaderComponent, ExampleComponent, ApiTableComponent, CodeBlockComponent],
  template: `
    <app-page-header
      eyebrow="ADVANCED"
      title="Date Range Picker"
      subtitle="Two-date picker with quick presets (last 7/30/90 days, this month, this year). Required for any analytics or reporting view."
    />

    <h2>Import</h2>
    <app-code-block [code]="'import { KnDateRangePickerComponent, KnDateRange } from \\'kiln-ui\\';'" />

    <h2>Examples</h2>

    <app-example title="Basic" [code]="basic">
      <div style="width: 360px;">
        <kn-date-range-picker label="Reporting period" />
      </div>
    </app-example>

    <h2>API</h2>
    <app-api-table heading="Inputs" [rows]="inputs" />
    <app-api-table heading="Outputs" [rows]="outputs" [showDefault]="false" />

    <h2>Notes</h2>
    <p>The component emits a <code>KnDateRange</code> object with <code>start</code> and <code>end</code> Date instances. Both are <code>null</code> until the user picks both endpoints (or applies a preset).</p>
  `,
  styles: [`:host { display: block; color: var(--kn-text); } h2 { font-family: var(--kn-font-display); font-size: var(--kn-fs-2xl); margin: var(--kn-sp-7) 0 var(--kn-sp-3); } p { color: var(--kn-text-muted); line-height: var(--kn-lh-relaxed); } code { background: var(--kn-surface); padding: 1px 6px; border-radius: var(--kn-r-xs); font-size: var(--kn-fs-sm); }`],
})
export class DateRangePickerPage {
  protected readonly basic = `<kn-date-range-picker label="Reporting period" [(ngModel)]="range" />`;

  protected readonly inputs: ApiRow[] = [
    { name: 'label', type: 'string', default: `''`, description: 'Field label.' },
    { name: 'placeholder', type: 'string', default: `'Pick a date range'`, description: 'Placeholder when no range selected.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable interaction.' },
  ];

  protected readonly outputs: ApiRow[] = [
    { name: 'valueChange', type: 'EventEmitter<KnDateRange>', description: 'Emits {start, end} when both endpoints are set.' },
  ];
}
