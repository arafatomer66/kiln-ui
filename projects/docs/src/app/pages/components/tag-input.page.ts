import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KnTagInputComponent } from 'kiln-ui';
import { ApiTableComponent, ApiRow } from '../../shared/api-table.component';
import { ExampleComponent } from '../../shared/example.component';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { CodeBlockComponent } from '../../shared/code-block.component';

@Component({
  selector: 'app-tag-input-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, KnTagInputComponent, PageHeaderComponent, ExampleComponent, ApiTableComponent, CodeBlockComponent],
  template: `
    <app-page-header eyebrow="EXTENDED" title="Tag Input" subtitle="Type, press Enter, get a tag. Backspace removes the last tag. Comma also commits. Form-bound via CVA." />

    <h2>Import</h2>
    <app-code-block [code]="'import { KnTagInputComponent } from \\'@kiln/ui\\';'" />

    <h2>Examples</h2>

    <app-example title="Basic" [code]="basic">
      <div style="width: 480px;">
        <kn-tag-input
          label="Skills"
          placeholder="Add a skill and press Enter…"
          helperText="Maximum 10 tags."
          [(ngModel)]="skills"
        />
      </div>
    </app-example>

    <app-example title="With initial values" [code]="initial">
      <div style="width: 480px;">
        <kn-tag-input
          label="Filters"
          [(ngModel)]="filters"
        />
      </div>
    </app-example>

    <h2>API</h2>
    <app-api-table heading="Inputs" [rows]="inputs" />
    <app-api-table heading="Outputs" [rows]="outputs" [showDefault]="false" />

    <h2>Keyboard</h2>
    <ul>
      <li><kbd>Enter</kbd>, <kbd>,</kbd>, or <kbd>Tab</kbd> — commit the typed text as a tag.</li>
      <li><kbd>Backspace</kbd> on an empty input — remove the last tag.</li>
      <li>Click on a tag's × — remove it.</li>
    </ul>
  `,
  styles: [`:host { display: block; color: var(--kn-text); } h2 { font-family: var(--kn-font-display); font-size: var(--kn-fs-2xl); margin: var(--kn-sp-7) 0 var(--kn-sp-3); } li { color: var(--kn-text-muted); line-height: var(--kn-lh-relaxed); } kbd { background: var(--kn-surface); padding: 1px 6px; border-radius: var(--kn-r-xs); font-family: var(--kn-font-mono); font-size: var(--kn-fs-sm); }`],
})
export class TagInputPage {
  protected readonly skills = signal<string[]>([]);
  protected readonly filters = signal<string[]>(['Active', 'Last 30 days', 'High priority']);

  protected readonly basic = `<kn-tag-input
  label="Skills"
  placeholder="Add a skill and press Enter…"
  helperText="Maximum 10 tags."
  [(ngModel)]="skills"
/>`;

  protected readonly initial = `tags = signal(['Active', 'Last 30 days', 'High priority']);

<kn-tag-input label="Filters" [(ngModel)]="tags" />`;

  protected readonly inputs: ApiRow[] = [
    { name: 'label', type: 'string', default: `''`, description: 'Field label.' },
    { name: 'placeholder', type: 'string', default: `'Type and press Enter…'`, description: 'Empty placeholder.' },
    { name: 'helperText', type: 'string', default: `''`, description: 'Helper line below the input.' },
    { name: 'errorMessage', type: 'string', default: `''`, description: 'Shown when invalid is true.' },
    { name: 'invalid', type: 'boolean', default: 'false', description: 'Apply error styling.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable interaction.' },
    { name: 'maxTags', type: 'number', default: '20', description: 'Total tags allowed.' },
    { name: 'allowDuplicates', type: 'boolean', default: 'false', description: 'Permit repeated tag values.' },
  ];

  protected readonly outputs: ApiRow[] = [
    { name: 'tagsChange', type: 'EventEmitter<string[]>', description: 'Emits the full tag array on every change.' },
  ];
}
