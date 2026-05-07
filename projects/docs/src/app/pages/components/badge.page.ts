import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KnBadgeComponent } from 'kiln-ui';
import { ApiTableComponent, ApiRow } from '../../shared/api-table.component';
import { ExampleComponent } from '../../shared/example.component';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { CodeBlockComponent } from '../../shared/code-block.component';

@Component({
  selector: 'app-badge-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [KnBadgeComponent, PageHeaderComponent, ExampleComponent, ApiTableComponent, CodeBlockComponent],
  template: `
    <app-page-header eyebrow="FOUNDATION" title="Badge" subtitle="A compact label for status, counts, or tags. Pairs with text inline." />

    <h2>Import</h2>
    <app-code-block [code]="'import { KnBadgeComponent } from \\'kiln-ui\\';'" />

    <h2>Examples</h2>

    <app-example title="Tones (soft variant — default)" [code]="tones">
      <kn-badge tone="brand">Brand</kn-badge>
      <kn-badge tone="success">Active</kn-badge>
      <kn-badge tone="warn">Pending</kn-badge>
      <kn-badge tone="danger">Failed</kn-badge>
      <kn-badge tone="accent">New</kn-badge>
      <kn-badge tone="info">Info</kn-badge>
      <kn-badge tone="neutral">Default</kn-badge>
    </app-example>

    <app-example title="Solid variant" [code]="solid">
      <kn-badge variant="solid" tone="brand">PRO</kn-badge>
      <kn-badge variant="solid" tone="success">LIVE</kn-badge>
      <kn-badge variant="solid" tone="accent">NEW</kn-badge>
    </app-example>

    <app-example title="Outline variant" [code]="outline">
      <kn-badge variant="outline" tone="brand">Brand</kn-badge>
      <kn-badge variant="outline" tone="danger">Danger</kn-badge>
    </app-example>

    <h2>API</h2>
    <app-api-table heading="Inputs" [rows]="inputs" />
  `,
  styles: [`:host { display: block; color: var(--kn-text); } h2 { font-family: var(--kn-font-display); font-size: var(--kn-fs-2xl); margin: var(--kn-sp-7) 0 var(--kn-sp-3); }`],
})
export class BadgePage {
  protected readonly tones = `<kn-badge tone="brand">Brand</kn-badge>
<kn-badge tone="success">Active</kn-badge>
<kn-badge tone="warn">Pending</kn-badge>
<kn-badge tone="danger">Failed</kn-badge>`;

  protected readonly solid = `<kn-badge variant="solid" tone="brand">PRO</kn-badge>`;
  protected readonly outline = `<kn-badge variant="outline" tone="brand">Brand</kn-badge>`;

  protected readonly inputs: ApiRow[] = [
    { name: 'variant', type: `'solid' | 'soft' | 'outline'`, default: `'soft'`, description: 'Visual variant.' },
    { name: 'tone', type: `'neutral' | 'brand' | 'success' | 'warn' | 'danger' | 'accent' | 'info'`, default: `'neutral'`, description: 'Color tone.' },
  ];
}
