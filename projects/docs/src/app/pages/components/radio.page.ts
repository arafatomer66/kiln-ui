import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KnRadioGroupComponent, KnRadioComponent } from 'kiln-ui';
import { ApiTableComponent, ApiRow } from '../../shared/api-table.component';
import { ExampleComponent } from '../../shared/example.component';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { CodeBlockComponent } from '../../shared/code-block.component';

@Component({
  selector: 'app-radio-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [KnRadioGroupComponent, KnRadioComponent, PageHeaderComponent, ExampleComponent, ApiTableComponent, CodeBlockComponent],
  template: `
    <app-page-header eyebrow="FOUNDATION" title="Radio" subtitle="Choose exactly one option from a small set." />

    <h2>Import</h2>
    <app-code-block [code]="importCode" />

    <h2>Examples</h2>

    <app-example title="Vertical group" [code]="vertical">
      <kn-radio-group ariaLabel="Plan">
        <kn-radio [value]="'starter'" label="Starter" />
        <kn-radio [value]="'pro'" label="Pro" />
        <kn-radio [value]="'enterprise'" label="Enterprise" />
      </kn-radio-group>
    </app-example>

    <app-example title="Horizontal group" [code]="horizontal">
      <kn-radio-group orientation="horizontal" ariaLabel="Theme">
        <kn-radio [value]="'light'" label="Light" />
        <kn-radio [value]="'dark'" label="Dark" />
        <kn-radio [value]="'system'" label="System" />
      </kn-radio-group>
    </app-example>

    <h2>API — kn-radio-group</h2>
    <app-api-table heading="Inputs" [rows]="groupInputs" />

    <h2>API — kn-radio</h2>
    <app-api-table heading="Inputs" [rows]="radioInputs" />
  `,
  styles: [`:host { display: block; color: var(--kn-text); } h2 { font-family: var(--kn-font-display); font-size: var(--kn-fs-2xl); margin: var(--kn-sp-7) 0 var(--kn-sp-3); }`],
})
export class RadioPage {
  protected readonly importCode = `import { KnRadioGroupComponent, KnRadioComponent } from '@kiln/ui';`;

  protected readonly vertical = `<kn-radio-group [(ngModel)]="plan">
  <kn-radio [value]="'starter'" label="Starter" />
  <kn-radio [value]="'pro'" label="Pro" />
  <kn-radio [value]="'enterprise'" label="Enterprise" />
</kn-radio-group>`;

  protected readonly horizontal = `<kn-radio-group orientation="horizontal" [(ngModel)]="theme">
  <kn-radio [value]="'light'" label="Light" />
  <kn-radio [value]="'dark'" label="Dark" />
  <kn-radio [value]="'system'" label="System" />
</kn-radio-group>`;

  protected readonly groupInputs: ApiRow[] = [
    { name: 'orientation', type: `'horizontal' | 'vertical'`, default: `'vertical'`, description: 'Layout direction.' },
    { name: 'name', type: 'string', default: '(auto)', description: 'Underlying input name attribute.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable all radios in the group.' },
    { name: 'ariaLabel', type: 'string', default: `''`, description: 'Accessible group label.' },
  ];

  protected readonly radioInputs: ApiRow[] = [
    { name: 'value', type: 'unknown', default: 'null', description: 'The value selected when this radio is chosen.' },
    { name: 'label', type: 'string', default: `''`, description: 'Visible label.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable just this option.' },
  ];
}
