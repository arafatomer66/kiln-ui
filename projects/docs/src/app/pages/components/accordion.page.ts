import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KnAccordionComponent, KnAccordionItemComponent } from 'kiln-ui';
import { ApiTableComponent, ApiRow } from '../../shared/api-table.component';
import { ExampleComponent } from '../../shared/example.component';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { CodeBlockComponent } from '../../shared/code-block.component';

@Component({
  selector: 'app-accordion-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    KnAccordionComponent, KnAccordionItemComponent,
    PageHeaderComponent, ExampleComponent, ApiTableComponent, CodeBlockComponent,
  ],
  template: `
    <app-page-header eyebrow="COMPOSITE" title="Accordion" subtitle="Stacked, collapsible sections. Single-open by default; pass [multiple]='true' to allow multiple panels open." />

    <h2>Import</h2>
    <app-code-block [code]="importCode" />

    <h2>Examples</h2>

    <app-example title="Single open (default)" [code]="single">
      <div style="width: 100%;">
        <kn-accordion>
          <kn-accordion-item heading="What is Kiln UI?">
            An Angular component library inspired by Bangladeshi visual heritage.
          </kn-accordion-item>
          <kn-accordion-item heading="What's the design language?">
            Jute neutrals, indigo brand, marigold accent. Sharp 4px corners with stamp shadows.
          </kn-accordion-item>
          <kn-accordion-item heading="How is it themed?">
            Every visual decision is a CSS variable. Override per-instance, per-section, or app-wide.
          </kn-accordion-item>
        </kn-accordion>
      </div>
    </app-example>

    <app-example title="Multiple open" [code]="multiple">
      <div style="width: 100%;">
        <kn-accordion [multiple]="true">
          <kn-accordion-item heading="First">First panel content.</kn-accordion-item>
          <kn-accordion-item heading="Second">Second panel content.</kn-accordion-item>
          <kn-accordion-item heading="Third">Third panel content.</kn-accordion-item>
        </kn-accordion>
      </div>
    </app-example>

    <h2>API — kn-accordion</h2>
    <app-api-table heading="Inputs" [rows]="accordionInputs" />

    <h2>API — kn-accordion-item</h2>
    <app-api-table heading="Inputs" [rows]="itemInputs" />
  `,
  styles: [`:host { display: block; color: var(--kn-text); } h2 { font-family: var(--kn-font-display); font-size: var(--kn-fs-2xl); margin: var(--kn-sp-7) 0 var(--kn-sp-3); }`],
})
export class AccordionPage {
  protected readonly importCode = `import { KnAccordionComponent, KnAccordionItemComponent } from 'kiln-ui';`;

  protected readonly single = `<kn-accordion>
  <kn-accordion-item heading="What is Kiln UI?">…</kn-accordion-item>
  <kn-accordion-item heading="Design language">…</kn-accordion-item>
</kn-accordion>`;

  protected readonly multiple = `<kn-accordion [multiple]="true">
  <kn-accordion-item heading="First">…</kn-accordion-item>
  <kn-accordion-item heading="Second">…</kn-accordion-item>
</kn-accordion>`;

  protected readonly accordionInputs: ApiRow[] = [
    { name: 'multiple', type: 'boolean', default: 'false', description: 'Allow multiple panels open at once.' },
  ];

  protected readonly itemInputs: ApiRow[] = [
    { name: 'heading', type: 'string', default: `''`, description: 'Trigger label.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable expansion.' },
  ];
}
