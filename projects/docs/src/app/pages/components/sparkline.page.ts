import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KnSparklineComponent } from 'kiln-ui';
import { ApiTableComponent, ApiRow } from '../../shared/api-table.component';
import { ExampleComponent } from '../../shared/example.component';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { CodeBlockComponent } from '../../shared/code-block.component';

@Component({
  selector: 'app-sparkline-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [KnSparklineComponent, PageHeaderComponent, ExampleComponent, ApiTableComponent, CodeBlockComponent],
  template: `
    <app-page-header eyebrow="EXTENDED" title="Sparkline" subtitle="Tiny inline SVG chart for stat cards and dashboards. No deps — pure SVG." />

    <h2>Import</h2>
    <app-code-block [code]="'import { KnSparklineComponent } from \\'@kiln/ui\\';'" />

    <h2>Examples</h2>

    <app-example title="Basic" [code]="basic">
      <kn-sparkline [values]="trend" [width]="160" [height]="40" />
    </app-example>

    <app-example title="Tones" [code]="tones">
      <div style="display: flex; gap: 24px; align-items: center;">
        <kn-sparkline [values]="trend" tone="success" [width]="120" />
        <kn-sparkline [values]="trend" tone="danger" [width]="120" />
        <kn-sparkline [values]="trend" tone="warn" [width]="120" />
        <kn-sparkline [values]="trend" tone="muted" [width]="120" />
      </div>
    </app-example>

    <app-example title="With dots, no area" [code]="dots">
      <kn-sparkline [values]="trend" [width]="200" [height]="48" [showDots]="true" [showArea]="false" />
    </app-example>

    <h2>API</h2>
    <app-api-table heading="Inputs" [rows]="inputs" />
  `,
  styles: [`:host { display: block; color: var(--kn-text); } h2 { font-family: var(--kn-font-display); font-size: var(--kn-fs-2xl); margin: var(--kn-sp-7) 0 var(--kn-sp-3); }`],
})
export class SparklinePage {
  protected readonly trend = [12, 18, 16, 24, 22, 28, 26, 32, 30, 38, 42, 40, 48, 46, 54];

  protected readonly basic = `<kn-sparkline [values]="trend" [width]="160" [height]="40" />`;
  protected readonly tones = `<kn-sparkline [values]="trend" tone="success" />
<kn-sparkline [values]="trend" tone="danger" />`;
  protected readonly dots = `<kn-sparkline [values]="trend" [showDots]="true" [showArea]="false" />`;

  protected readonly inputs: ApiRow[] = [
    { name: 'values', type: 'number[]', default: '[]', description: 'Data points to plot.' },
    { name: 'width', type: 'number', default: '120', description: 'Chart width in pixels.' },
    { name: 'height', type: 'number', default: '32', description: 'Chart height in pixels.' },
    { name: 'tone', type: `'brand' | 'success' | 'danger' | 'warn' | 'accent' | 'muted'`, default: `'brand'`, description: 'Color theme.' },
    { name: 'showArea', type: 'boolean', default: 'true', description: 'Fill area under the line.' },
    { name: 'showDots', type: 'boolean', default: 'false', description: 'Render dots at each point.' },
    { name: 'showLast', type: 'boolean', default: 'true', description: 'Highlight the last point.' },
  ];
}
