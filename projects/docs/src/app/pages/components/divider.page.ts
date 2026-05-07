import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KnDividerComponent } from 'kiln-ui';
import { ApiTableComponent, ApiRow } from '../../shared/api-table.component';
import { ExampleComponent } from '../../shared/example.component';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { CodeBlockComponent } from '../../shared/code-block.component';

@Component({
  selector: 'app-divider-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [KnDividerComponent, PageHeaderComponent, ExampleComponent, ApiTableComponent, CodeBlockComponent],
  template: `
    <app-page-header eyebrow="FOUNDATION" title="Divider" subtitle="Horizontal separator. Plain, dotted with motif, or alpana — Kiln UI's signature variant." />

    <h2>Import</h2>
    <app-code-block [code]="'import { KnDividerComponent } from \\'kiln-ui\\';'" />

    <h2>Examples</h2>

    <app-example title="Plain" [code]="plain"><div style="width: 100%"><kn-divider /></div></app-example>
    <app-example title="With label" [code]="labeled"><div style="width: 100%"><kn-divider label="OR" /></div></app-example>
    <app-example title="Dot" [code]="dot"><div style="width: 100%"><kn-divider variant="dot" /></div></app-example>
    <app-example title="Alpana (signature)" [code]="alpana"><div style="width: 100%"><kn-divider variant="alpana" /></div></app-example>

    <h2>API</h2>
    <app-api-table heading="Inputs" [rows]="inputs" />
  `,
  styles: [`:host { display: block; color: var(--kn-text); } h2 { font-family: var(--kn-font-display); font-size: var(--kn-fs-2xl); margin: var(--kn-sp-7) 0 var(--kn-sp-3); }`],
})
export class DividerPage {
  protected readonly plain = `<kn-divider />`;
  protected readonly labeled = `<kn-divider label="OR" />`;
  protected readonly dot = `<kn-divider variant="dot" />`;
  protected readonly alpana = `<kn-divider variant="alpana" />`;

  protected readonly inputs: ApiRow[] = [
    { name: 'variant', type: `'plain' | 'dot' | 'alpana'`, default: `'plain'`, description: 'Visual variant.' },
    { name: 'label', type: 'string', default: `''`, description: 'Center label (plain variant only).' },
  ];
}
