import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KnVirtualTableComponent, KnColumn } from 'kiln-ui';
import { ApiTableComponent, ApiRow } from '../../shared/api-table.component';
import { ExampleComponent } from '../../shared/example.component';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { CodeBlockComponent } from '../../shared/code-block.component';

interface Row {
  id: number;
  customer: string;
  area: string;
  amount: number;
  status: string;
  [key: string]: unknown;
}

@Component({
  selector: 'app-virtual-table-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [KnVirtualTableComponent, PageHeaderComponent, ExampleComponent, ApiTableComponent, CodeBlockComponent],
  template: `
    <app-page-header eyebrow="PRO" title="Virtual Table" subtitle="Same column config as KnTable, but uses CDK virtual scroll to render only visible rows. Handles 10k+ rows smoothly." />
    <h2>Import</h2>
    <app-code-block [code]="'import { KnVirtualTableComponent, KnColumn } from \\'kiln-ui\\';'" />
    <h2>Examples</h2>
    <app-example title="10,000 rows, sortable" [code]="usage">
      <kn-virtual-table [columns]="columns" [rows]="rows" [height]="400" [rowHeight]="44" />
    </app-example>
    <h2>API</h2>
    <app-api-table heading="Inputs" [rows]="inputs" />
    <app-api-table heading="Outputs" [rows]="outputs" [showDefault]="false" />
    <h2>When to use vs KnTable</h2>
    <ul>
      <li><strong>KnTable</strong> — fewer than ~200 rows, or when you need server-side pagination.</li>
      <li><strong>KnVirtualTable</strong> — large local dataset (1k+), need smooth scrolling without pagination.</li>
    </ul>
  `,
  styles: [`:host { display: block; color: var(--kn-text); } h2 { font-family: var(--kn-font-display); font-size: var(--kn-fs-2xl); margin: var(--kn-sp-7) 0 var(--kn-sp-3); } li { color: var(--kn-text-muted); line-height: var(--kn-lh-relaxed); } ul { padding-left: var(--kn-sp-5); }`],
})
export class VirtualTablePage {
  protected readonly columns: KnColumn<Row>[] = [
    { key: 'id',       header: 'ID',       sortable: true, width: '80px', align: 'right' },
    { key: 'customer', header: 'Customer', sortable: true },
    { key: 'area',     header: 'Area',     sortable: true, width: '160px' },
    { key: 'amount',   header: 'Amount',   sortable: true, width: '140px', align: 'right',
      cell: (r) => `৳${r.amount.toLocaleString('en-IN')}` },
    { key: 'status',   header: 'Status',   sortable: true, width: '120px' },
  ];

  protected readonly rows: Row[] = (() => {
    const names = ['Aisha Rahman', 'Bashir Hossain', 'Chowdhury Khan', 'Dipika Sen', 'Emon Kabir', 'Farhana Akter', 'Gourab Roy', 'Husna Begum'];
    const areas = ['Dhanmondi', 'Gulshan', 'Banani', 'Uttara', 'Mirpur', 'Mohammadpur', 'Bashundhara'];
    const statuses = ['Paid', 'Pending', 'Shipped', 'Delivered'];
    const out: Row[] = [];
    for (let i = 1; i <= 10000; i++) {
      out.push({
        id: i,
        customer: names[i % names.length],
        area: areas[i % areas.length],
        amount: 200 + Math.round(Math.random() * 9800),
        status: statuses[i % statuses.length],
      });
    }
    return out;
  })();

  protected readonly usage = `columns: KnColumn[] = [
  { key: 'id',       header: 'ID',       sortable: true, width: '80px',  align: 'right' },
  { key: 'customer', header: 'Customer', sortable: true },
  { key: 'amount',   header: 'Amount',   sortable: true, align: 'right', cell: r => '৳' + r.amount },
];

<kn-virtual-table
  [columns]="columns"
  [rows]="rows"
  [height]="400"
  [rowHeight]="44"
/>`;

  protected readonly inputs: ApiRow[] = [
    { name: 'columns', type: 'KnColumn<T>[]', default: '[]', description: 'Column definitions (same shape as KnTable).' },
    { name: 'rows', type: 'T[]', default: '[]', description: 'Data rows.' },
    { name: 'height', type: 'number', default: '480', description: 'Viewport height in pixels.' },
    { name: 'rowHeight', type: 'number', default: '48', description: 'Fixed row height (CDK virtual scroll requires this).' },
  ];
  protected readonly outputs: ApiRow[] = [
    { name: 'sortChange', type: 'EventEmitter<KnSortState>', description: 'Fires on sort key/direction change.' },
  ];
}
