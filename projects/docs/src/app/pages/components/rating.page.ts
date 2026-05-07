import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KnRatingComponent } from 'kiln-ui';
import { ApiTableComponent, ApiRow } from '../../shared/api-table.component';
import { ExampleComponent } from '../../shared/example.component';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { CodeBlockComponent } from '../../shared/code-block.component';

@Component({
  selector: 'app-rating-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, KnRatingComponent, PageHeaderComponent, ExampleComponent, ApiTableComponent, CodeBlockComponent],
  template: `
    <app-page-header eyebrow="PRO" title="Rating" subtitle="Star-rating input. Hover-preview, keyboard navigation, click-same-to-clear, form-bound via CVA." />
    <h2>Import</h2>
    <app-code-block [code]="'import { KnRatingComponent } from \\'kiln-ui\\';'" />
    <h2>Examples</h2>
    <app-example title="Basic" [code]="'<kn-rating label=&quot;Quality&quot; />'"><kn-rating label="Quality" /></app-example>
    <app-example title="With value display" [code]="'<kn-rating label=&quot;Quality&quot; [showValue]=&quot;true&quot; />'"><kn-rating label="Quality" [showValue]="true" /></app-example>
    <app-example title="Read-only (display)" [code]="'<kn-rating [readonly]=&quot;true&quot; [showValue]=&quot;true&quot; />'"><kn-rating [readonly]="true" [showValue]="true" /></app-example>
    <app-example title="Custom max (out of 10)" [code]="'<kn-rating [max]=&quot;10&quot; />'"><kn-rating [max]="10" /></app-example>
    <h2>API</h2>
    <app-api-table heading="Inputs" [rows]="inputs" />
    <app-api-table heading="Outputs" [rows]="outputs" [showDefault]="false" />
  `,
  styles: [`:host { display: block; color: var(--kn-text); } h2 { font-family: var(--kn-font-display); font-size: var(--kn-fs-2xl); margin: var(--kn-sp-7) 0 var(--kn-sp-3); }`],
})
export class RatingPage {
  protected readonly inputs: ApiRow[] = [
    { name: 'max', type: 'number', default: '5', description: 'Maximum stars.' },
    { name: 'label', type: 'string', default: `''`, description: 'Field label.' },
    { name: 'showValue', type: 'boolean', default: 'false', description: 'Show "n / max" text next to stars.' },
    { name: 'readonly', type: 'boolean', default: 'false', description: 'Display only — disables interaction.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable interaction (keeps look).' },
  ];
  protected readonly outputs: ApiRow[] = [
    { name: 'valueChange', type: 'EventEmitter<number>', description: 'Fires on rating change. Emits 0 when user clears.' },
  ];
}
