import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { KnStepperComponent, KnStep, KnButtonComponent } from 'kiln-ui';
import { ApiTableComponent, ApiRow } from '../../shared/api-table.component';
import { ExampleComponent } from '../../shared/example.component';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { CodeBlockComponent } from '../../shared/code-block.component';

@Component({
  selector: 'app-stepper-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    KnStepperComponent, KnButtonComponent,
    PageHeaderComponent, ExampleComponent, ApiTableComponent, CodeBlockComponent,
  ],
  template: `
    <app-page-header eyebrow="COMPOSITE" title="Stepper" subtitle="Linear progress through a multi-step flow. Horizontal or vertical." />

    <h2>Import</h2>
    <app-code-block [code]="'import { KnStepperComponent, KnStep } from \\'@kiln/ui\\';'" />

    <h2>Examples</h2>

    <app-example title="Horizontal" [code]="horizontal">
      <div style="width: 100%; display: flex; flex-direction: column; gap: 16px;">
        <kn-stepper [steps]="steps" [activeIndex]="active()" (activeChange)="active.set($event)" />
        <div style="display: flex; gap: 8px;">
          <kn-button variant="outline" size="sm" [disabled]="active() === 0" (clicked)="prev()">Back</kn-button>
          <kn-button variant="solid" size="sm" [disabled]="active() === steps.length - 1" (clicked)="next()">Next</kn-button>
        </div>
      </div>
    </app-example>

    <app-example title="Vertical" [code]="vertical">
      <kn-stepper orientation="vertical" [steps]="steps" [activeIndex]="2" />
    </app-example>

    <h2>API</h2>
    <app-api-table heading="Inputs" [rows]="inputs" />
    <app-api-table heading="Outputs" [rows]="outputs" [showDefault]="false" />
  `,
  styles: [`:host { display: block; color: var(--kn-text); } h2 { font-family: var(--kn-font-display); font-size: var(--kn-fs-2xl); margin: var(--kn-sp-7) 0 var(--kn-sp-3); }`],
})
export class StepperPage {
  protected readonly active = signal(1);
  protected readonly steps: KnStep[] = [
    { title: 'Account', description: 'Create your account' },
    { title: 'Workspace', description: 'Set up workspace' },
    { title: 'Invite team', description: 'Optional' },
    { title: 'Done', description: 'You\'re ready' },
  ];

  protected next(): void { this.active.update((v) => Math.min(v + 1, this.steps.length - 1)); }
  protected prev(): void { this.active.update((v) => Math.max(v - 1, 0)); }

  protected readonly horizontal = `steps: KnStep[] = [
  { title: 'Account', description: 'Create your account' },
  { title: 'Workspace', description: 'Set up workspace' },
  { title: 'Invite team' },
  { title: 'Done' },
];

<kn-stepper [steps]="steps" [activeIndex]="active" (activeChange)="active = $event" />`;

  protected readonly vertical = `<kn-stepper orientation="vertical" [steps]="steps" [activeIndex]="2" />`;

  protected readonly inputs: ApiRow[] = [
    { name: 'steps', type: 'KnStep[]', default: '[]', description: 'Step definitions.' },
    { name: 'activeIndex', type: 'number', default: '0', description: 'Active step index.' },
    { name: 'orientation', type: `'horizontal' | 'vertical'`, default: `'horizontal'`, description: 'Layout direction.' },
    { name: 'clickable', type: 'boolean', default: 'true', description: 'Allow clicking on step indices to navigate.' },
  ];

  protected readonly outputs: ApiRow[] = [
    { name: 'activeChange', type: 'EventEmitter<number>', description: 'Emitted when a step is selected.' },
  ];
}
