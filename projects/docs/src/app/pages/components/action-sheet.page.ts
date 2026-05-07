import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { KnButtonComponent, KnActionSheetService } from 'kiln-ui';
import { ApiTableComponent, ApiRow } from '../../shared/api-table.component';
import { ExampleComponent } from '../../shared/example.component';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { CodeBlockComponent } from '../../shared/code-block.component';

@Component({
  selector: 'app-action-sheet-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [KnButtonComponent, PageHeaderComponent, ExampleComponent, ApiTableComponent, CodeBlockComponent],
  template: `
    <app-page-header eyebrow="PRO" title="Action Sheet" subtitle="iOS-style menu of actions sliding from the bottom. Returns a Promise resolving to the chosen item or null if cancelled." />
    <h2>Import</h2>
    <app-code-block [code]="'import { KnActionSheetService } from \\'kiln-ui\\';'" />
    <h2>Examples</h2>
    <app-example title="Order actions" [code]="usage">
      <kn-button (clicked)="open()">More actions</kn-button>
      @if (chosen(); as c) {
        <p style="margin: 12px 0 0; font-family: var(--kn-font-mono); font-size: 12px; color: var(--kn-text-muted);">Chose: {{ c }}</p>
      }
    </app-example>
    <h2>API</h2>
    <app-api-table heading="open() data" [rows]="dataRows" />
    <h2>KnActionItem shape</h2>
    <app-code-block [code]="shape" />
  `,
  styles: [`:host { display: block; color: var(--kn-text); } h2 { font-family: var(--kn-font-display); font-size: var(--kn-fs-2xl); margin: var(--kn-sp-7) 0 var(--kn-sp-3); }`],
})
export class ActionSheetPage {
  private readonly sheet = inject(KnActionSheetService);
  protected readonly chosen = signal<string>('');

  protected async open(): Promise<void> {
    const item = await this.sheet.open({
      title: 'Order #SD-2814',
      items: [
        { id: 'reprint', label: 'Reprint invoice', icon: '⎙', description: 'PDF copy' },
        { id: 'message', label: 'Message customer', icon: '✉' },
        { id: 'refund',  label: 'Issue refund',     icon: '↩', description: 'Returns money to original payment method' },
        { id: 'cancel',  label: 'Cancel order',     icon: '✕', tone: 'danger', description: 'Notifies customer + reverses charge' },
      ],
    });
    this.chosen.set(item ? item.label : '(cancelled)');
  }

  protected readonly usage = `const item = await actionSheet.open({
  title: 'Order #SD-2814',
  items: [
    { id: 'reprint', label: 'Reprint invoice', icon: '⎙' },
    { id: 'message', label: 'Message customer', icon: '✉' },
    { id: 'cancel', label: 'Cancel order', icon: '✕', tone: 'danger' },
  ],
});

if (item?.id === 'cancel') { ... }`;

  protected readonly shape = `interface KnActionItem {
  id: string;
  label: string;
  icon?: string;
  description?: string;
  tone?: 'neutral' | 'danger';
  disabled?: boolean;
}`;

  protected readonly dataRows: ApiRow[] = [
    { name: 'title', type: 'string', default: 'undefined', description: 'Optional sheet title (mono caps).' },
    { name: 'items', type: 'KnActionItem[]', default: '[]', description: 'Action options to render.' },
  ];
}
