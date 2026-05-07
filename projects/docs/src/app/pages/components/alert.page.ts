import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KnAlertComponent } from 'kiln-ui';
import { ApiTableComponent, ApiRow } from '../../shared/api-table.component';
import { ExampleComponent } from '../../shared/example.component';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { CodeBlockComponent } from '../../shared/code-block.component';

@Component({
  selector: 'app-alert-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [KnAlertComponent, PageHeaderComponent, ExampleComponent, ApiTableComponent, CodeBlockComponent],
  template: `
    <app-page-header eyebrow="FOUNDATION" title="Alert" subtitle="Persistent inline message — info, success, warn, or danger. Pairs the corner motifs with a tone-coded side bar." />

    <h2>Import</h2>
    <app-code-block [code]="'import { KnAlertComponent } from \\'kiln-ui\\';'" />

    <h2>Examples</h2>

    <app-example title="Tones" [code]="tones">
      <div style="display: flex; flex-direction: column; gap: 12px; width: 100%;">
        <kn-alert tone="info" title="Heads up">Your trial ends in 3 days.</kn-alert>
        <kn-alert tone="success" title="Saved successfully">All 3 changes synced.</kn-alert>
        <kn-alert tone="warn" title="Slow connection">Your sync is taking longer than usual.</kn-alert>
        <kn-alert tone="danger" title="Connection lost">Reconnecting in 4s…</kn-alert>
      </div>
    </app-example>

    <app-example title="Closable" [code]="closable">
      <kn-alert tone="info" title="Closable" [closable]="true">Click the × to dismiss.</kn-alert>
    </app-example>

    <h2>API</h2>
    <app-api-table heading="Inputs" [rows]="inputs" />
    <app-api-table heading="Outputs" [rows]="outputs" [showDefault]="false" />
  `,
  styles: [`:host { display: block; color: var(--kn-text); } h2 { font-family: var(--kn-font-display); font-size: var(--kn-fs-2xl); margin: var(--kn-sp-7) 0 var(--kn-sp-3); }`],
})
export class AlertPage {
  protected readonly tones = `<kn-alert tone="info" title="Heads up">Your trial ends in 3 days.</kn-alert>
<kn-alert tone="success" title="Saved successfully">All 3 changes synced.</kn-alert>
<kn-alert tone="warn" title="Slow connection">Your sync is taking longer than usual.</kn-alert>
<kn-alert tone="danger" title="Connection lost">Reconnecting in 4s…</kn-alert>`;

  protected readonly closable = `<kn-alert tone="info" title="Closable" [closable]="true" (closed)="onClose()">…</kn-alert>`;

  protected readonly inputs: ApiRow[] = [
    { name: 'tone', type: `'info' | 'success' | 'warn' | 'danger'`, default: `'info'`, description: 'Color tone (also drives icon and ARIA role).' },
    { name: 'title', type: 'string', default: `''`, description: 'Bold heading at the top.' },
    { name: 'closable', type: 'boolean', default: 'false', description: 'Show a close (×) button.' },
    { name: 'closeLabel', type: 'string', default: `'Dismiss'`, description: 'Accessible label for the close button.' },
  ];

  protected readonly outputs: ApiRow[] = [
    { name: 'closed', type: 'EventEmitter<void>', description: 'Emitted when the close button is clicked.' },
  ];
}
