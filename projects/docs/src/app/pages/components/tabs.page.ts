import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KnTabsComponent, KnTabComponent, KnTabContentDirective } from 'kiln-ui';
import { ApiTableComponent, ApiRow } from '../../shared/api-table.component';
import { ExampleComponent } from '../../shared/example.component';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { CodeBlockComponent } from '../../shared/code-block.component';

@Component({
  selector: 'app-tabs-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    KnTabsComponent, KnTabComponent, KnTabContentDirective,
    PageHeaderComponent, ExampleComponent, ApiTableComponent, CodeBlockComponent,
  ],
  template: `
    <app-page-header eyebrow="COMPOSITE" title="Tabs" subtitle="Switch between related views in the same place. Underlined active tab in mono caps — Kiln UI's signature." />

    <h2>Import</h2>
    <app-code-block [code]="importCode" />

    <h2>Examples</h2>

    <app-example title="Basic" [code]="basic">
      <div style="width: 100%;">
        <kn-tabs>
          <kn-tab label="Overview">
            <ng-template knTabContent><p>The overview tab content.</p></ng-template>
          </kn-tab>
          <kn-tab label="Members">
            <ng-template knTabContent><p>Members listed here.</p></ng-template>
          </kn-tab>
          <kn-tab label="Activity">
            <ng-template knTabContent><p>Recent activity log.</p></ng-template>
          </kn-tab>
          <kn-tab label="Settings">
            <ng-template knTabContent><p>Workspace settings.</p></ng-template>
          </kn-tab>
        </kn-tabs>
      </div>
    </app-example>

    <h2>API — kn-tabs</h2>
    <app-api-table heading="Inputs" [rows]="tabsInputs" />
    <app-api-table heading="Outputs" [rows]="tabsOutputs" [showDefault]="false" />

    <h2>API — kn-tab</h2>
    <app-api-table heading="Inputs" [rows]="tabInputs" />
  `,
  styles: [`:host { display: block; color: var(--kn-text); } h2 { font-family: var(--kn-font-display); font-size: var(--kn-fs-2xl); margin: var(--kn-sp-7) 0 var(--kn-sp-3); }`],
})
export class TabsPage {
  protected readonly importCode = `import { KnTabsComponent, KnTabComponent, KnTabContentDirective } from 'kiln-ui';`;

  protected readonly basic = `<kn-tabs (activeChange)="onTab($event)">
  <kn-tab label="Overview">
    <ng-template knTabContent>...content...</ng-template>
  </kn-tab>
  <kn-tab label="Members">
    <ng-template knTabContent>...content...</ng-template>
  </kn-tab>
</kn-tabs>`;

  protected readonly tabsInputs: ApiRow[] = [
    { name: 'activeIndex', type: 'number', default: '0', description: 'Initially active tab.' },
  ];

  protected readonly tabsOutputs: ApiRow[] = [
    { name: 'activeChange', type: 'EventEmitter<number>', description: 'Emitted when the active tab changes.' },
  ];

  protected readonly tabInputs: ApiRow[] = [
    { name: 'label', type: 'string', default: `''`, description: 'Tab label shown in the bar.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable selection of this tab.' },
  ];
}
