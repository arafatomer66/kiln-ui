import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KnPhoneInputComponent } from 'kiln-ui';
import { ApiTableComponent, ApiRow } from '../../shared/api-table.component';
import { ExampleComponent } from '../../shared/example.component';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { CodeBlockComponent } from '../../shared/code-block.component';

@Component({
  selector: 'app-phone-input-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, KnPhoneInputComponent, PageHeaderComponent, ExampleComponent, ApiTableComponent, CodeBlockComponent],
  template: `
    <app-page-header
      eyebrow="ADVANCED"
      title="Phone Input"
      subtitle="International phone-number input with a country picker. Defaults to 🇧🇩 +880; ships with 13 popular regions out of the box."
    />

    <h2>Import</h2>
    <app-code-block [code]="'import { KnPhoneInputComponent } from \\'@kiln/ui\\';'" />

    <h2>Examples</h2>

    <app-example title="Default (Bangladesh)" [code]="basic">
      <div style="width: 360px;">
        <kn-phone-input label="Mobile number" helperText="We'll send a verification code." />
      </div>
    </app-example>

    <app-example title="Different default country" [code]="india">
      <div style="width: 360px;">
        <kn-phone-input label="Mobile number" defaultCountry="IN" placeholder="98765 43210" />
      </div>
    </app-example>

    <app-example title="With error" [code]="errored">
      <div style="width: 360px;">
        <kn-phone-input
          label="Mobile number"
          [invalid]="true"
          errorMessage="Please enter a valid mobile number."
        />
      </div>
    </app-example>

    <h2>API</h2>
    <app-api-table heading="Inputs" [rows]="inputs" />
    <app-api-table heading="Outputs" [rows]="outputs" [showDefault]="false" />

    <h2>Notes</h2>
    <p>The component does not enforce strict per-country format validation — that's intentional. Pair with <code>libphonenumber-js</code> for validation in your form layer.</p>
  `,
  styles: [`:host { display: block; color: var(--kn-text); } h2 { font-family: var(--kn-font-display); font-size: var(--kn-fs-2xl); margin: var(--kn-sp-7) 0 var(--kn-sp-3); } p { color: var(--kn-text-muted); line-height: var(--kn-lh-relaxed); } code { background: var(--kn-surface); padding: 1px 6px; border-radius: var(--kn-r-xs); font-size: var(--kn-fs-sm); }`],
})
export class PhoneInputPage {
  protected readonly basic = `<kn-phone-input label="Mobile number" helperText="..." />`;
  protected readonly india = `<kn-phone-input label="Mobile number" defaultCountry="IN" />`;
  protected readonly errored = `<kn-phone-input
  label="Mobile number"
  [invalid]="true"
  errorMessage="Please enter a valid mobile number."
/>`;

  protected readonly inputs: ApiRow[] = [
    { name: 'label', type: 'string', default: `''`, description: 'Field label.' },
    { name: 'placeholder', type: 'string', default: `'1XXX-XXXXXX'`, description: 'Placeholder for the national number.' },
    { name: 'defaultCountry', type: 'string', default: `'BD'`, description: 'ISO-2 country code to preselect.' },
    { name: 'countries', type: 'KnCountry[]', default: 'KN_COUNTRIES', description: 'Override the picker list.' },
    { name: 'helperText', type: 'string', default: `''`, description: 'Muted helper line.' },
    { name: 'errorMessage', type: 'string', default: `''`, description: 'Shown when invalid is true.' },
    { name: 'invalid', type: 'boolean', default: 'false', description: 'Apply error styling.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable interaction.' },
  ];

  protected readonly outputs: ApiRow[] = [
    { name: 'valueChange', type: 'EventEmitter<string>', description: 'Emits the full E.164-style value (e.g. "+880 1711234567").' },
  ];
}
