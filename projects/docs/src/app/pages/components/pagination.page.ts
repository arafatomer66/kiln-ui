import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { KnPaginationComponent } from 'kiln-ui';
import { ApiTableComponent, ApiRow } from '../../shared/api-table.component';
import { ExampleComponent } from '../../shared/example.component';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { CodeBlockComponent } from '../../shared/code-block.component';

@Component({
  selector: 'app-pagination-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    KnPaginationComponent,
    PageHeaderComponent, ExampleComponent, ApiTableComponent, CodeBlockComponent,
  ],
  template: `
    <app-page-header eyebrow="COMPOSITE" title="Pagination" subtitle="Page-by-page navigation with collapsing ellipses for long ranges." />

    <h2>Import</h2>
    <app-code-block [code]="'import { KnPaginationComponent } from \\'@kiln/ui\\';'" />

    <h2>Examples</h2>

    <app-example title="Short range" [code]="short">
      <kn-pagination [page]="page1()" [total]="5" (pageChange)="page1.set($event)" />
    </app-example>

    <app-example title="Long range with ellipses" [code]="long">
      <kn-pagination [page]="page2()" [total]="42" (pageChange)="page2.set($event)" />
    </app-example>

    <h2>API</h2>
    <app-api-table heading="Inputs" [rows]="inputs" />
    <app-api-table heading="Outputs" [rows]="outputs" [showDefault]="false" />
  `,
  styles: [`:host { display: block; color: var(--kn-text); } h2 { font-family: var(--kn-font-display); font-size: var(--kn-fs-2xl); margin: var(--kn-sp-7) 0 var(--kn-sp-3); }`],
})
export class PaginationPage {
  protected readonly page1 = signal(2);
  protected readonly page2 = signal(7);

  protected readonly short = `<kn-pagination [page]="page" [total]="5" (pageChange)="page = $event" />`;
  protected readonly long = `<kn-pagination [page]="page" [total]="42" (pageChange)="page = $event" />`;

  protected readonly inputs: ApiRow[] = [
    { name: 'page', type: 'number', default: '1', description: 'Current page (1-indexed).' },
    { name: 'total', type: 'number', default: '1', description: 'Total number of pages.' },
    { name: 'siblingCount', type: 'number', default: '1', description: 'Pages shown on either side of the current page.' },
    { name: 'ariaLabel', type: 'string', default: `'Pagination'`, description: 'Accessible nav label.' },
  ];

  protected readonly outputs: ApiRow[] = [
    { name: 'pageChange', type: 'EventEmitter<number>', description: 'Emitted on page change.' },
  ];
}
