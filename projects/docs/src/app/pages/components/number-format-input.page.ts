import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KnNumberFormatInputComponent } from 'kiln-ui';
import { ApiTableComponent, ApiRow } from '../../shared/api-table.component';
import { ExampleComponent } from '../../shared/example.component';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { CodeBlockComponent } from '../../shared/code-block.component';

@Component({
  selector: 'app-number-format-input-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, KnNumberFormatInputComponent, PageHeaderComponent, ExampleComponent, ApiTableComponent, CodeBlockComponent],
  template: `
    <app-page-header eyebrow="PRO" title="Number Format Input" subtitle="Live-formatted numeric input with locale-aware thousands separators, prefixes, and suffixes." />
    <h2>Import</h2>
    <app-code-block [code]="'import { KnNumberFormatInputComponent } from \\'kiln-ui\\';'" />
    <h2>Examples</h2>
    <app-example title="Currency (BDT)" [code]="bdt"><div style="width:280px"><kn-number-format-input label="Amount" prefix="৳" placeholder="0" locale="en-IN" /></div></app-example>
    <app-example title="USD with decimals" [code]="usd"><div style="width:280px"><kn-number-format-input label="Price" prefix="$" [decimals]="2" placeholder="0.00" /></div></app-example>
    <app-example title="Percentage" [code]="pct"><div style="width:280px"><kn-number-format-input label="Discount" suffix="%" /></div></app-example>
    <h2>API</h2>
    <app-api-table heading="Inputs" [rows]="inputs" />
  `,
  styles: [`:host { display: block; color: var(--kn-text); } h2 { font-family: var(--kn-font-display); font-size: var(--kn-fs-2xl); margin: var(--kn-sp-7) 0 var(--kn-sp-3); }`],
})
export class NumberFormatInputPage {
  protected readonly bdt = `<kn-number-format-input label="Amount" prefix="৳" locale="en-IN" />`;
  protected readonly usd = `<kn-number-format-input label="Price" prefix="$" [decimals]="2" />`;
  protected readonly pct = `<kn-number-format-input label="Discount" suffix="%" />`;
  protected readonly inputs: ApiRow[] = [
    { name: 'label', type: 'string', default: `''`, description: 'Field label.' },
    { name: 'prefix', type: 'string', default: `''`, description: 'Text shown before the number (e.g. "$", "৳").' },
    { name: 'suffix', type: 'string', default: `''`, description: 'Text shown after the number (e.g. "%", " kg").' },
    { name: 'decimals', type: 'number', default: '0', description: 'Number of decimal places to enforce.' },
    { name: 'thousandSeparator', type: 'string', default: `','`, description: 'Thousands separator character.' },
    { name: 'decimalSeparator', type: 'string', default: `'.'`, description: 'Decimal separator character.' },
    { name: 'locale', type: 'string', default: `'en-IN'`, description: 'BCP-47 locale used for formatting.' },
    { name: 'invalid', type: 'boolean', default: 'false', description: 'Apply error styling.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable interaction.' },
  ];
}
