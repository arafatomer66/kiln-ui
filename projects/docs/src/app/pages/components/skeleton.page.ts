import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KnSkeletonComponent } from 'kiln-ui';
import { ApiTableComponent, ApiRow } from '../../shared/api-table.component';
import { ExampleComponent } from '../../shared/example.component';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { CodeBlockComponent } from '../../shared/code-block.component';

@Component({
  selector: 'app-skeleton-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [KnSkeletonComponent, PageHeaderComponent, ExampleComponent, ApiTableComponent, CodeBlockComponent],
  template: `
    <app-page-header eyebrow="ADVANCED" title="Skeleton" subtitle="Animated placeholder for loading states. Pair with real layout to preserve dimensions while data loads." />

    <h2>Import</h2>
    <app-code-block [code]="'import { KnSkeletonComponent } from \\'kiln-ui\\';'" />

    <h2>Examples</h2>

    <app-example title="Variants" [code]="variants">
      <div style="width: 320px; display: flex; flex-direction: column; gap: 12px;">
        <kn-skeleton variant="heading" />
        <kn-skeleton variant="text" />
        <kn-skeleton variant="text" />
        <kn-skeleton variant="text" width="60%" />
      </div>
    </app-example>

    <app-example title="Avatar + lines (card placeholder)" [code]="card">
      <div style="display: flex; gap: 16px; width: 320px;">
        <kn-skeleton variant="avatar" />
        <div style="flex: 1; display: flex; flex-direction: column; gap: 8px;">
          <kn-skeleton variant="text" width="70%" />
          <kn-skeleton variant="text" />
          <kn-skeleton variant="text" width="40%" />
        </div>
      </div>
    </app-example>

    <app-example title="Block placeholder" [code]="block">
      <kn-skeleton variant="block" width="320px" height="120px" />
    </app-example>

    <h2>API</h2>
    <app-api-table heading="Inputs" [rows]="inputs" />
  `,
  styles: [`:host { display: block; color: var(--kn-text); } h2 { font-family: var(--kn-font-display); font-size: var(--kn-fs-2xl); margin: var(--kn-sp-7) 0 var(--kn-sp-3); }`],
})
export class SkeletonPage {
  protected readonly variants = `<kn-skeleton variant="heading" />
<kn-skeleton variant="text" />
<kn-skeleton variant="text" width="60%" />`;

  protected readonly card = `<kn-skeleton variant="avatar" />
<kn-skeleton variant="text" width="70%" />`;

  protected readonly block = `<kn-skeleton variant="block" width="320px" height="120px" />`;

  protected readonly inputs: ApiRow[] = [
    { name: 'variant', type: `'text' | 'heading' | 'block' | 'avatar' | 'custom'`, default: `'text'`, description: 'Predefined size and shape.' },
    { name: 'shape', type: `'rect' | 'circle'`, default: `'rect'`, description: 'Border-radius treatment.' },
    { name: 'width', type: 'string', default: `''`, description: 'Override width (CSS value, e.g. "60%" or "120px").' },
    { name: 'height', type: 'string', default: `''`, description: 'Override height (CSS value).' },
  ];
}
