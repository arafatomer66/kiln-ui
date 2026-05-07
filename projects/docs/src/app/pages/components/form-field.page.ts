import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KnFormFieldComponent, KnInputComponent, KnSelectComponent, KnSelectOption } from 'kiln-ui';
import { ApiTableComponent, ApiRow } from '../../shared/api-table.component';
import { ExampleComponent } from '../../shared/example.component';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { CodeBlockComponent } from '../../shared/code-block.component';

@Component({
  selector: 'app-form-field-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, KnFormFieldComponent, KnInputComponent, KnSelectComponent, PageHeaderComponent, ExampleComponent, ApiTableComponent, CodeBlockComponent],
  template: `
    <app-page-header eyebrow="PRO" title="Form Field" subtitle="Wrapper that gives any input consistent label, hint, helper, and error treatment. Wrap once, get unified spacing and alignment everywhere." />
    <h2>Import</h2>
    <app-code-block [code]="'import { KnFormFieldComponent } from \\'kiln-ui\\';'" />
    <h2>Examples</h2>
    <app-example title="Required field with hint and error" [code]="errored">
      <div style="width: 360px;">
        <kn-form-field
          label="Email address"
          hint="Required"
          errorMessage="Please enter a valid email."
          [invalid]="true"
          [required]="true"
        >
          <kn-input placeholder="you@example.com" />
        </kn-form-field>
      </div>
    </app-example>
    <app-example title="With helper text" [code]="helper">
      <div style="width: 360px;">
        <kn-form-field label="Workspace URL" helperText="Lowercase letters and dashes only.">
          <kn-input placeholder="acme" />
        </kn-form-field>
      </div>
    </app-example>
    <app-example title="Wraps any input" [code]="select">
      <div style="width: 360px;">
        <kn-form-field label="Plan" hint="Required" [required]="true">
          <kn-select [options]="plans" placeholder="Choose a plan" />
        </kn-form-field>
      </div>
    </app-example>
    <h2>API</h2>
    <app-api-table heading="Inputs" [rows]="inputs" />
    <h2>Why use Form Field?</h2>
    <p>Components like <code>KnInput</code> and <code>KnSelect</code> have their own label/error props. <code>KnFormField</code> centralizes that logic for any custom input or third-party component you wrap — same label format, same error treatment, same spacing rhythm. Useful when you need a consistent form across mixed inputs.</p>
  `,
  styles: [`:host { display: block; color: var(--kn-text); } h2 { font-family: var(--kn-font-display); font-size: var(--kn-fs-2xl); margin: var(--kn-sp-7) 0 var(--kn-sp-3); } p { color: var(--kn-text-muted); line-height: var(--kn-lh-relaxed); } code { background: var(--kn-surface); padding: 1px 6px; border-radius: var(--kn-r-xs); font-size: var(--kn-fs-sm); }`],
})
export class FormFieldPage {
  protected readonly plans: KnSelectOption<string>[] = [
    { value: 'free', label: 'Free' },
    { value: 'pro',  label: 'Pro' },
  ];
  protected readonly errored = `<kn-form-field
  label="Email address"
  hint="Required"
  errorMessage="Please enter a valid email."
  [invalid]="true"
  [required]="true"
>
  <kn-input placeholder="you@example.com" />
</kn-form-field>`;
  protected readonly helper = `<kn-form-field label="Workspace URL" helperText="Lowercase letters and dashes only.">
  <kn-input placeholder="acme" />
</kn-form-field>`;
  protected readonly select = `<kn-form-field label="Plan" [required]="true">
  <kn-select [options]="plans" />
</kn-form-field>`;
  protected readonly inputs: ApiRow[] = [
    { name: 'label', type: 'string', default: `''`, description: 'Field label (mono caps).' },
    { name: 'hint', type: 'string', default: `''`, description: 'Right-aligned hint next to label.' },
    { name: 'helperText', type: 'string', default: `''`, description: 'Muted line below the field.' },
    { name: 'errorMessage', type: 'string', default: `''`, description: 'Shown when invalid is true.' },
    { name: 'invalid', type: 'boolean', default: 'false', description: 'Apply error styling.' },
    { name: 'required', type: 'boolean', default: 'false', description: 'Show * after label.' },
    { name: 'spacing', type: `'compact' | 'comfortable'`, default: `'comfortable'`, description: 'Vertical rhythm between fields.' },
  ];
}
