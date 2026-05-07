import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KnDatePickerComponent } from 'kiln-ui';
import { ApiTableComponent, ApiRow } from '../../shared/api-table.component';
import { ExampleComponent } from '../../shared/example.component';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { CodeBlockComponent } from '../../shared/code-block.component';

@Component({
  selector: 'app-date-picker-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    KnDatePickerComponent,
    PageHeaderComponent, ExampleComponent, ApiTableComponent, CodeBlockComponent,
  ],
  template: `
    <app-page-header eyebrow="COMPOSITE" title="Date Picker" subtitle="Single-date calendar picker with a 7-column grid. CVA-bound for forms." />

    <h2>Import</h2>
    <app-code-block [code]="'import { KnDatePickerComponent } from \\'@kiln/ui\\';'" />

    <h2>Examples</h2>

    <app-example title="Basic" [code]="basic">
      <div style="width: 280px;"><kn-date-picker label="Start date" /></div>
    </app-example>

    <h2>API</h2>
    <app-api-table heading="Inputs" [rows]="inputs" />
    <app-api-table heading="Outputs" [rows]="outputs" [showDefault]="false" />
  `,
  styles: [`:host { display: block; color: var(--kn-text); } h2 { font-family: var(--kn-font-display); font-size: var(--kn-fs-2xl); margin: var(--kn-sp-7) 0 var(--kn-sp-3); }`],
})
export class DatePickerPage {
  protected readonly basic = `<kn-date-picker label="Start date" [(ngModel)]="startDate" />`;

  protected readonly inputs: ApiRow[] = [
    { name: 'label', type: 'string', default: `''`, description: 'Field label.' },
    { name: 'placeholder', type: 'string', default: `'Pick a date'`, description: 'Placeholder when no date selected.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable interaction.' },
  ];

  protected readonly outputs: ApiRow[] = [
    { name: 'valueChange', type: 'EventEmitter<Date | null>', description: 'Emitted when a date is selected.' },
  ];
}
