import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlockComponent } from '../shared/code-block.component';
import { PageHeaderComponent } from '../shared/page-header.component';

@Component({
  selector: 'app-getting-started',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageHeaderComponent, CodeBlockComponent, RouterLink],
  template: `
    <app-page-header
      eyebrow="GUIDE"
      title="Getting started"
      subtitle="Install the package, register the provider, and import your first component."
    />

    <h2>1. Install</h2>
    <p>Kiln UI requires Angular 20 or newer and the Angular CDK as a peer dependency.</p>
    <app-code-block filename="terminal" [code]="install" />

    <h2>2. Register the provider</h2>
    <p>Add <code>provideKilnUI()</code> to your application config. This sets up theme handling and registers global services like toasts and modals.</p>
    <app-code-block filename="src/app/app.config.ts" [code]="config" />

    <h2>3. Load fonts (optional)</h2>
    <p>Kiln UI's typography pairs Latin and Bangla scripts. Import the bundled font CSS to opt in to Google Fonts CDN delivery — or self-host and skip this import.</p>
    <app-code-block filename="src/styles.scss" [code]="styles" />

    <h2>4. Use a component</h2>
    <p>All components are standalone — import only what you use.</p>
    <app-code-block filename="src/app/hello.component.ts" [code]="usage" />

    <h2>What's next?</h2>
    <ul>
      <li><a routerLink="/theming">Theming</a> — customize tokens, light/dark mode, and brand colors.</li>
      <li><a routerLink="/components/button">Components</a> — browse all 27 components.</li>
    </ul>
  `,
  styles: [`
    :host { display: block; font-family: var(--kn-font-sans); color: var(--kn-text); }
    h2 { font-family: var(--kn-font-display); font-size: var(--kn-fs-2xl); margin: var(--kn-sp-7) 0 var(--kn-sp-3); }
    p, li { line-height: var(--kn-lh-relaxed); color: var(--kn-text-muted); }
    code { background: var(--kn-surface); padding: 1px 6px; border-radius: var(--kn-r-xs); font-size: var(--kn-fs-sm); }
    ul { padding-left: var(--kn-sp-5); }
  `],
})
export class GettingStartedComponent {
  protected readonly install = `npm install @kiln/ui @angular/cdk`;

  protected readonly config = `import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideKilnUI } from '@kiln/ui';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideKilnUI({ theme: 'light' }),
  ],
};`;

  protected readonly styles = `@use '@kiln/ui/styles/all' as *;
@use '@kiln/ui/styles/fonts.css';

body {
  font-family: var(--kn-font-sans);
  background: var(--kn-bg);
  color: var(--kn-text);
}`;

  protected readonly usage = `import { Component } from '@angular/core';
import { KnButtonComponent, KnCardComponent } from '@kiln/ui';

@Component({
  selector: 'app-hello',
  standalone: true,
  imports: [KnButtonComponent, KnCardComponent],
  template: \`
    <kn-card>
      <h2>Welcome</h2>
      <kn-button variant="solid">Click me</kn-button>
    </kn-card>
  \`,
})
export class HelloComponent {}`;
}
