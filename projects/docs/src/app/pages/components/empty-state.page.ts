import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KnEmptyStateComponent, KnButtonComponent } from 'kiln-ui';
import { ApiTableComponent, ApiRow } from '../../shared/api-table.component';
import { ExampleComponent } from '../../shared/example.component';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { CodeBlockComponent } from '../../shared/code-block.component';

@Component({
  selector: 'app-empty-state-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    KnEmptyStateComponent, KnButtonComponent,
    PageHeaderComponent, ExampleComponent, ApiTableComponent, CodeBlockComponent,
  ],
  template: `
    <app-page-header eyebrow="ADVANCED" title="Empty State" subtitle="On-brand empty-state container with the alpana motif. Use when a list, table, or page has nothing to show." />

    <h2>Import</h2>
    <app-code-block [code]="'import { KnEmptyStateComponent } from \\'kiln-ui\\';'" />

    <h2>Examples</h2>

    <app-example title="Default" [code]="basic">
      <div style="width: 100%; max-width: 480px;">
        <kn-empty-state title="No orders yet" description="When customers place orders, they'll appear here.">
          <kn-button variant="solid">Create test order</kn-button>
        </kn-empty-state>
      </div>
    </app-example>

    <app-example title="Muted tone" [code]="muted">
      <div style="width: 100%; max-width: 480px;">
        <kn-empty-state tone="muted" title="No matches" description="Try a different search or clear your filters." />
      </div>
    </app-example>

    <app-example title="Compact" [code]="compact">
      <kn-empty-state size="sm" title="Nothing here yet" />
    </app-example>

    <h2>API</h2>
    <app-api-table heading="Inputs" [rows]="inputs" />
  `,
  styles: [`:host { display: block; color: var(--kn-text); } h2 { font-family: var(--kn-font-display); font-size: var(--kn-fs-2xl); margin: var(--kn-sp-7) 0 var(--kn-sp-3); }`],
})
export class EmptyStatePage {
  protected readonly basic = `<kn-empty-state title="No orders yet" description="...">
  <kn-button variant="solid">Create test order</kn-button>
</kn-empty-state>`;

  protected readonly muted = `<kn-empty-state tone="muted" title="No matches" description="..." />`;
  protected readonly compact = `<kn-empty-state size="sm" title="Nothing here yet" />`;

  protected readonly inputs: ApiRow[] = [
    { name: 'title', type: 'string', default: `'Nothing here yet'`, description: 'Main message.' },
    { name: 'description', type: 'string', default: `''`, description: 'Supporting text below the title.' },
    { name: 'size', type: `'sm' | 'md'`, default: `'md'`, description: 'Compact or default padding.' },
    { name: 'tone', type: `'brand' | 'muted' | 'accent'`, default: `'brand'`, description: 'Motif color.' },
  ];
}
