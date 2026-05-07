import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KnPageStateComponent, KnButtonComponent } from 'kiln-ui';
import { ApiTableComponent, ApiRow } from '../../shared/api-table.component';
import { ExampleComponent } from '../../shared/example.component';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { CodeBlockComponent } from '../../shared/code-block.component';

@Component({
  selector: 'app-page-state-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [KnPageStateComponent, KnButtonComponent, PageHeaderComponent, ExampleComponent, ApiTableComponent, CodeBlockComponent],
  template: `
    <app-page-header eyebrow="PRO" title="Page State" subtitle="404 / 500 / under-maintenance / no-permission templates with the corner-motif aesthetic. Drop-in for empty pages." />
    <h2>Import</h2>
    <app-code-block [code]="'import { KnPageStateComponent } from \\'kiln-ui\\';'" />
    <h2>Examples</h2>
    <app-example title="404 Not Found" [code]="'<kn-page-state kind=&quot;not-found&quot; />'">
      <kn-page-state kind="not-found">
        <kn-button variant="solid">← Back to home</kn-button>
        <kn-button variant="outline">Contact support</kn-button>
      </kn-page-state>
    </app-example>
    <app-example title="Under maintenance" [code]="'<kn-page-state kind=&quot;maintenance&quot; />'"><kn-page-state kind="maintenance" /></app-example>
    <app-example title="Server error" [code]="'<kn-page-state kind=&quot;server-error&quot; />'"><kn-page-state kind="server-error" /></app-example>
    <app-example title="Custom" [code]="'<kn-page-state kind=&quot;custom&quot; glyph=&quot;🪵&quot; title=&quot;Beta only&quot; description=&quot;...&quot; />'">
      <kn-page-state kind="custom" glyph="🪵" title="Beta only" description="This area is in private beta. Get in touch for access." />
    </app-example>
    <h2>API</h2>
    <app-api-table heading="Inputs" [rows]="inputs" />
    <h2>Built-in kinds</h2>
    <ul>
      <li><code>not-found</code>, <code>unauthorized</code>, <code>forbidden</code>, <code>server-error</code></li>
      <li><code>maintenance</code>, <code>no-permission</code>, <code>offline</code>, <code>empty</code></li>
      <li><code>custom</code> — set your own glyph + title + description</li>
    </ul>
  `,
  styles: [`:host { display: block; color: var(--kn-text); } h2 { font-family: var(--kn-font-display); font-size: var(--kn-fs-2xl); margin: var(--kn-sp-7) 0 var(--kn-sp-3); } li { color: var(--kn-text-muted); line-height: var(--kn-lh-relaxed); } code { background: var(--kn-surface); padding: 1px 6px; border-radius: var(--kn-r-xs); font-size: var(--kn-fs-sm); } ul { padding-left: var(--kn-sp-5); }`],
})
export class PageStatePage {
  protected readonly inputs: ApiRow[] = [
    { name: 'kind', type: `'not-found' | 'unauthorized' | 'forbidden' | 'server-error' | 'maintenance' | 'no-permission' | 'offline' | 'empty' | 'custom'`, default: `'not-found'`, description: 'Preset state.' },
    { name: 'title', type: 'string', default: `''`, description: 'Override the preset title.' },
    { name: 'description', type: 'string', default: `''`, description: 'Override the preset description.' },
    { name: 'glyph', type: 'string', default: `''`, description: 'Override the central glyph (e.g. "404", "⚙").' },
  ];
}
