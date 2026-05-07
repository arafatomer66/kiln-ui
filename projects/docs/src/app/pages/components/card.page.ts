import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KnCardComponent, KnCardHeaderComponent, KnCardFooterComponent, KnButtonComponent } from 'kiln-ui';
import { ApiTableComponent, ApiRow } from '../../shared/api-table.component';
import { ExampleComponent } from '../../shared/example.component';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { CodeBlockComponent } from '../../shared/code-block.component';

@Component({
  selector: 'app-card-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    KnCardComponent, KnCardHeaderComponent, KnCardFooterComponent, KnButtonComponent,
    PageHeaderComponent, ExampleComponent, ApiTableComponent, CodeBlockComponent,
  ],
  template: `
    <app-page-header eyebrow="FOUNDATION" title="Card" subtitle="A bordered surface with the signature corner motifs and stamp shadow. The most distinctive Kiln UI component." />

    <h2>Import</h2>
    <app-code-block [code]="importCode" />

    <h2>Examples</h2>

    <app-example title="Stamp variant (default)" [code]="stamp">
      <div style="width: 360px;">
        <kn-card>
          <h3 style="margin: 0 0 8px;">Project brief</h3>
          <p style="margin: 0; color: var(--kn-text-muted);">A community-powered group buying platform for Bangladesh.</p>
        </kn-card>
      </div>
    </app-example>

    <app-example title="With header and footer" [code]="composed">
      <div style="width: 360px;">
        <kn-card padding="none">
          <kn-card-header>
            <h3 style="margin: 0;">Settings</h3>
          </kn-card-header>
          <div style="padding: 24px;">Manage workspace preferences.</div>
          <kn-card-footer>
            <kn-button variant="outline" size="sm">Cancel</kn-button>
            <kn-button variant="solid" size="sm">Save</kn-button>
          </kn-card-footer>
        </kn-card>
      </div>
    </app-example>

    <app-example title="Soft variant" [code]="soft">
      <div style="width: 360px;">
        <kn-card variant="soft">
          <strong>Lighter weight</strong>
          <p style="margin: 4px 0 0; color: var(--kn-text-muted);">Soft cards have a subtle shadow and thin border — ideal for content-dense layouts.</p>
        </kn-card>
      </div>
    </app-example>

    <app-example title="Without motifs" [code]="noMotifs">
      <div style="width: 360px;">
        <kn-card [motifs]="false">
          <p style="margin: 0;">Same shape, no corner glyphs.</p>
        </kn-card>
      </div>
    </app-example>

    <h2>API</h2>
    <app-api-table heading="Inputs" [rows]="inputs" />
  `,
  styles: [`:host { display: block; color: var(--kn-text); } h2 { font-family: var(--kn-font-display); font-size: var(--kn-fs-2xl); margin: var(--kn-sp-7) 0 var(--kn-sp-3); }`],
})
export class CardPage {
  protected readonly importCode = `import { KnCardComponent, KnCardHeaderComponent, KnCardFooterComponent } from 'kiln-ui';`;

  protected readonly stamp = `<kn-card>
  <h3>Project brief</h3>
  <p>A community-powered group buying platform.</p>
</kn-card>`;

  protected readonly composed = `<kn-card padding="none">
  <kn-card-header><h3>Settings</h3></kn-card-header>
  <div style="padding: 24px;">Manage workspace preferences.</div>
  <kn-card-footer>
    <kn-button variant="outline" size="sm">Cancel</kn-button>
    <kn-button variant="solid" size="sm">Save</kn-button>
  </kn-card-footer>
</kn-card>`;

  protected readonly soft = `<kn-card variant="soft">…</kn-card>`;
  protected readonly noMotifs = `<kn-card [motifs]="false">…</kn-card>`;

  protected readonly inputs: ApiRow[] = [
    { name: 'variant', type: `'stamp' | 'soft' | 'ghost'`, default: `'stamp'`, description: 'Visual variant.' },
    { name: 'padding', type: `'none' | 'sm' | 'md' | 'lg'`, default: `'md'`, description: 'Inner padding.' },
    { name: 'motifs', type: 'boolean', default: 'true', description: 'Show ❖ corner glyphs.' },
    { name: 'interactive', type: 'boolean', default: 'false', description: 'Add hover-lift effect (use when card is clickable).' },
  ];
}
