import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KnSpinnerComponent } from 'kiln-ui';
import { ApiTableComponent, ApiRow } from '../../shared/api-table.component';
import { ExampleComponent } from '../../shared/example.component';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { CodeBlockComponent } from '../../shared/code-block.component';

@Component({
  selector: 'app-spinner-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [KnSpinnerComponent, PageHeaderComponent, ExampleComponent, ApiTableComponent, CodeBlockComponent],
  template: `
    <app-page-header eyebrow="FOUNDATION" title="Spinner" subtitle="Indeterminate loading indicator. Pairs with text or wraps blocks." />

    <h2>Import</h2>
    <app-code-block [code]="'import { KnSpinnerComponent } from \\'kiln-ui\\';'" />

    <h2>Examples</h2>

    <app-example title="Sizes" [code]="sizes">
      <kn-spinner size="sm" />
      <kn-spinner size="md" />
      <kn-spinner size="lg" />
      <kn-spinner size="xl" />
    </app-example>

    <h2>API</h2>
    <app-api-table heading="Inputs" [rows]="inputs" />
  `,
  styles: [`:host { display: block; color: var(--kn-text); } h2 { font-family: var(--kn-font-display); font-size: var(--kn-fs-2xl); margin: var(--kn-sp-7) 0 var(--kn-sp-3); }`],
})
export class SpinnerPage {
  protected readonly sizes = `<kn-spinner size="sm" />
<kn-spinner size="md" />
<kn-spinner size="lg" />
<kn-spinner size="xl" />`;

  protected readonly inputs: ApiRow[] = [
    { name: 'size', type: `'sm' | 'md' | 'lg' | 'xl'`, default: `'md'`, description: 'Spinner size.' },
    { name: 'ariaLabel', type: 'string', default: `'Loading'`, description: 'Accessible label.' },
  ];
}
