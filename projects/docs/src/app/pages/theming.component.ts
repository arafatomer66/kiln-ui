import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CodeBlockComponent } from '../shared/code-block.component';
import { PageHeaderComponent } from '../shared/page-header.component';

@Component({
  selector: 'app-theming',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageHeaderComponent, CodeBlockComponent],
  template: `
    <app-page-header
      eyebrow="GUIDE"
      title="Theming"
      subtitle="Every visual decision is a CSS variable — override per-instance, per-section, or per-app."
    />

    <h2>Tokens</h2>
    <p>Kiln UI exposes its full design system as CSS custom properties prefixed with <code>--kn-</code>. The light theme is set on <code>:root</code>; dark mode swaps roles via the <code>[data-kn-theme="dark"]</code> attribute.</p>

    <div class="palette">
      <div class="palette__row">
        <span class="swatch" style="background: var(--kn-jute-50)"></span>
        <span class="swatch" style="background: var(--kn-jute-100)"></span>
        <span class="swatch" style="background: var(--kn-jute-300)"></span>
        <span class="swatch" style="background: var(--kn-jute-700)"></span>
        <span class="swatch" style="background: var(--kn-jute-900)"></span>
        <span class="palette__label">Jute neutrals</span>
      </div>
      <div class="palette__row">
        <span class="swatch" style="background: var(--kn-indigo-300)"></span>
        <span class="swatch" style="background: var(--kn-indigo-500)"></span>
        <span class="swatch" style="background: var(--kn-indigo-600)"></span>
        <span class="palette__label">Indigo brand</span>
      </div>
      <div class="palette__row">
        <span class="swatch" style="background: var(--kn-marigold-300)"></span>
        <span class="swatch" style="background: var(--kn-marigold-500)"></span>
        <span class="swatch" style="background: var(--kn-marigold-600)"></span>
        <span class="palette__label">Marigold accent</span>
      </div>
      <div class="palette__row">
        <span class="swatch" style="background: var(--kn-success)"></span>
        <span class="swatch" style="background: var(--kn-warn)"></span>
        <span class="swatch" style="background: var(--kn-danger)"></span>
        <span class="swatch" style="background: var(--kn-info)"></span>
        <span class="palette__label">Semantic</span>
      </div>
    </div>

    <h2>Custom theme</h2>
    <p>Override role tokens in your global stylesheet to retune brand colors without forking the library.</p>
    <app-code-block filename="src/styles.scss" [code]="customTheme" />

    <h2>Dark mode</h2>
    <p>Toggle dark mode by setting the <code>data-kn-theme</code> attribute, or use the <code>KnThemeService</code> for programmatic control.</p>
    <app-code-block filename="my.component.ts" [code]="darkMode" />

    <h2>Per-instance override</h2>
    <p>Any component honors local CSS variable overrides. This card uses a custom brand color without touching global state.</p>
    <app-code-block [code]="perInstance" />
  `,
  styles: [`
    :host { display: block; color: var(--kn-text); }
    h2 { font-family: var(--kn-font-display); font-size: var(--kn-fs-2xl); margin: var(--kn-sp-7) 0 var(--kn-sp-3); }
    p { line-height: var(--kn-lh-relaxed); color: var(--kn-text-muted); }
    code { background: var(--kn-surface); padding: 1px 6px; border-radius: var(--kn-r-xs); font-size: var(--kn-fs-sm); }

    .palette { display: flex; flex-direction: column; gap: var(--kn-sp-3); margin: var(--kn-sp-4) 0; }
    .palette__row {
      display: flex; align-items: center; gap: var(--kn-sp-2);
      padding: var(--kn-sp-3);
      border: var(--kn-bw-1) solid var(--kn-border);
      border-radius: var(--kn-r-sm);
      background: var(--kn-bg);
    }
    .swatch {
      width: 32px; height: 32px;
      border: var(--kn-bw-1) solid var(--kn-border);
      border-radius: var(--kn-r-xs);
    }
    .palette__label {
      margin-left: auto;
      font-family: var(--kn-font-mono);
      font-size: var(--kn-fs-xs);
      letter-spacing: var(--kn-tracking-mono);
      color: var(--kn-text-muted);
      text-transform: uppercase;
    }
  `],
})
export class ThemingComponent {
  protected readonly customTheme = `:root {
  --kn-brand: #0f5132;
  --kn-brand-strong: #093d22;
  --kn-accent: #ffd166;
}`;

  protected readonly darkMode = `import { inject } from '@angular/core';
import { KnThemeService } from '@kiln/ui';

const theme = inject(KnThemeService);
theme.setTheme('dark');
// or
theme.toggle();`;

  protected readonly perInstance = `<kn-card style="--kn-brand: #6f42c1; --kn-shadow-stamp: 3px 3px 0 #d4c5f5;">
  <h3>Custom brand</h3>
  <kn-button variant="solid">Action</kn-button>
</kn-card>`;
}
