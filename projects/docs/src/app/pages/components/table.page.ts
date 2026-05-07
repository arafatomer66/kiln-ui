import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KnTableComponent, KnColumn } from 'kiln-ui';
import { ApiTableComponent, ApiRow } from '../../shared/api-table.component';
import { ExampleComponent } from '../../shared/example.component';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { CodeBlockComponent } from '../../shared/code-block.component';

interface Member {
  name: string;
  role: string;
  joined: string;
  status: string;
  [key: string]: unknown;
}

@Component({
  selector: 'app-table-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    KnTableComponent,
    PageHeaderComponent, ExampleComponent, ApiTableComponent, CodeBlockComponent,
  ],
  template: `
    <app-page-header eyebrow="COMPOSITE" title="Table" subtitle="Strongly-typed data table with column config, click-to-sort, and an empty state." />

    <h2>Import</h2>
    <app-code-block [code]="'import { KnTableComponent, KnColumn } from \\'@kiln/ui\\';'" />

    <h2>Examples</h2>

    <app-example title="Sortable" [code]="basic">
      <div style="width: 100%;">
        <kn-table [columns]="columns" [rows]="rows" />
      </div>
    </app-example>

    <h2>API</h2>
    <app-api-table heading="Inputs" [rows]="inputs" />
    <app-api-table heading="Outputs" [rows]="outputs" [showDefault]="false" />
  `,
  styles: [`:host { display: block; color: var(--kn-text); } h2 { font-family: var(--kn-font-display); font-size: var(--kn-fs-2xl); margin: var(--kn-sp-7) 0 var(--kn-sp-3); }`],
})
export class TablePage {
  protected readonly columns: KnColumn<Member>[] = [
    { key: 'name', header: 'Name', sortable: true },
    { key: 'role', header: 'Role', sortable: true },
    { key: 'joined', header: 'Joined', sortable: true },
    { key: 'status', header: 'Status', align: 'right' },
  ];

  protected readonly rows: Member[] = [
    { name: 'Aisha Rahman', role: 'Founder', joined: '2024-03-12', status: 'Active' },
    { name: 'Bashir Hossain', role: 'Engineer', joined: '2024-06-04', status: 'Active' },
    { name: 'Chowdhury K.', role: 'Designer', joined: '2025-01-21', status: 'Invited' },
    { name: 'Dipika Sen', role: 'Marketing', joined: '2025-08-09', status: 'Active' },
  ];

  protected readonly basic = `columns: KnColumn[] = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'role', header: 'Role', sortable: true },
  { key: 'status', header: 'Status', align: 'right' },
];

<kn-table [columns]="columns" [rows]="rows" />`;

  protected readonly inputs: ApiRow[] = [
    { name: 'columns', type: 'KnColumn<T>[]', default: '[]', description: 'Column configurations.' },
    { name: 'rows', type: 'T[]', default: '[]', description: 'Data rows.' },
    { name: 'emptyText', type: 'string', default: `'No data to display.'`, description: 'Shown when rows is empty.' },
  ];

  protected readonly outputs: ApiRow[] = [
    { name: 'sortChange', type: 'EventEmitter<KnSortState>', description: 'Emitted when the sort key/direction changes.' },
  ];
}
