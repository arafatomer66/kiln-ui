import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KnBreadcrumbsComponent, KnCrumb } from 'kiln-ui';
import { ApiTableComponent, ApiRow } from '../../shared/api-table.component';
import { ExampleComponent } from '../../shared/example.component';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { CodeBlockComponent } from '../../shared/code-block.component';

@Component({
  selector: 'app-breadcrumbs-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [KnBreadcrumbsComponent, PageHeaderComponent, ExampleComponent, ApiTableComponent, CodeBlockComponent],
  template: `
    <app-page-header eyebrow="PRO" title="Breadcrumbs" subtitle="Hierarchical navigation trail. Last crumb is auto-rendered as the current page (non-link)." />
    <h2>Import</h2>
    <app-code-block [code]="'import { KnBreadcrumbsComponent, KnCrumb } from \\'kiln-ui\\';'" />
    <h2>Examples</h2>
    <app-example title="Basic" [code]="basic"><kn-breadcrumbs [items]="trail" /></app-example>
    <app-example title="Custom separator" [code]="sep"><kn-breadcrumbs [items]="trail" separator="›" /></app-example>
    <h2>API</h2>
    <app-api-table heading="Inputs" [rows]="inputs" />
    <h2>KnCrumb shape</h2>
    <app-code-block [code]="shape" />
  `,
  styles: [`:host { display: block; color: var(--kn-text); } h2 { font-family: var(--kn-font-display); font-size: var(--kn-fs-2xl); margin: var(--kn-sp-7) 0 var(--kn-sp-3); }`],
})
export class BreadcrumbsPage {
  protected readonly trail: KnCrumb[] = [
    { label: 'Home', href: '/' },
    { label: 'Customers', href: '/customers' },
    { label: 'Aisha Rahman' },
  ];
  protected readonly basic = `trail = [
  { label: 'Home', href: '/' },
  { label: 'Customers', routerLink: '/customers' },
  { label: 'Aisha Rahman' },
];

<kn-breadcrumbs [items]="trail" />`;
  protected readonly sep = `<kn-breadcrumbs [items]="trail" separator="›" />`;
  protected readonly shape = `interface KnCrumb {
  label: string;
  href?: string;
  routerLink?: string | string[];
}`;
  protected readonly inputs: ApiRow[] = [
    { name: 'items', type: 'KnCrumb[]', default: '[]', description: 'The crumb path. Last item renders as current page.' },
    { name: 'separator', type: 'string', default: `'/'`, description: 'Character or text between crumbs.' },
    { name: 'ariaLabel', type: 'string', default: `'Breadcrumb'`, description: 'Accessible nav label.' },
  ];
}
