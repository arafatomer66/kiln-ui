import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KnComboboxComponent, KnComboOption } from 'kiln-ui';
import { ApiTableComponent, ApiRow } from '../../shared/api-table.component';
import { ExampleComponent } from '../../shared/example.component';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { CodeBlockComponent } from '../../shared/code-block.component';

@Component({
  selector: 'app-combobox-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, KnComboboxComponent, PageHeaderComponent, ExampleComponent, ApiTableComponent, CodeBlockComponent],
  template: `
    <app-page-header
      eyebrow="ADVANCED"
      title="Combobox"
      subtitle="Searchable, type-to-filter select. Shows option descriptions, supports clearable and async loading states."
    />

    <h2>Import</h2>
    <app-code-block [code]="'import { KnComboboxComponent, KnComboOption } from \\'@kiln/ui\\';'" />

    <h2>Examples</h2>

    <app-example title="Basic with descriptions" [code]="basic">
      <div style="width: 360px;">
        <kn-combobox label="Assignee" [options]="assignees" placeholder="Search team…" />
      </div>
    </app-example>

    <app-example title="Loading state" [code]="loading">
      <div style="width: 360px;">
        <kn-combobox label="Repository" [options]="[]" [loading]="true" placeholder="Search GitHub…" />
      </div>
    </app-example>

    <h2>API</h2>
    <app-api-table heading="Inputs" [rows]="inputs" />
    <app-api-table heading="Outputs" [rows]="outputs" [showDefault]="false" />
  `,
  styles: [`:host { display: block; color: var(--kn-text); } h2 { font-family: var(--kn-font-display); font-size: var(--kn-fs-2xl); margin: var(--kn-sp-7) 0 var(--kn-sp-3); }`],
})
export class ComboboxPage {
  protected readonly assignees: KnComboOption<string>[] = [
    { value: 'aisha',     label: 'Aisha Rahman',    description: 'Founder · @aisha' },
    { value: 'bashir',    label: 'Bashir Hossain',  description: 'Engineer · @bashir' },
    { value: 'chowdhury', label: 'Chowdhury Khan',  description: 'Designer · @ck' },
    { value: 'dipika',    label: 'Dipika Sen',      description: 'Marketing · @dipika' },
    { value: 'emon',      label: 'Emon Kabir',      description: 'Engineer · @emon' },
    { value: 'farhana',   label: 'Farhana Akter',   description: 'Operations · @farhana', disabled: true },
  ];

  protected readonly basic = `options: KnComboOption[] = [
  { value: 'aisha', label: 'Aisha Rahman', description: 'Founder · @aisha' },
  { value: 'bashir', label: 'Bashir Hossain', description: 'Engineer · @bashir' },
];

<kn-combobox label="Assignee" [options]="options" [(ngModel)]="assignee" />`;

  protected readonly loading = `<kn-combobox
  label="Repository"
  [options]="results"
  [loading]="searching"
  (searchChange)="onSearch($event)"
/>`;

  protected readonly inputs: ApiRow[] = [
    { name: 'options', type: 'KnComboOption<T>[]', default: '[]', description: 'Selectable options.' },
    { name: 'label', type: 'string', default: `''`, description: 'Field label.' },
    { name: 'placeholder', type: 'string', default: `'Type to search…'`, description: 'Empty-state placeholder.' },
    { name: 'noResultsText', type: 'string', default: `'No matches found'`, description: 'Shown when filter returns 0.' },
    { name: 'loading', type: 'boolean', default: 'false', description: 'Show "Loading…" while async results stream.' },
    { name: 'clearable', type: 'boolean', default: 'true', description: 'Show × to clear the selection.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable interaction.' },
    { name: 'invalid', type: 'boolean', default: 'false', description: 'Apply error styling.' },
  ];

  protected readonly outputs: ApiRow[] = [
    { name: 'searchChange', type: 'EventEmitter<string>', description: 'Emits as the user types — wire to your async data source.' },
    { name: 'valueChange', type: 'EventEmitter<T | null>', description: 'Emits when a value is selected or cleared.' },
  ];
}
