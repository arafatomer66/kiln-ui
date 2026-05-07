import { DialogRef } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  KnBottomSheetComponent, KnBottomSheetFooterComponent, KnBottomSheetService,
  KnButtonComponent, KnInputComponent,
} from 'kiln-ui';
import { ApiTableComponent, ApiRow } from '../../shared/api-table.component';
import { ExampleComponent } from '../../shared/example.component';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { CodeBlockComponent } from '../../shared/code-block.component';

@Component({
  standalone: true,
  imports: [KnBottomSheetComponent, KnBottomSheetFooterComponent, KnButtonComponent, KnInputComponent],
  template: `
    <kn-bottom-sheet title="Quick reply">
      <p>Send a quick message to your team without leaving this screen.</p>
      <kn-input placeholder="Type a message…" />
      <kn-bottom-sheet-footer>
        <kn-button variant="outline" size="sm" (clicked)="close()">Cancel</kn-button>
        <kn-button variant="solid" size="sm" (clicked)="close()">Send</kn-button>
      </kn-bottom-sheet-footer>
    </kn-bottom-sheet>
  `,
})
class QuickReplySheet {
  private readonly dialogRef = inject<DialogRef<void>>(DialogRef);
  protected close(): void { this.dialogRef.close(); }
}

@Component({
  selector: 'app-bottom-sheet-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [KnButtonComponent, PageHeaderComponent, ExampleComponent, ApiTableComponent, CodeBlockComponent],
  template: `
    <app-page-header eyebrow="PRO" title="Bottom Sheet" subtitle="Mobile-native modal that slides up from the bottom of the screen. Use for quick actions, picker dialogs, contextual forms." />
    <h2>Import</h2>
    <app-code-block [code]="importCode" />
    <h2>Examples</h2>
    <app-example title="Open a sheet" [code]="usage">
      <kn-button (clicked)="openSheet()">Open quick reply</kn-button>
    </app-example>
    <h2>Service API</h2>
    <app-api-table heading="open() options" [rows]="options" />
  `,
  styles: [`:host { display: block; color: var(--kn-text); } h2 { font-family: var(--kn-font-display); font-size: var(--kn-fs-2xl); margin: var(--kn-sp-7) 0 var(--kn-sp-3); }`],
})
export class BottomSheetPage {
  private readonly sheet = inject(KnBottomSheetService);

  protected openSheet(): void {
    this.sheet.open(QuickReplySheet);
  }

  protected readonly importCode = `import { KnBottomSheetService, KnBottomSheetComponent, KnBottomSheetFooterComponent } from 'kiln-ui';`;

  protected readonly usage = `// content component
@Component({
  imports: [KnBottomSheetComponent, KnBottomSheetFooterComponent],
  template: \`
    <kn-bottom-sheet title="Quick reply">
      <p>Send a quick message…</p>
      <kn-bottom-sheet-footer>
        <kn-button (clicked)="close()">Cancel</kn-button>
        <kn-button variant="solid" (clicked)="send()">Send</kn-button>
      </kn-bottom-sheet-footer>
    </kn-bottom-sheet>
  \`,
})
class QuickReplySheet { ... }

// open it:
sheet.open(QuickReplySheet, { height: '60vh' });`;

  protected readonly options: ApiRow[] = [
    { name: 'data', type: 'D', default: 'undefined', description: 'Injected via DIALOG_DATA.' },
    { name: 'height', type: 'string', default: 'undefined', description: 'Sheet height (e.g. "60vh"). Defaults to content-driven.' },
    { name: 'disableClose', type: 'boolean', default: 'false', description: 'Block close on backdrop click.' },
  ];
}
