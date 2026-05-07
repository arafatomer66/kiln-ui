import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KnTextareaComponent } from 'kiln-ui';
import { ApiTableComponent, ApiRow } from '../../shared/api-table.component';
import { ExampleComponent } from '../../shared/example.component';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { CodeBlockComponent } from '../../shared/code-block.component';

@Component({
  selector: 'app-textarea-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [KnTextareaComponent, PageHeaderComponent, ExampleComponent, ApiTableComponent, CodeBlockComponent],
  template: `
    <app-page-header eyebrow="FOUNDATION" title="Textarea" subtitle="Multi-line text input with helper, error state, and form integration." />

    <h2>Import</h2>
    <app-code-block [code]="'import { KnTextareaComponent } from \\'kiln-ui\\';'" />

    <h2>Examples</h2>

    <app-example title="Basic" [code]="basic">
      <div style="width: 360px"><kn-textarea label="Notes" placeholder="Tell us more…" /></div>
    </app-example>

    <app-example title="With helper and rows" [code]="helper">
      <div style="width: 360px">
        <kn-textarea label="Description" [rows]="6" helperText="Markdown is supported." />
      </div>
    </app-example>

    <app-example title="Error state" [code]="error">
      <div style="width: 360px">
        <kn-textarea label="Bio" [invalid]="true" errorMessage="Bio cannot be empty." />
      </div>
    </app-example>

    <h2>API</h2>
    <app-api-table heading="Inputs" [rows]="inputs" />
  `,
  styles: [`
    :host { display: block; color: var(--kn-text); }
    h2 { font-family: var(--kn-font-display); font-size: var(--kn-fs-2xl); margin: var(--kn-sp-7) 0 var(--kn-sp-3); }
  `],
})
export class TextareaPage {
  protected readonly basic = `<kn-textarea label="Notes" placeholder="Tell us more…" />`;
  protected readonly helper = `<kn-textarea label="Description" [rows]="6" helperText="Markdown is supported." />`;
  protected readonly error = `<kn-textarea label="Bio" [invalid]="true" errorMessage="Bio cannot be empty." />`;

  protected readonly inputs: ApiRow[] = [
    { name: 'label', type: 'string', default: `''`, description: 'Field label.' },
    { name: 'rows', type: 'number', default: '4', description: 'Visible rows.' },
    { name: 'placeholder', type: 'string', default: `''`, description: 'Placeholder text.' },
    { name: 'helperText', type: 'string', default: `''`, description: 'Helper line below the field.' },
    { name: 'errorMessage', type: 'string', default: `''`, description: 'Shown when invalid is true.' },
    { name: 'invalid', type: 'boolean', default: 'false', description: 'Apply error styling.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable interaction.' },
    { name: 'readonly', type: 'boolean', default: 'false', description: 'Prevent edits.' },
  ];
}
