import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KnProgressComponent } from 'kiln-ui';
import { ApiTableComponent, ApiRow } from '../../shared/api-table.component';
import { ExampleComponent } from '../../shared/example.component';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { CodeBlockComponent } from '../../shared/code-block.component';

@Component({
  selector: 'app-progress-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [KnProgressComponent, PageHeaderComponent, ExampleComponent, ApiTableComponent, CodeBlockComponent],
  template: `
    <app-page-header eyebrow="FOUNDATION" title="Progress" subtitle="Linear progress bar. Supports determinate and indeterminate modes." />

    <h2>Import</h2>
    <app-code-block [code]="'import { KnProgressComponent } from \\'kiln-ui\\';'" />

    <h2>Examples</h2>

    <app-example title="Determinate" [code]="det">
      <div style="width: 320px;"><kn-progress [value]="65" [showLabel]="true" /></div>
    </app-example>

    <app-example title="Indeterminate" [code]="indet">
      <div style="width: 320px;"><kn-progress [indeterminate]="true" /></div>
    </app-example>

    <app-example title="Tones" [code]="tones">
      <div style="width: 320px; display: flex; flex-direction: column; gap: 8px;">
        <kn-progress [value]="40" tone="success" />
        <kn-progress [value]="70" tone="warn" />
        <kn-progress [value]="90" tone="danger" />
      </div>
    </app-example>

    <h2>API</h2>
    <app-api-table heading="Inputs" [rows]="inputs" />
  `,
  styles: [`:host { display: block; color: var(--kn-text); } h2 { font-family: var(--kn-font-display); font-size: var(--kn-fs-2xl); margin: var(--kn-sp-7) 0 var(--kn-sp-3); }`],
})
export class ProgressPage {
  protected readonly det = `<kn-progress [value]="65" [showLabel]="true" />`;
  protected readonly indet = `<kn-progress [indeterminate]="true" />`;
  protected readonly tones = `<kn-progress [value]="40" tone="success" />
<kn-progress [value]="70" tone="warn" />
<kn-progress [value]="90" tone="danger" />`;

  protected readonly inputs: ApiRow[] = [
    { name: 'value', type: 'number', default: '0', description: 'Current value (0–100).' },
    { name: 'size', type: `'sm' | 'md' | 'lg'`, default: `'md'`, description: 'Bar height.' },
    { name: 'tone', type: `'brand' | 'success' | 'warn' | 'danger' | 'accent'`, default: `'brand'`, description: 'Bar color.' },
    { name: 'indeterminate', type: 'boolean', default: 'false', description: 'Show indeterminate animation.' },
    { name: 'showLabel', type: 'boolean', default: 'false', description: 'Show percentage below the bar.' },
    { name: 'ariaLabel', type: 'string', default: `''`, description: 'Accessible label.' },
  ];
}
