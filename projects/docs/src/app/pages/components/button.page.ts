import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { KnButtonComponent } from 'kiln-ui';
import { ApiTableComponent, ApiRow } from '../../shared/api-table.component';
import { ExampleComponent } from '../../shared/example.component';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { CodeBlockComponent } from '../../shared/code-block.component';

@Component({
  selector: 'app-button-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    KnButtonComponent,
    PageHeaderComponent,
    ExampleComponent,
    ApiTableComponent,
    CodeBlockComponent,
  ],
  template: `
    <app-page-header
      eyebrow="FOUNDATION"
      title="Button"
      subtitle="A clickable control that triggers an action — your most common interaction."
    />

    <h2>Import</h2>
    <app-code-block [code]="importCode" />

    <h2>Examples</h2>

    <app-example
      title="Variants"
      description="Four visual variants: solid, outline, ghost, and link. Use solid for primary actions, outline for secondary, ghost for tertiary, and link for inline navigation."
      [code]="variantsCode"
    >
      <kn-button variant="solid">Solid</kn-button>
      <kn-button variant="outline">Outline</kn-button>
      <kn-button variant="ghost">Ghost</kn-button>
      <kn-button variant="link">Read more →</kn-button>
    </app-example>

    <app-example
      title="Tones"
      description="Layer a tone on top of any variant to communicate intent."
      [code]="tonesCode"
    >
      <kn-button variant="solid" tone="brand">Brand</kn-button>
      <kn-button variant="solid" tone="accent">Accent</kn-button>
      <kn-button variant="solid" tone="danger">Delete account</kn-button>
    </app-example>

    <app-example
      title="Sizes"
      description="Three sizes — small for dense UI, medium (default) for most cases, large for hero CTAs."
      [code]="sizesCode"
    >
      <kn-button size="sm">Small</kn-button>
      <kn-button size="md">Medium</kn-button>
      <kn-button size="lg">Large</kn-button>
    </app-example>

    <app-example
      title="States"
      description="Loading shows a spinner and disables interaction. Disabled grays the control out."
      [code]="statesCode"
    >
      <kn-button [loading]="true">Saving…</kn-button>
      <kn-button [disabled]="true">Disabled</kn-button>
    </app-example>

    <app-example
      title="Block"
      description="Block buttons stretch to fill their container."
      [code]="blockCode"
    >
      <div style="width: 320px;">
        <kn-button [block]="true" variant="solid">Continue</kn-button>
      </div>
    </app-example>

    <app-example
      title="Click handler"
      description="Listen to the (clicked) output. Disabled and loading buttons don't emit."
      [code]="clickedCode"
    >
      <kn-button (clicked)="bump()">Clicked: {{ count() }}</kn-button>
    </app-example>

    <h2>API</h2>
    <app-api-table heading="Inputs" [rows]="inputs" />
    <app-api-table heading="Outputs" [rows]="outputs" [showDefault]="false" />

    <h2>Accessibility</h2>
    <ul>
      <li>Renders as a native <code>&lt;button&gt;</code> with the appropriate <code>type</code> attribute.</li>
      <li><code>Space</code> and <code>Enter</code> trigger click; tab order follows DOM order.</li>
      <li>While loading, <code>aria-busy="true"</code> is applied and the click handler is suppressed.</li>
      <li>Focus rings are always visible — never disabled.</li>
      <li>If the button has no visible label (icon-only), pass <code>ariaLabel</code> for screen readers.</li>
    </ul>

    <h2>CSS variables</h2>
    <p>The button reads from these tokens — override them per-instance via <code>style</code> or in a scoped class.</p>
    <ul class="vars">
      <li><code>--kn-brand</code> · solid background and link text</li>
      <li><code>--kn-brand-strong</code> · stamp shadow color (solid)</li>
      <li><code>--kn-border-strong</code> · outline border</li>
      <li><code>--kn-shadow-stamp</code> · outline shadow</li>
      <li><code>--kn-text-inverse</code> · text on solid backgrounds</li>
    </ul>
  `,
  styles: [`
    :host { display: block; color: var(--kn-text); }
    h2 { font-family: var(--kn-font-display); font-size: var(--kn-fs-2xl); margin: var(--kn-sp-7) 0 var(--kn-sp-3); }
    p, li { line-height: var(--kn-lh-relaxed); color: var(--kn-text-muted); }
    code { background: var(--kn-surface); padding: 1px 6px; border-radius: var(--kn-r-xs); font-size: var(--kn-fs-sm); }
    ul { padding-left: var(--kn-sp-5); }
    .vars li { margin-bottom: var(--kn-sp-1); }
  `],
})
export class ButtonPage {
  protected readonly count = signal(0);
  protected bump(): void { this.count.update((n) => n + 1); }

  protected readonly importCode = `import { KnButtonComponent } from 'kiln-ui';`;

  protected readonly variantsCode = `<kn-button variant="solid">Solid</kn-button>
<kn-button variant="outline">Outline</kn-button>
<kn-button variant="ghost">Ghost</kn-button>
<kn-button variant="link">Read more →</kn-button>`;

  protected readonly tonesCode = `<kn-button variant="solid" tone="brand">Brand</kn-button>
<kn-button variant="solid" tone="accent">Accent</kn-button>
<kn-button variant="solid" tone="danger">Delete account</kn-button>`;

  protected readonly sizesCode = `<kn-button size="sm">Small</kn-button>
<kn-button size="md">Medium</kn-button>
<kn-button size="lg">Large</kn-button>`;

  protected readonly statesCode = `<kn-button [loading]="true">Saving…</kn-button>
<kn-button [disabled]="true">Disabled</kn-button>`;

  protected readonly blockCode = `<kn-button [block]="true" variant="solid">Continue</kn-button>`;

  protected readonly clickedCode = `<kn-button (clicked)="onSave($event)">Save</kn-button>`;

  protected readonly inputs: ApiRow[] = [
    { name: 'variant', type: `'solid' | 'outline' | 'ghost' | 'link'`, default: `'solid'`, description: 'Visual variant.' },
    { name: 'size', type: `'sm' | 'md' | 'lg'`, default: `'md'`, description: 'Button size.' },
    { name: 'tone', type: `'brand' | 'danger' | 'accent'`, default: `'brand'`, description: 'Color intent (combine with solid variant).' },
    { name: 'type', type: `'button' | 'submit' | 'reset'`, default: `'button'`, description: 'HTML button type.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable interaction.' },
    { name: 'loading', type: 'boolean', default: 'false', description: 'Show spinner and disable.' },
    { name: 'block', type: 'boolean', default: 'false', description: 'Stretch to container width.' },
    { name: 'ariaLabel', type: 'string', default: `''`, description: 'Override accessible label (use for icon-only buttons).' },
  ];

  protected readonly outputs: ApiRow[] = [
    { name: 'clicked', type: 'EventEmitter<MouseEvent>', description: 'Emitted on click. Suppressed while disabled or loading.' },
  ];
}
