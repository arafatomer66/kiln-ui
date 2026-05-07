import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { KnInputComponent } from 'kiln-ui';
import { ApiTableComponent, ApiRow } from '../../shared/api-table.component';
import { ExampleComponent } from '../../shared/example.component';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { CodeBlockComponent } from '../../shared/code-block.component';

@Component({
  selector: 'app-input-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    KnInputComponent,
    FormsModule,
    ReactiveFormsModule,
    PageHeaderComponent,
    ExampleComponent,
    ApiTableComponent,
    CodeBlockComponent,
  ],
  template: `
    <app-page-header
      eyebrow="FOUNDATION"
      title="Input"
      subtitle="A single-line text field with built-in label, helper text, error state, and prefix/suffix slots."
    />

    <h2>Import</h2>
    <app-code-block [code]="'import { KnInputComponent } from \\'@kiln/ui\\';'" />

    <h2>Examples</h2>

    <app-example title="Basic" [code]="basicCode">
      <div style="width: 320px">
        <kn-input label="Email address" placeholder="you@example.com" />
      </div>
    </app-example>

    <app-example title="With helper text" [code]="helperCode">
      <div style="width: 320px">
        <kn-input
          label="Workspace URL"
          hint="Required"
          placeholder="acme"
          helperText="Lowercase letters and dashes only."
        />
      </div>
    </app-example>

    <app-example title="Error state" [code]="errorCode">
      <div style="width: 320px">
        <kn-input
          label="Email address"
          [invalid]="true"
          errorMessage="Please enter a valid email address."
          [(ngModel)]="emailValue"
        />
      </div>
    </app-example>

    <app-example title="Prefix and suffix" [code]="affixCode">
      <div style="width: 320px">
        <kn-input label="Amount" prefix="$" suffix="USD" placeholder="0.00" />
      </div>
    </app-example>

    <app-example title="Reactive forms" [code]="reactiveCode">
      <div style="width: 320px">
        <kn-input label="Username" [formControl]="username" />
        <p style="margin-top: 8px; color: var(--kn-text-muted); font-size: 12px;">
          Value: {{ username.value || '(empty)' }}
        </p>
      </div>
    </app-example>

    <h2>API</h2>
    <app-api-table heading="Inputs" [rows]="inputs" />
    <app-api-table heading="Outputs" [rows]="outputs" [showDefault]="false" />

    <h2>Accessibility</h2>
    <ul>
      <li>Native <code>&lt;input&gt;</code> with auto-generated <code>id</code> and matching <code>&lt;label for&gt;</code>.</li>
      <li><code>aria-invalid</code> is set when <code>invalid</code> is true; helper or error message is linked via <code>aria-describedby</code>.</li>
      <li>Focus ring is always visible — never disabled.</li>
      <li>Implements <code>ControlValueAccessor</code>, so it works with both reactive and template-driven forms.</li>
    </ul>
  `,
  styles: [`
    :host { display: block; color: var(--kn-text); }
    h2 { font-family: var(--kn-font-display); font-size: var(--kn-fs-2xl); margin: var(--kn-sp-7) 0 var(--kn-sp-3); }
    li { line-height: var(--kn-lh-relaxed); color: var(--kn-text-muted); }
    code { background: var(--kn-surface); padding: 1px 6px; border-radius: var(--kn-r-xs); font-size: var(--kn-fs-sm); }
    ul { padding-left: var(--kn-sp-5); }
  `],
})
export class InputPage {
  protected readonly emailValue = signal('not-an-email');
  protected readonly username = new FormControl('arafat');

  protected readonly basicCode = `<kn-input label="Email address" placeholder="you@example.com" />`;

  protected readonly helperCode = `<kn-input
  label="Workspace URL"
  hint="Required"
  placeholder="acme"
  helperText="Lowercase letters and dashes only."
/>`;

  protected readonly errorCode = `<kn-input
  label="Email address"
  [invalid]="true"
  errorMessage="Please enter a valid email address."
  [(ngModel)]="email"
/>`;

  protected readonly affixCode = `<kn-input label="Amount" prefix="$" suffix="USD" placeholder="0.00" />`;

  protected readonly reactiveCode = `import { FormControl } from '@angular/forms';

username = new FormControl('');

<kn-input label="Username" [formControl]="username" />`;

  protected readonly inputs: ApiRow[] = [
    { name: 'label', type: 'string', default: `''`, description: 'Field label.' },
    { name: 'hint', type: 'string', default: `''`, description: 'Right-aligned hint next to the label (e.g. "Required").' },
    { name: 'placeholder', type: 'string', default: `''`, description: 'Placeholder text.' },
    { name: 'type', type: `'text' | 'email' | 'password' | 'tel' | 'url' | 'number' | 'search'`, default: `'text'`, description: 'Native input type.' },
    { name: 'size', type: `'sm' | 'md' | 'lg'`, default: `'md'`, description: 'Input size.' },
    { name: 'prefix', type: 'string', default: `''`, description: 'Text rendered in a prefix addon slot.' },
    { name: 'suffix', type: 'string', default: `''`, description: 'Text rendered in a suffix addon slot.' },
    { name: 'helperText', type: 'string', default: `''`, description: 'Muted helper line below the field.' },
    { name: 'errorMessage', type: 'string', default: `''`, description: 'Shown below the field when invalid is true.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable interaction.' },
    { name: 'readonly', type: 'boolean', default: 'false', description: 'Prevent edits but allow focus and copy.' },
    { name: 'invalid', type: 'boolean', default: 'false', description: 'Apply error styling.' },
  ];

  protected readonly outputs: ApiRow[] = [
    { name: 'valueChange', type: 'EventEmitter<string>', description: 'Emitted on each input event.' },
  ];
}
