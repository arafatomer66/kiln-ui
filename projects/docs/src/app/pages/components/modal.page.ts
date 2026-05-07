import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { KnButtonComponent, KnModalComponent, KnModalFooterComponent, KnModalService } from 'kiln-ui';
import { ApiTableComponent, ApiRow } from '../../shared/api-table.component';
import { ExampleComponent } from '../../shared/example.component';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { CodeBlockComponent } from '../../shared/code-block.component';

@Component({
  standalone: true,
  imports: [KnModalComponent, KnModalFooterComponent, KnButtonComponent],
  template: `
    <kn-modal title="Delete project">
      <p>This will permanently remove "ShareDeal v2" and its 47 tasks. This cannot be undone.</p>
      <kn-modal-footer>
        <kn-button variant="outline" size="sm" (clicked)="cancel()">Cancel</kn-button>
        <kn-button variant="solid" tone="danger" size="sm" (clicked)="confirm()">Delete project</kn-button>
      </kn-modal-footer>
    </kn-modal>
  `,
})
class DeleteConfirmModal {
  private readonly dialogRef = inject<DialogRef<string>>(DialogRef);

  protected confirm(): void { this.dialogRef.close('confirm'); }
  protected cancel(): void { this.dialogRef.close('cancel'); }
}

@Component({
  selector: 'app-modal-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [KnButtonComponent, PageHeaderComponent, ExampleComponent, ApiTableComponent, CodeBlockComponent],
  template: `
    <app-page-header eyebrow="OVERLAY" title="Modal" subtitle="A focused dialog with corner motifs and stamp shadow. Opens via the KnModalService." />

    <h2>Import</h2>
    <app-code-block [code]="importCode" />

    <h2>Examples</h2>

    <app-example title="Open a modal" [code]="usage">
      <kn-button (clicked)="openDelete()">Delete project</kn-button>
    </app-example>

    <h2>Service API</h2>
    <app-api-table heading="open() options" [rows]="options" />
  `,
  styles: [`:host { display: block; color: var(--kn-text); } h2 { font-family: var(--kn-font-display); font-size: var(--kn-fs-2xl); margin: var(--kn-sp-7) 0 var(--kn-sp-3); }`],
})
export class ModalPage {
  private readonly modal = inject(KnModalService);

  protected openDelete(): void {
    this.modal.open(DeleteConfirmModal, { size: 'sm', ariaLabel: 'Delete project' });
  }

  protected readonly importCode = `import { KnModalService, KnModalComponent, KnModalFooterComponent } from '@kiln/ui';`;

  protected readonly usage = `// In your modal content component:
@Component({
  imports: [KnModalComponent, KnModalFooterComponent, KnButtonComponent],
  template: \`
    <kn-modal title="Delete project">
      <p>This cannot be undone.</p>
      <kn-modal-footer>
        <kn-button variant="outline" (clicked)="cancel()">Cancel</kn-button>
        <kn-button variant="solid" tone="danger" (clicked)="confirm()">Delete</kn-button>
      </kn-modal-footer>
    </kn-modal>
  \`,
})
class DeleteConfirmModal {
  private readonly dialogRef = inject<DialogRef<string>>(DialogRef);
  confirm() { this.dialogRef.close('confirm'); }
  cancel() { this.dialogRef.close('cancel'); }
}

// Open it from a parent:
modal.open(DeleteConfirmModal, { size: 'sm' });`;

  protected readonly options: ApiRow[] = [
    { name: 'data', type: 'D', default: 'undefined', description: 'Data injected via DIALOG_DATA.' },
    { name: 'size', type: `'sm' | 'md' | 'lg'`, default: `'md'`, description: 'Width preset.' },
    { name: 'disableClose', type: 'boolean', default: 'false', description: 'Block close on backdrop click and Esc.' },
    { name: 'ariaLabel', type: 'string', default: 'undefined', description: 'Accessible dialog label.' },
  ];
}
