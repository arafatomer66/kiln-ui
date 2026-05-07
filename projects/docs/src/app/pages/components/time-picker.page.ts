import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KnTimePickerComponent } from 'kiln-ui';
import { ApiTableComponent, ApiRow } from '../../shared/api-table.component';
import { ExampleComponent } from '../../shared/example.component';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { CodeBlockComponent } from '../../shared/code-block.component';

@Component({
  selector: 'app-time-picker-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, KnTimePickerComponent, PageHeaderComponent, ExampleComponent, ApiTableComponent, CodeBlockComponent],
  template: `
    <app-page-header eyebrow="PRO" title="Time Picker" subtitle="Hours + minutes input with optional 12-hour AM/PM toggle. CVA-bound; emits 'HH:mm' format." />
    <h2>Import</h2>
    <app-code-block [code]="'import { KnTimePickerComponent } from \\'kiln-ui\\';'" />
    <h2>Examples</h2>
    <app-example title="24-hour" [code]="'<kn-time-picker label=&quot;Start time&quot; />'"><kn-time-picker label="Start time" /></app-example>
    <app-example title="12-hour" [code]="'<kn-time-picker label=&quot;Start time&quot; [use12Hour]=&quot;true&quot; />'"><kn-time-picker label="Start time" [use12Hour]="true" /></app-example>
    <h2>API</h2>
    <app-api-table heading="Inputs" [rows]="inputs" />
    <app-api-table heading="Outputs" [rows]="outputs" [showDefault]="false" />
  `,
  styles: [`:host { display: block; color: var(--kn-text); } h2 { font-family: var(--kn-font-display); font-size: var(--kn-fs-2xl); margin: var(--kn-sp-7) 0 var(--kn-sp-3); }`],
})
export class TimePickerPage {
  protected readonly inputs: ApiRow[] = [
    { name: 'label', type: 'string', default: `''`, description: 'Field label.' },
    { name: 'use12Hour', type: 'boolean', default: 'false', description: 'Show 12-hour input with AM/PM toggle.' },
    { name: 'helperText', type: 'string', default: `''`, description: 'Helper line below the field.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable interaction.' },
  ];
  protected readonly outputs: ApiRow[] = [
    { name: 'valueChange', type: 'EventEmitter<string>', description: `Emits 'HH:mm' (24-hour) on change.` },
  ];
}
