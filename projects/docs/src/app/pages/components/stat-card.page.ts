import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KnStatCardComponent } from 'kiln-ui';
import { ApiTableComponent, ApiRow } from '../../shared/api-table.component';
import { ExampleComponent } from '../../shared/example.component';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { CodeBlockComponent } from '../../shared/code-block.component';

@Component({
  selector: 'app-stat-card-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [KnStatCardComponent, PageHeaderComponent, ExampleComponent, ApiTableComponent, CodeBlockComponent],
  template: `
    <app-page-header eyebrow="EXTENDED" title="Stat Card" subtitle="Dashboard-grade metric tile with delta, trend indicator, and inline sparkline. The pattern you use 4 times on every dashboard." />

    <h2>Import</h2>
    <app-code-block [code]="'import { KnStatCardComponent } from \\'@kiln/ui\\';'" />

    <h2>Examples</h2>

    <app-example title="Stat with sparkline" [code]="full">
      <div style="width: 280px;">
        <kn-stat-card
          label="Revenue"
          labelSecondary="আয়"
          value="৳1,84,320"
          delta="+12.4% vs last week"
          trend="up"
          [sparkline]="revenueTrend"
        />
      </div>
    </app-example>

    <app-example title="Grid of stats" [code]="grid">
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; width: 100%;">
        <kn-stat-card label="Orders" value="342" delta="+8.1%" trend="up" [sparkline]="ordersTrend" />
        <kn-stat-card label="New customers" value="47" delta="+24.0%" trend="up" [sparkline]="customersTrend" />
        <kn-stat-card label="Cancellations" value="6" delta="−2.0%" trend="down" [sparkline]="cancelTrend" />
      </div>
    </app-example>

    <app-example title="Without sparkline" [code]="nosparkle">
      <div style="width: 240px;">
        <kn-stat-card label="MRR" value="$8,420" delta="No change" trend="flat" />
      </div>
    </app-example>

    <h2>API</h2>
    <app-api-table heading="Inputs" [rows]="inputs" />
  `,
  styles: [`:host { display: block; color: var(--kn-text); } h2 { font-family: var(--kn-font-display); font-size: var(--kn-fs-2xl); margin: var(--kn-sp-7) 0 var(--kn-sp-3); }`],
})
export class StatCardPage {
  protected readonly revenueTrend  = [120, 130, 128, 142, 138, 152, 160, 158, 168, 175, 184];
  protected readonly ordersTrend   = [220, 240, 230, 260, 250, 280, 295, 310, 320, 332, 342];
  protected readonly customersTrend = [22, 24, 28, 30, 35, 38, 41, 44, 47];
  protected readonly cancelTrend    = [10, 9, 8, 7, 8, 6, 7, 6];

  protected readonly full = `<kn-stat-card
  label="Revenue"
  labelSecondary="আয়"
  value="৳1,84,320"
  delta="+12.4% vs last week"
  trend="up"
  [sparkline]="revenueTrend"
/>`;

  protected readonly grid = `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px;">
  <kn-stat-card label="Orders" value="342" delta="+8.1%" trend="up" [sparkline]="trend1" />
  <kn-stat-card label="New customers" value="47" delta="+24.0%" trend="up" [sparkline]="trend2" />
</div>`;

  protected readonly nosparkle = `<kn-stat-card label="MRR" value="$8,420" delta="No change" trend="flat" />`;

  protected readonly inputs: ApiRow[] = [
    { name: 'label', type: 'string', default: `''`, description: 'Mono-caps label (eyebrow).' },
    { name: 'labelSecondary', type: 'string', default: `''`, description: 'Optional secondary label (e.g. Bangla translation).' },
    { name: 'value', type: 'string | number', default: `''`, description: 'The big metric value.' },
    { name: 'delta', type: 'string', default: `''`, description: 'Comparison string (e.g. "+12.4%").' },
    { name: 'trend', type: `'up' | 'down' | 'flat'`, default: `'flat'`, description: 'Trend direction; drives delta color and sparkline tone.' },
    { name: 'sparkline', type: 'number[]', default: '[]', description: 'Inline sparkline data points.' },
    { name: 'sparkWidth', type: 'number', default: '80', description: 'Sparkline width.' },
    { name: 'icon', type: 'string', default: `''`, description: 'Optional icon glyph in the head row.' },
    { name: 'motifs', type: 'boolean', default: 'true', description: 'Show ❖ corner glyphs.' },
  ];
}
