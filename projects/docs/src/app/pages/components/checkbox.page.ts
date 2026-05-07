import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KnCheckboxComponent } from 'kiln-ui';
import { ApiTableComponent, ApiRow } from '../../shared/api-table.component';
import { ExampleComponent } from '../../shared/example.component';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { CodeBlockComponent } from '../../shared/code-block.component';

@Component({
  selector: 'app-checkbox-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [KnCheckboxComponent, PageHeaderComponent, ExampleComponent, ApiTableComponent, CodeBlockComponent],
  template: `
    <app-page-header eyebrow="FOUNDATION" title="Checkbox" subtitle="Binary on/off control. Implements ControlValueAccessor for form integration." />

    <h2>Import</h2>
    <app-code-block [code]="'import { KnCheckboxComponent } from \\'@kiln/ui\\';'" />

    <h2>Examples</h2>

    <app-example title="Basic" [code]="basic"><kn-checkbox label="Subscribe to newsletter" /></app-example>
    <app-example title="Indeterminate" [code]="indet"><kn-checkbox label="Select all" [indeterminate]="true" /></app-example>
    <app-example title="Disabled" [code]="disabled"><kn-checkbox label="Cannot change" [disabled]="true" /></app-example>

    <h2>API</h2>
    <app-api-table heading="Inputs" [rows]="inputs" />
    <app-api-table heading="Outputs" [rows]="outputs" [showDefault]="false" />
  `,
  styles: [`:host { display: block; color: var(--kn-text); } h2 { font-family: var(--kn-font-display); font-size: var(--kn-fs-2xl); margin: var(--kn-sp-7) 0 var(--kn-sp-3); }`],
})
export class CheckboxPage {
  protected readonly basic = `<kn-checkbox label="Subscribe to newsletter" />`;
  protected readonly indet = `<kn-checkbox label="Select all" [indeterminate]="true" />`;
  protected readonly disabled = `<kn-checkbox label="Cannot change" [disabled]="true" />`;

  protected readonly inputs: ApiRow[] = [
    { name: 'label', type: 'string', default: `''`, description: 'Visible label next to the box.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable interaction.' },
    { name: 'indeterminate', type: 'boolean', default: 'false', description: 'Show indeterminate (mixed) state.' },
    { name: 'ariaLabel', type: 'string', default: `''`, description: 'Override accessible label.' },
  ];

  protected readonly outputs: ApiRow[] = [
    { name: 'checkedChange', type: 'EventEmitter<boolean>', description: 'Emitted when the checked state changes.' },
  ];
}
