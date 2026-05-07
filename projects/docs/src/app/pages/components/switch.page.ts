import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KnSwitchComponent } from 'kiln-ui';
import { ApiTableComponent, ApiRow } from '../../shared/api-table.component';
import { ExampleComponent } from '../../shared/example.component';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { CodeBlockComponent } from '../../shared/code-block.component';

@Component({
  selector: 'app-switch-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [KnSwitchComponent, PageHeaderComponent, ExampleComponent, ApiTableComponent, CodeBlockComponent],
  template: `
    <app-page-header eyebrow="FOUNDATION" title="Switch" subtitle="Toggle a setting on or off. Use for instant-effect preferences." />

    <h2>Import</h2>
    <app-code-block [code]="'import { KnSwitchComponent } from \\'@kiln/ui\\';'" />

    <h2>Examples</h2>
    <app-example title="Basic" [code]="basic"><kn-switch label="Enable notifications" /></app-example>
    <app-example title="Disabled" [code]="disabled"><kn-switch label="Locked setting" [disabled]="true" /></app-example>

    <h2>API</h2>
    <app-api-table heading="Inputs" [rows]="inputs" />
    <app-api-table heading="Outputs" [rows]="outputs" [showDefault]="false" />
  `,
  styles: [`:host { display: block; color: var(--kn-text); } h2 { font-family: var(--kn-font-display); font-size: var(--kn-fs-2xl); margin: var(--kn-sp-7) 0 var(--kn-sp-3); }`],
})
export class SwitchPage {
  protected readonly basic = `<kn-switch label="Enable notifications" />`;
  protected readonly disabled = `<kn-switch label="Locked setting" [disabled]="true" />`;

  protected readonly inputs: ApiRow[] = [
    { name: 'label', type: 'string', default: `''`, description: 'Visible label.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable interaction.' },
    { name: 'ariaLabel', type: 'string', default: `''`, description: 'Override accessible label.' },
  ];

  protected readonly outputs: ApiRow[] = [
    { name: 'checkedChange', type: 'EventEmitter<boolean>', description: 'Emitted when toggled.' },
  ];
}
