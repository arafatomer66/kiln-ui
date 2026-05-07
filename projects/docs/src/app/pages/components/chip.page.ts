import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KnChipComponent } from 'kiln-ui';
import { ApiTableComponent, ApiRow } from '../../shared/api-table.component';
import { ExampleComponent } from '../../shared/example.component';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { CodeBlockComponent } from '../../shared/code-block.component';

@Component({
  selector: 'app-chip-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [KnChipComponent, PageHeaderComponent, ExampleComponent, ApiTableComponent, CodeBlockComponent],
  template: `
    <app-page-header eyebrow="FOUNDATION" title="Chip" subtitle="Inline tag for filters, multi-select selections, or active criteria." />

    <h2>Import</h2>
    <app-code-block [code]="'import { KnChipComponent } from \\'kiln-ui\\';'" />

    <h2>Examples</h2>

    <app-example title="Basic chips" [code]="basic">
      <kn-chip>Dhaka</kn-chip>
      <kn-chip>Remote</kn-chip>
      <kn-chip>2026</kn-chip>
    </app-example>

    <app-example title="Removable" [code]="removable">
      <kn-chip [removable]="true">Filter: Active</kn-chip>
      <kn-chip [removable]="true">Filter: Recent</kn-chip>
    </app-example>

    <app-example title="Soft variant" [code]="soft">
      <kn-chip variant="soft">Soft chip</kn-chip>
      <kn-chip variant="soft" [removable]="true">Removable</kn-chip>
    </app-example>

    <h2>API</h2>
    <app-api-table heading="Inputs" [rows]="inputs" />
    <app-api-table heading="Outputs" [rows]="outputs" [showDefault]="false" />
  `,
  styles: [`:host { display: block; color: var(--kn-text); } h2 { font-family: var(--kn-font-display); font-size: var(--kn-fs-2xl); margin: var(--kn-sp-7) 0 var(--kn-sp-3); }`],
})
export class ChipPage {
  protected readonly basic = `<kn-chip>Dhaka</kn-chip>`;
  protected readonly removable = `<kn-chip [removable]="true" (removed)="onRemove()">Filter: Active</kn-chip>`;
  protected readonly soft = `<kn-chip variant="soft">Soft chip</kn-chip>`;

  protected readonly inputs: ApiRow[] = [
    { name: 'variant', type: `'solid' | 'soft'`, default: `'solid'`, description: 'Visual variant.' },
    { name: 'removable', type: 'boolean', default: 'false', description: 'Show a remove (×) button.' },
    { name: 'removeLabel', type: 'string', default: `'Remove'`, description: 'Accessible label for the remove button.' },
  ];

  protected readonly outputs: ApiRow[] = [
    { name: 'removed', type: 'EventEmitter<void>', description: 'Emitted when the remove button is clicked.' },
  ];
}
