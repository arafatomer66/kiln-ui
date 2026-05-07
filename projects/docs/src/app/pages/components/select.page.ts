import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KnSelectComponent, KnSelectOption } from 'kiln-ui';
import { ApiTableComponent, ApiRow } from '../../shared/api-table.component';
import { ExampleComponent } from '../../shared/example.component';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { CodeBlockComponent } from '../../shared/code-block.component';

@Component({
  selector: 'app-select-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    KnSelectComponent, FormsModule,
    PageHeaderComponent, ExampleComponent, ApiTableComponent, CodeBlockComponent,
  ],
  template: `
    <app-page-header eyebrow="OVERLAY" title="Select" subtitle="A searchable single-value picker. Form-bound via ControlValueAccessor." />

    <h2>Import</h2>
    <app-code-block [code]="'import { KnSelectComponent } from \\'kiln-ui\\';'" />

    <h2>Examples</h2>

    <app-example title="Basic" [code]="basic">
      <div style="width: 320px;"><kn-select label="Plan" [options]="plans" /></div>
    </app-example>

    <app-example title="With error" [code]="errored">
      <div style="width: 320px;">
        <kn-select label="Country" [options]="countries" [invalid]="true" errorMessage="Country is required." />
      </div>
    </app-example>

    <h2>API</h2>
    <app-api-table heading="Inputs" [rows]="inputs" />
  `,
  styles: [`:host { display: block; color: var(--kn-text); } h2 { font-family: var(--kn-font-display); font-size: var(--kn-fs-2xl); margin: var(--kn-sp-7) 0 var(--kn-sp-3); }`],
})
export class SelectPage {
  protected readonly plans: KnSelectOption<string>[] = [
    { value: 'free', label: 'Free' },
    { value: 'pro', label: 'Pro' },
    { value: 'enterprise', label: 'Enterprise' },
  ];

  protected readonly countries: KnSelectOption<string>[] = [
    { value: 'bd', label: 'Bangladesh' },
    { value: 'in', label: 'India' },
    { value: 'pk', label: 'Pakistan' },
  ];

  protected readonly basic = `options: KnSelectOption[] = [
  { value: 'free', label: 'Free' },
  { value: 'pro', label: 'Pro' },
];

<kn-select label="Plan" [options]="options" [(ngModel)]="plan" />`;

  protected readonly errored = `<kn-select
  label="Country"
  [options]="countries"
  [invalid]="true"
  errorMessage="Country is required."
/>`;

  protected readonly inputs: ApiRow[] = [
    { name: 'options', type: 'KnSelectOption<T>[]', default: '[]', description: 'List of selectable options.' },
    { name: 'label', type: 'string', default: `''`, description: 'Field label.' },
    { name: 'placeholder', type: 'string', default: `'Select an option'`, description: 'Placeholder when no value chosen.' },
    { name: 'helperText', type: 'string', default: `''`, description: 'Muted helper line.' },
    { name: 'errorMessage', type: 'string', default: `''`, description: 'Shown when invalid is true.' },
    { name: 'invalid', type: 'boolean', default: 'false', description: 'Apply error styling.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable interaction.' },
  ];
}
