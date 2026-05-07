import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import {
  KnButtonComponent, KnDrawerComponent, KnDrawerFooterComponent, KnDrawerService,
} from 'kiln-ui';
import { ApiTableComponent, ApiRow } from '../../shared/api-table.component';
import { ExampleComponent } from '../../shared/example.component';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { CodeBlockComponent } from '../../shared/code-block.component';

@Component({
  standalone: true,
  imports: [KnDrawerComponent, KnDrawerFooterComponent, KnButtonComponent],
  template: `
    <kn-drawer title="Edit profile">
      <p>Update your profile details. Changes save when you click Apply.</p>
      <kn-drawer-footer>
        <kn-button variant="outline" size="sm" (clicked)="close()">Cancel</kn-button>
        <kn-button variant="solid" size="sm" (clicked)="close()">Apply</kn-button>
      </kn-drawer-footer>
    </kn-drawer>
  `,
})
class EditProfileDrawer {
  private readonly dialogRef = inject<DialogRef<string>>(DialogRef);
  protected close(): void { this.dialogRef.close(); }
}

@Component({
  selector: 'app-drawer-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [KnButtonComponent, PageHeaderComponent, ExampleComponent, ApiTableComponent, CodeBlockComponent],
  template: `
    <app-page-header eyebrow="OVERLAY" title="Drawer" subtitle="Side panel that slides in from left or right. Useful for secondary forms and detail views." />

    <h2>Import</h2>
    <app-code-block [code]="importCode" />

    <h2>Examples</h2>
    <app-example title="Open a drawer" [code]="usage">
      <kn-button (clicked)="openLeft()">Open from left</kn-button>
      <kn-button (clicked)="openRight()">Open from right</kn-button>
    </app-example>

    <h2>Service API</h2>
    <app-api-table heading="open() options" [rows]="options" />
  `,
  styles: [`:host { display: block; color: var(--kn-text); } h2 { font-family: var(--kn-font-display); font-size: var(--kn-fs-2xl); margin: var(--kn-sp-7) 0 var(--kn-sp-3); }`],
})
export class DrawerPage {
  private readonly drawer = inject(KnDrawerService);

  protected openLeft(): void { this.drawer.open(EditProfileDrawer, { side: 'left' }); }
  protected openRight(): void { this.drawer.open(EditProfileDrawer, { side: 'right' }); }

  protected readonly importCode = `import { KnDrawerService, KnDrawerComponent, KnDrawerFooterComponent } from 'kiln-ui';`;

  protected readonly usage = `drawer.open(EditProfileDrawer, { side: 'right', size: 'md' });`;

  protected readonly options: ApiRow[] = [
    { name: 'side', type: `'left' | 'right'`, default: `'right'`, description: 'Which edge to slide in from.' },
    { name: 'size', type: `'sm' | 'md' | 'lg'`, default: `'md'`, description: 'Width preset.' },
    { name: 'data', type: 'D', default: 'undefined', description: 'Data injected via DIALOG_DATA.' },
    { name: 'disableClose', type: 'boolean', default: 'false', description: 'Block close on backdrop click and Esc.' },
    { name: 'ariaLabel', type: 'string', default: 'undefined', description: 'Accessible dialog label.' },
  ];
}
