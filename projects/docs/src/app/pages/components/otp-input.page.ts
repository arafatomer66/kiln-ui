import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { KnOtpInputComponent } from 'kiln-ui';
import { ApiTableComponent, ApiRow } from '../../shared/api-table.component';
import { ExampleComponent } from '../../shared/example.component';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { CodeBlockComponent } from '../../shared/code-block.component';

@Component({
  selector: 'app-otp-input-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [KnOtpInputComponent, PageHeaderComponent, ExampleComponent, ApiTableComponent, CodeBlockComponent],
  template: `
    <app-page-header eyebrow="ADVANCED" title="OTP Input" subtitle="Six-digit one-time password input with auto-advance, paste support, and keyboard navigation. Built for phone-OTP login flows." />

    <h2>Import</h2>
    <app-code-block [code]="'import { KnOtpInputComponent } from \\'kiln-ui\\';'" />

    <h2>Examples</h2>

    <app-example title="Basic — 6 digits" [code]="basic">
      <kn-otp-input
        label="Verification code"
        helperText="We sent a 6-digit code to your phone."
        (completed)="onComplete($event)"
        (valueChange)="lastValue.set($event)"
      />
    </app-example>

    <app-example title="Custom length — 4 digits" [code]="four">
      <kn-otp-input [length]="4" label="PIN" />
    </app-example>

    <app-example title="Error state" [code]="error">
      <kn-otp-input
        label="Verification code"
        [invalid]="true"
        errorMessage="Code expired. Resend a new code below."
      />
    </app-example>

    <h2>API</h2>
    <app-api-table heading="Inputs" [rows]="inputs" />
    <app-api-table heading="Outputs" [rows]="outputs" [showDefault]="false" />

    <h2>Accessibility</h2>
    <ul>
      <li>Each cell is labeled "Digit 1", "Digit 2", etc.</li>
      <li><code>autocomplete="one-time-code"</code> enables iOS auto-fill from SMS.</li>
      <li>Backspace clears the current cell and focuses the previous one.</li>
      <li>Pasting a multi-digit string fills cells left-to-right.</li>
      <li>Arrow Left / Right move focus between cells.</li>
    </ul>
  `,
  styles: [`:host { display: block; color: var(--kn-text); } h2 { font-family: var(--kn-font-display); font-size: var(--kn-fs-2xl); margin: var(--kn-sp-7) 0 var(--kn-sp-3); } li { color: var(--kn-text-muted); line-height: var(--kn-lh-relaxed); } code { background: var(--kn-surface); padding: 1px 6px; border-radius: var(--kn-r-xs); font-size: var(--kn-fs-sm); } ul { padding-left: var(--kn-sp-5); }`],
})
export class OtpInputPage {
  protected readonly lastValue = signal('');

  protected readonly basic = `<kn-otp-input
  label="Verification code"
  helperText="We sent a 6-digit code to your phone."
  (completed)="onComplete($event)"
/>`;

  protected readonly four = `<kn-otp-input [length]="4" label="PIN" />`;

  protected readonly error = `<kn-otp-input
  label="Verification code"
  [invalid]="true"
  errorMessage="Code expired. Resend a new code below."
/>`;

  protected onComplete(code: string): void {
    console.log('OTP completed:', code);
  }

  protected readonly inputs: ApiRow[] = [
    { name: 'length', type: 'number', default: '6', description: 'Number of digit cells.' },
    { name: 'label', type: 'string', default: `''`, description: 'Field label.' },
    { name: 'helperText', type: 'string', default: `''`, description: 'Muted helper line.' },
    { name: 'errorMessage', type: 'string', default: `''`, description: 'Shown when invalid is true.' },
    { name: 'invalid', type: 'boolean', default: 'false', description: 'Apply error styling.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable interaction.' },
  ];

  protected readonly outputs: ApiRow[] = [
    { name: 'completed', type: 'EventEmitter<string>', description: 'Fires when all cells are filled. Use for auto-submit.' },
    { name: 'valueChange', type: 'EventEmitter<string>', description: 'Fires on every input change.' },
  ];
}
