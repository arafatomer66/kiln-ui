import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KnMenuItemComponent, KnMenuDividerComponent, KnMenuLabelComponent } from 'kiln-ui';
import { ApiTableComponent, ApiRow } from '../../shared/api-table.component';
import { ExampleComponent } from '../../shared/example.component';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { CodeBlockComponent } from '../../shared/code-block.component';

@Component({
  selector: 'app-menu-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    KnMenuItemComponent, KnMenuDividerComponent, KnMenuLabelComponent,
    PageHeaderComponent, ExampleComponent, ApiTableComponent, CodeBlockComponent,
  ],
  template: `
    <app-page-header eyebrow="OVERLAY" title="Menu" subtitle="Composable menu primitives — items, dividers, and labels. Use inside Dropdown, command palette, or context menus." />

    <h2>Import</h2>
    <app-code-block [code]="importCode" />

    <h2>Examples</h2>

    <app-example title="Composed menu" [code]="composed">
      <div style="width: 220px; background: var(--kn-bg); border: 2px solid var(--kn-border-strong); border-radius: 4px; padding: 4px;">
        <kn-menu-label>Account</kn-menu-label>
        <kn-menu-item icon="◐">Profile</kn-menu-item>
        <kn-menu-item icon="⚙" shortcut="⌘,">Settings</kn-menu-item>
        <kn-menu-divider />
        <kn-menu-label>Workspace</kn-menu-label>
        <kn-menu-item icon="⊕">New project</kn-menu-item>
        <kn-menu-item icon="⊟">Archive</kn-menu-item>
        <kn-menu-divider />
        <kn-menu-item icon="⏻" tone="danger">Sign out</kn-menu-item>
      </div>
    </app-example>

    <h2>API — kn-menu-item</h2>
    <app-api-table heading="Inputs" [rows]="inputs" />
    <app-api-table heading="Outputs" [rows]="outputs" [showDefault]="false" />
  `,
  styles: [`:host { display: block; color: var(--kn-text); } h2 { font-family: var(--kn-font-display); font-size: var(--kn-fs-2xl); margin: var(--kn-sp-7) 0 var(--kn-sp-3); }`],
})
export class MenuPage {
  protected readonly importCode = `import { KnMenuItemComponent, KnMenuDividerComponent, KnMenuLabelComponent } from 'kiln-ui';`;

  protected readonly composed = `<kn-menu-label>Account</kn-menu-label>
<kn-menu-item icon="◐">Profile</kn-menu-item>
<kn-menu-item icon="⚙" shortcut="⌘,">Settings</kn-menu-item>
<kn-menu-divider />
<kn-menu-item icon="⏻" tone="danger">Sign out</kn-menu-item>`;

  protected readonly inputs: ApiRow[] = [
    { name: 'icon', type: 'string', default: `''`, description: 'Glyph rendered before the label.' },
    { name: 'shortcut', type: 'string', default: `''`, description: 'Keyboard shortcut hint on the right.' },
    { name: 'tone', type: `'neutral' | 'danger'`, default: `'neutral'`, description: 'Color tone (danger items are red).' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable interaction.' },
  ];

  protected readonly outputs: ApiRow[] = [
    { name: 'action', type: 'EventEmitter<MouseEvent>', description: 'Emitted when the item is clicked.' },
  ];
}
