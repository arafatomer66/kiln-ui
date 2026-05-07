import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KnColorPickerComponent } from 'kiln-ui';
import { ApiTableComponent, ApiRow } from '../../shared/api-table.component';
import { ExampleComponent } from '../../shared/example.component';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { CodeBlockComponent } from '../../shared/code-block.component';

@Component({
  selector: 'app-color-picker-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, KnColorPickerComponent, PageHeaderComponent, ExampleComponent, ApiTableComponent, CodeBlockComponent],
  template: `
    <app-page-header eyebrow="PRO" title="Color Picker" subtitle="Hex input + curated swatch palette. Defaults to the Kiln palette but you can pass any palette." />
    <h2>Import</h2>
    <app-code-block [code]="'import { KnColorPickerComponent } from \\'kiln-ui\\';'" />
    <h2>Examples</h2>
    <app-example title="With palette" [code]="'<kn-color-picker label=&quot;Brand color&quot; />'"><kn-color-picker label="Brand color" /></app-example>
    <app-example title="Hex input only" [code]="'<kn-color-picker label=&quot;Brand color&quot; [showPalette]=&quot;false&quot; />'"><kn-color-picker label="Brand color" [showPalette]="false" /></app-example>
    <h2>API</h2>
    <app-api-table heading="Inputs" [rows]="inputs" />
  `,
  styles: [`:host { display: block; color: var(--kn-text); } h2 { font-family: var(--kn-font-display); font-size: var(--kn-fs-2xl); margin: var(--kn-sp-7) 0 var(--kn-sp-3); }`],
})
export class ColorPickerPage {
  protected readonly inputs: ApiRow[] = [
    { name: 'label', type: 'string', default: `''`, description: 'Field label.' },
    { name: 'showPalette', type: 'boolean', default: 'true', description: 'Show the swatch grid below the hex input.' },
    { name: 'palette', type: 'string[]', default: 'KILN palette', description: 'Custom swatch list (hex strings).' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable interaction.' },
  ];
}
