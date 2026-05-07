import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KnTreeComponent, KnTreeNode } from 'kiln-ui';
import { ApiTableComponent, ApiRow } from '../../shared/api-table.component';
import { ExampleComponent } from '../../shared/example.component';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { CodeBlockComponent } from '../../shared/code-block.component';

@Component({
  selector: 'app-tree-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [KnTreeComponent, PageHeaderComponent, ExampleComponent, ApiTableComponent, CodeBlockComponent],
  template: `
    <app-page-header eyebrow="EXTENDED" title="Tree" subtitle="Hierarchical expand/collapse view. Selectable nodes, optional descriptions, recursive rendering." />

    <h2>Import</h2>
    <app-code-block [code]="'import { KnTreeComponent, KnTreeNode } from \\'kiln-ui\\';'" />

    <h2>Examples</h2>

    <app-example title="File browser" [code]="basic">
      <div style="width: 100%; max-width: 520px;">
        <kn-tree [nodes]="filesystem" [defaultExpanded]="false" (nodeSelected)="onSelect($event)" />
      </div>
    </app-example>

    <h2>API — kn-tree</h2>
    <app-api-table heading="Inputs" [rows]="treeInputs" />
    <app-api-table heading="Outputs" [rows]="treeOutputs" [showDefault]="false" />

    <h2>KnTreeNode shape</h2>
    <app-code-block [code]="shape" />
  `,
  styles: [`:host { display: block; color: var(--kn-text); } h2 { font-family: var(--kn-font-display); font-size: var(--kn-fs-2xl); margin: var(--kn-sp-7) 0 var(--kn-sp-3); }`],
})
export class TreePage {
  protected readonly filesystem: KnTreeNode[] = [
    {
      id: 'src', label: 'src', icon: '◧', children: [
        {
          id: 'src/app', label: 'app', icon: '◧', children: [
            { id: 'src/app/button.ts',  label: 'button.ts',  icon: '·', description: '8.2 KB' },
            { id: 'src/app/card.ts',    label: 'card.ts',    icon: '·', description: '5.1 KB' },
            { id: 'src/app/index.ts',   label: 'index.ts',   icon: '·', description: '0.3 KB' },
          ],
        },
        {
          id: 'src/styles', label: 'styles', icon: '◧', children: [
            { id: 'src/styles/tokens.scss', label: 'tokens.scss', icon: '·', description: '4.6 KB' },
            { id: 'src/styles/dark.scss',   label: 'dark.scss',   icon: '·', description: '1.2 KB' },
          ],
        },
        { id: 'src/main.ts', label: 'main.ts', icon: '·', description: '0.4 KB' },
      ],
    },
    {
      id: 'docs', label: 'docs', icon: '◧', children: [
        { id: 'docs/getting-started.md', label: 'getting-started.md', icon: '·', description: '3.1 KB' },
        { id: 'docs/theming.md',         label: 'theming.md',         icon: '·', description: '2.0 KB' },
      ],
    },
    { id: 'package.json', label: 'package.json', icon: '·', description: '1.4 KB' },
    { id: 'README.md',    label: 'README.md',    icon: '·', description: '6.8 KB' },
  ];

  protected onSelect(node: KnTreeNode): void {
    console.log('Selected:', node);
  }

  protected readonly basic = `nodes: KnTreeNode[] = [
  {
    id: 'src', label: 'src', icon: '◧',
    children: [
      { id: 'src/app',  label: 'app',  icon: '◧', children: [...] },
      { id: 'src/main', label: 'main', icon: '·', description: '0.4 KB' },
    ],
  },
];

<kn-tree [nodes]="nodes" (nodeSelected)="onSelect($event)" />`;

  protected readonly shape = `interface KnTreeNode {
  id: string;
  label: string;
  icon?: string;
  description?: string;
  children?: KnTreeNode[];
}`;

  protected readonly treeInputs: ApiRow[] = [
    { name: 'nodes', type: 'KnTreeNode[]', default: '[]', description: 'Top-level nodes.' },
    { name: 'defaultExpanded', type: 'boolean', default: 'false', description: 'Whether parents start expanded.' },
  ];

  protected readonly treeOutputs: ApiRow[] = [
    { name: 'nodeSelected', type: 'EventEmitter<KnTreeNode>', description: 'Fires when a node is clicked.' },
  ];
}
