import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  KnAlertComponent,
  KnBadgeComponent,
  KnButtonComponent,
  KnCardComponent,
  KnDividerComponent,
} from 'kiln-ui';
import { CodeBlockComponent } from '../shared/code-block.component';

@Component({
  selector: 'app-home',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    KnButtonComponent,
    KnBadgeComponent,
    KnCardComponent,
    KnAlertComponent,
    KnDividerComponent,
    CodeBlockComponent,
  ],
  template: `
    <section class="hero">
      <span class="hero__motif" aria-hidden="true">❖</span>
      <div class="hero__eyebrow">DESIGN SYSTEM · ভাষা ও কারুকাজ</div>
      <h1 class="hero__title">Build with care.</h1>
      <h2 class="hero__title hero__title--bn">যত্নে গড়ো।</h2>
      <p class="hero__lede">
        Kiln UI is an Angular component library inspired by Bangladeshi visual heritage —
        the geometry of <em>nokshi kantha</em>, the warmth of jute, and the dual-script harmony of
        Bangla and Latin typography.
      </p>
      <div class="hero__cta">
        <kn-button variant="solid" size="lg" routerLink="/getting-started">Get started →</kn-button>
        <kn-button variant="outline" size="lg" routerLink="/components/button">Browse components</kn-button>
      </div>
      <div class="hero__meta">
        <kn-badge variant="solid" tone="brand">v0.1.0</kn-badge>
        <kn-badge variant="soft" tone="success">27 components</kn-badge>
        <kn-badge variant="soft" tone="info">Angular 20+</kn-badge>
        <kn-badge variant="outline" tone="neutral">MIT</kn-badge>
      </div>
    </section>

    <section class="quickstart">
      <div class="quickstart__heading">30-second quickstart</div>
      <app-code-block
        filename="install"
        [code]="installCode"
      />
      <app-code-block
        filename="app.config.ts"
        [code]="appConfigCode"
      />
      <app-code-block
        filename="my.component.ts"
        [code]="useCode"
      />
    </section>

    <kn-divider variant="alpana" />

    <section class="features">
      <div class="features__grid">
        <kn-card>
          <div class="feature__eyebrow">SIGNATURE</div>
          <h3 class="feature__title">Neo-Native</h3>
          <p class="feature__body">
            Jute neutrals, indigo brand, marigold accent. Sharp 4px corners. Stamp shadow with no blur.
            A design language that feels rooted, not generic.
          </p>
        </kn-card>

        <kn-card>
          <div class="feature__eyebrow">MODERN ANGULAR</div>
          <h3 class="feature__title">Signals + standalone</h3>
          <p class="feature__body">
            Built on Angular 20+ patterns: signal inputs, <code>inject()</code>, OnPush by default,
            CVA-backed form controls, and CDK-powered overlays.
          </p>
        </kn-card>

        <kn-card>
          <div class="feature__eyebrow">DUAL-SCRIPT</div>
          <h3 class="feature__title">Bangla &amp; Latin</h3>
          <p class="feature__body">
            Inter pairs with Hind Siliguri, Fraunces with Tiro Bangla. Components render Bangla strings
            beautifully, with matching x-heights and rhythm.
          </p>
        </kn-card>

        <kn-card>
          <div class="feature__eyebrow">THEMABLE</div>
          <h3 class="feature__title">CSS variables</h3>
          <p class="feature__body">
            Every token is a CSS custom property. Override per-instance, per-section, or per-app.
            Light and dark modes ship out of the box.
          </p>
        </kn-card>
      </div>
    </section>

    <section class="showcase-cta">
      <kn-card variant="stamp" padding="lg" [interactive]="true" routerLink="/showcase/admin">
        <div class="showcase-cta__inner">
          <div>
            <div class="showcase-cta__eyebrow">SHOWCASE · APPLIED EXAMPLE</div>
            <h2 class="showcase-cta__title">See it in action — admin demo</h2>
            <p class="showcase-cta__body">
              A realistic mini-CRM built entirely from Kiln UI primitives. Sidebar nav, dashboard with stats &amp; activity feed,
              orders with filters and pagination, customers with tabbed detail, products grid, multi-tab settings.
              22 of the 27 components on a single page.
            </p>
            <kn-button variant="solid" size="lg" routerLink="/showcase/admin">Open the demo →</kn-button>
          </div>
        </div>
      </kn-card>
    </section>

    <kn-alert tone="info" title="Heads up">
      This is v0.1 — feedback, issues, and contributions are warmly welcome on
      <a href="https://github.com/arafatomer66/kiln-ui" target="_blank" rel="noreferrer">GitHub</a>.
    </kn-alert>
  `,
  styles: [`
    :host { display: block; }

    .hero {
      position: relative;
      padding: var(--kn-sp-9) var(--kn-sp-7);
      background: var(--kn-surface);
      border: var(--kn-bw-2) solid var(--kn-border-strong);
      border-radius: var(--kn-r-sm);
      box-shadow: var(--kn-shadow-stamp-strong);
      margin-bottom: var(--kn-sp-9);
    }

    .hero__motif {
      position: absolute;
      top: -10px;
      left: -10px;
      color: var(--kn-brand);
      font-size: 22px;
    }

    .hero__eyebrow {
      font-family: var(--kn-font-mono);
      font-size: var(--kn-fs-xs);
      font-weight: var(--kn-fw-bold);
      letter-spacing: var(--kn-tracking-mono);
      color: var(--kn-text-muted);
      margin-bottom: var(--kn-sp-3);
    }

    .hero__title {
      font-family: var(--kn-font-display);
      font-size: var(--kn-fs-5xl);
      font-weight: var(--kn-fw-bold);
      letter-spacing: var(--kn-tracking-tight);
      line-height: var(--kn-lh-tight);
      margin: 0 0 var(--kn-sp-2);
      color: var(--kn-text);
    }

    .hero__title--bn {
      font-size: var(--kn-fs-3xl);
      color: var(--kn-text-muted);
      font-style: italic;
      margin-bottom: var(--kn-sp-5);
    }

    .hero__lede {
      max-width: 640px;
      font-size: var(--kn-fs-md);
      color: var(--kn-text-muted);
      line-height: var(--kn-lh-relaxed);
      margin: 0 0 var(--kn-sp-6);
    }

    .hero__cta {
      display: flex;
      gap: var(--kn-sp-3);
      flex-wrap: wrap;
      margin-bottom: var(--kn-sp-6);
    }

    .hero__meta {
      display: flex;
      gap: var(--kn-sp-2);
      flex-wrap: wrap;
    }

    .quickstart__heading {
      font-family: var(--kn-font-mono);
      font-size: var(--kn-fs-xs);
      font-weight: var(--kn-fw-bold);
      letter-spacing: var(--kn-tracking-mono);
      text-transform: uppercase;
      color: var(--kn-text-muted);
      margin-bottom: var(--kn-sp-3);
    }

    .features { margin: var(--kn-sp-9) 0; }

    .features__grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: var(--kn-sp-5);
    }

    .feature__eyebrow {
      font-family: var(--kn-font-mono);
      font-size: var(--kn-fs-xs);
      font-weight: var(--kn-fw-bold);
      letter-spacing: var(--kn-tracking-mono);
      color: var(--kn-brand);
      margin-bottom: var(--kn-sp-2);
    }

    .feature__title {
      font-family: var(--kn-font-display);
      font-size: var(--kn-fs-xl);
      font-weight: var(--kn-fw-bold);
      margin: 0 0 var(--kn-sp-2);
    }

    .feature__body {
      color: var(--kn-text-muted);
      font-size: var(--kn-fs-base);
      line-height: var(--kn-lh-normal);
      margin: 0;
    }

    code { background: var(--kn-surface-alt); padding: 1px 6px; border-radius: var(--kn-r-xs); }

    em { font-style: italic; color: var(--kn-text); }

    .showcase-cta { margin: var(--kn-sp-9) 0; }
    .showcase-cta__inner { display: block; }
    .showcase-cta__eyebrow {
      font-family: var(--kn-font-mono);
      font-size: var(--kn-fs-xs);
      font-weight: var(--kn-fw-bold);
      letter-spacing: var(--kn-tracking-mono);
      text-transform: uppercase;
      color: var(--kn-accent-strong);
      margin-bottom: var(--kn-sp-2);
    }
    .showcase-cta__title {
      font-family: var(--kn-font-display);
      font-size: var(--kn-fs-2xl);
      font-weight: var(--kn-fw-bold);
      margin: 0 0 var(--kn-sp-3);
    }
    .showcase-cta__body {
      color: var(--kn-text-muted);
      line-height: var(--kn-lh-relaxed);
      max-width: 640px;
      margin-bottom: var(--kn-sp-4);
    }
  `],
})
export class HomeComponent {
  protected readonly installCode = `npm install kiln-ui @angular/cdk`;

  protected readonly appConfigCode = `import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideKilnUI } from 'kiln-ui';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideKilnUI({ theme: 'light' }),
  ],
};`;

  protected readonly useCode = `import { Component } from '@angular/core';
import { KnButtonComponent, KnCardComponent } from 'kiln-ui';

@Component({
  selector: 'app-hello',
  standalone: true,
  imports: [KnButtonComponent, KnCardComponent],
  template: \`
    <kn-card>
      <h2>Hello, Kiln UI</h2>
      <kn-button variant="solid">Get started</kn-button>
    </kn-card>
  \`,
})
export class HelloComponent {}`;
}
