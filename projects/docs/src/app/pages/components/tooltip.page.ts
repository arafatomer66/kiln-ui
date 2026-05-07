import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KnTooltipDirective, KnButtonComponent } from 'kiln-ui';
import { ApiTableComponent, ApiRow } from '../../shared/api-table.component';
import { ExampleComponent } from '../../shared/example.component';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { CodeBlockComponent } from '../../shared/code-block.component';

@Component({
  selector: 'app-tooltip-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [KnTooltipDirective, KnButtonComponent, PageHeaderComponent, ExampleComponent, ApiTableComponent, CodeBlockComponent],
  template: `
    <app-page-header eyebrow="OVERLAY" title="Tooltip" subtitle="Reveal contextual help on hover or focus. Works on any element via the [knTooltip] directive." />

    <h2>Import</h2>
    <app-code-block [code]="'import { KnTooltipDirective } from \\'@kiln/ui\\';'" />

    <h2>Examples</h2>

    <app-example title="Positions" [code]="positions">
      <kn-button knTooltip="Top" knTooltipPosition="top">Top</kn-button>
      <kn-button knTooltip="Right" knTooltipPosition="right">Right</kn-button>
      <kn-button knTooltip="Bottom" knTooltipPosition="bottom">Bottom</kn-button>
      <kn-button knTooltip="Left" knTooltipPosition="left">Left</kn-button>
    </app-example>

    <h2>API</h2>
    <app-api-table heading="Inputs" [rows]="inputs" />
  `,
  styles: [`:host { display: block; color: var(--kn-text); } h2 { font-family: var(--kn-font-display); font-size: var(--kn-fs-2xl); margin: var(--kn-sp-7) 0 var(--kn-sp-3); }`],
})
export class TooltipPage {
  protected readonly positions = `<button knTooltip="Help" knTooltipPosition="top">Hover me</button>`;

  protected readonly inputs: ApiRow[] = [
    { name: 'knTooltip', type: 'string', default: `''`, description: 'Tooltip text. Empty string disables it.' },
    { name: 'knTooltipPosition', type: `'top' | 'right' | 'bottom' | 'left'`, default: `'top'`, description: 'Preferred position.' },
    { name: 'knTooltipDelay', type: 'number', default: '150', description: 'Delay before showing (ms).' },
  ];
}
