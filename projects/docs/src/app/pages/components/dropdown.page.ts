import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KnDropdownComponent, KnButtonComponent, KnMenuItemComponent, KnMenuDividerComponent } from 'kiln-ui';
import { ApiTableComponent, ApiRow } from '../../shared/api-table.component';
import { ExampleComponent } from '../../shared/example.component';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { CodeBlockComponent } from '../../shared/code-block.component';

@Component({
  selector: 'app-dropdown-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    KnDropdownComponent, KnButtonComponent, KnMenuItemComponent, KnMenuDividerComponent,
    PageHeaderComponent, ExampleComponent, ApiTableComponent, CodeBlockComponent,
  ],
  template: `
    <app-page-header eyebrow="OVERLAY" title="Dropdown" subtitle="Click-triggered floating panel. Compose with kn-menu-item for action menus, or arbitrary content." />

    <h2>Import</h2>
    <app-code-block [code]="importCode" />

    <h2>Examples</h2>

    <app-example title="Basic action menu" [code]="basic">
      <kn-dropdown>
        <kn-button kn-dropdown-trigger variant="outline">Actions ▾</kn-button>
        <kn-menu-item icon="✎">Edit</kn-menu-item>
        <kn-menu-item icon="⎘">Duplicate</kn-menu-item>
        <kn-menu-divider />
        <kn-menu-item icon="✕" tone="danger">Delete</kn-menu-item>
      </kn-dropdown>
    </app-example>

    <h2>API</h2>
    <app-api-table heading="Outputs" [rows]="outputs" [showDefault]="false" />
  `,
  styles: [`:host { display: block; color: var(--kn-text); } h2 { font-family: var(--kn-font-display); font-size: var(--kn-fs-2xl); margin: var(--kn-sp-7) 0 var(--kn-sp-3); }`],
})
export class DropdownPage {
  protected readonly importCode = `import { KnDropdownComponent, KnMenuItemComponent } from 'kiln-ui';`;

  protected readonly basic = `<kn-dropdown>
  <kn-button kn-dropdown-trigger>Actions ▾</kn-button>
  <kn-menu-item icon="✎">Edit</kn-menu-item>
  <kn-menu-item icon="⎘">Duplicate</kn-menu-item>
  <kn-menu-divider />
  <kn-menu-item icon="✕" tone="danger">Delete</kn-menu-item>
</kn-dropdown>`;

  protected readonly outputs: ApiRow[] = [
    { name: 'openChange', type: 'EventEmitter<boolean>', description: 'Emitted when the panel opens or closes.' },
  ];
}
