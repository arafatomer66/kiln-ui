import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KnSliderComponent } from 'kiln-ui';
import { ApiTableComponent, ApiRow } from '../../shared/api-table.component';
import { ExampleComponent } from '../../shared/example.component';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { CodeBlockComponent } from '../../shared/code-block.component';

@Component({
  selector: 'app-slider-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, KnSliderComponent, PageHeaderComponent, ExampleComponent, ApiTableComponent, CodeBlockComponent],
  template: `
    <app-page-header eyebrow="EXTENDED" title="Slider" subtitle="Single-handle range slider with tick marks, suffix, and form integration via CVA." />

    <h2>Import</h2>
    <app-code-block [code]="'import { KnSliderComponent } from \\'@kiln/ui\\';'" />

    <h2>Examples</h2>

    <app-example title="Basic with suffix" [code]="basic">
      <div style="width: 360px;">
        <kn-slider label="Volume" suffix="%" [(ngModel)]="volume" />
      </div>
    </app-example>

    <app-example title="Custom range and step" [code]="range">
      <div style="width: 360px;">
        <kn-slider
          label="Cache size"
          [min]="0"
          [max]="2048"
          [step]="64"
          suffix=" MB"
          [marks]="[256, 512, 1024, 1536]"
          [(ngModel)]="cacheSize"
        />
      </div>
    </app-example>

    <app-example title="Disabled" [code]="disabled">
      <div style="width: 360px;">
        <kn-slider label="Locked setting" [disabled]="true" suffix="%" />
      </div>
    </app-example>

    <h2>API</h2>
    <app-api-table heading="Inputs" [rows]="inputs" />
    <app-api-table heading="Outputs" [rows]="outputs" [showDefault]="false" />
  `,
  styles: [`:host { display: block; color: var(--kn-text); } h2 { font-family: var(--kn-font-display); font-size: var(--kn-fs-2xl); margin: var(--kn-sp-7) 0 var(--kn-sp-3); }`],
})
export class SliderPage {
  protected readonly volume = signal(40);
  protected readonly cacheSize = signal(512);

  protected readonly basic = `<kn-slider label="Volume" suffix="%" [(ngModel)]="volume" />`;

  protected readonly range = `<kn-slider
  label="Cache size"
  [min]="0"
  [max]="2048"
  [step]="64"
  suffix=" MB"
  [marks]="[256, 512, 1024, 1536]"
  [(ngModel)]="cacheSize"
/>`;

  protected readonly disabled = `<kn-slider label="Locked setting" [disabled]="true" suffix="%" />`;

  protected readonly inputs: ApiRow[] = [
    { name: 'label', type: 'string', default: `''`, description: 'Field label.' },
    { name: 'min', type: 'number', default: '0', description: 'Lower bound.' },
    { name: 'max', type: 'number', default: '100', description: 'Upper bound.' },
    { name: 'step', type: 'number', default: '1', description: 'Step increment.' },
    { name: 'suffix', type: 'string', default: `''`, description: 'Appended to the displayed value (e.g. "%", " MB").' },
    { name: 'marks', type: 'number[]', default: '[]', description: 'Tick mark positions to render on the track.' },
    { name: 'showMarks', type: 'boolean', default: 'true', description: 'Whether tick marks are visible.' },
    { name: 'helperText', type: 'string', default: `''`, description: 'Helper line below the slider.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable interaction.' },
  ];

  protected readonly outputs: ApiRow[] = [
    { name: 'valueChange', type: 'EventEmitter<number>', description: 'Fires on every value change.' },
  ];
}
