import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { KnThemeService } from 'kiln-ui';
import { COMPONENT_GROUPS } from './components-nav';

@Component({
  selector: 'app-shell',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <header class="shell__topnav">
      <a class="shell__brand" routerLink="/">
        <span class="shell__brand-bn">কিলন</span>
        <span class="shell__brand-en">Kiln UI</span>
      </a>

      <nav class="shell__topnav-links">
        <a routerLink="/getting-started" routerLinkActive="is-active">Get started</a>
        <a routerLink="/components/button" routerLinkActive="is-active">Components</a>
        <a routerLink="/theming" routerLinkActive="is-active">Theming</a>
        <a routerLink="/showcase/admin" routerLinkActive="is-active">Showcase</a>
        <a routerLink="/about" routerLinkActive="is-active">About</a>
      </nav>

      <div class="shell__topnav-actions">
        <a class="shell__icon-btn" href="https://github.com/arafatomer66/kiln-ui" target="_blank" rel="noreferrer" aria-label="GitHub">
          <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="currentColor" d="M12 .5C5.7.5.5 5.7.5 12c0 5 3.3 9.3 7.8 10.8.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.4-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 1.7 2.7 1.2 3.4.9.1-.7.4-1.2.7-1.5-2.6-.3-5.2-1.3-5.2-5.7 0-1.3.4-2.3 1.1-3.1-.1-.3-.5-1.5.1-3.1 0 0 .9-.3 3 1.2.9-.2 1.8-.4 2.8-.4s1.9.1 2.8.4c2.1-1.4 3-1.2 3-1.2.6 1.6.2 2.8.1 3.1.7.8 1.1 1.8 1.1 3.1 0 4.4-2.6 5.4-5.2 5.7.4.3.8 1 .8 2.1v3.1c0 .3.2.7.8.6 4.5-1.5 7.8-5.8 7.8-10.8 0-6.3-5.2-11.5-11.5-11.5z"/>
          </svg>
        </a>
        <button type="button" class="shell__icon-btn" (click)="toggleTheme()" [attr.aria-label]="theme() === 'light' ? 'Switch to dark theme' : 'Switch to light theme'">
          {{ theme() === 'light' ? '☾' : '☀' }}
        </button>
      </div>
    </header>

    <div class="shell__main">
      <aside class="shell__sidebar" aria-label="Component navigation">
        @for (group of groups; track group.heading) {
          <div class="shell__sidebar-group">
            <div class="shell__sidebar-heading">{{ group.heading }}</div>
            @for (item of group.items; track item.slug) {
              <a
                class="shell__sidebar-link"
                [routerLink]="['/components', item.slug]"
                routerLinkActive="is-active"
              >{{ item.label }}</a>
            }
          </div>
        }
      </aside>

      <main class="shell__content">
        <router-outlet />
      </main>
    </div>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    .shell__topnav {
      position: sticky;
      top: 0;
      z-index: var(--kn-z-sticky);
      display: flex;
      align-items: center;
      gap: var(--kn-sp-6);
      padding: 0 var(--kn-sp-6);
      height: 64px;
      background: var(--kn-surface);
      border-bottom: var(--kn-bw-1) solid var(--kn-border);
      backdrop-filter: blur(8px);
    }

    .shell__brand {
      display: inline-flex;
      align-items: baseline;
      gap: var(--kn-sp-2);
      color: var(--kn-text);
      text-decoration: none;
      font-weight: var(--kn-fw-bold);
    }
    .shell__brand:hover { text-decoration: none; }

    .shell__brand-bn {
      font-family: var(--kn-font-display);
      font-size: var(--kn-fs-xl);
    }

    .shell__brand-en {
      font-size: var(--kn-fs-lg);
    }

    .shell__topnav-links {
      flex: 1;
      display: flex;
      gap: var(--kn-sp-5);
    }

    .shell__topnav-links a {
      font-family: var(--kn-font-mono);
      font-size: var(--kn-fs-xs);
      font-weight: var(--kn-fw-semibold);
      letter-spacing: var(--kn-tracking-mono);
      text-transform: uppercase;
      color: var(--kn-text-muted);
      text-decoration: none;
      padding: var(--kn-sp-2) 0;
      border-bottom: 2px solid transparent;
      transition: color var(--kn-dur-fast) var(--kn-ease);
    }
    .shell__topnav-links a:hover { color: var(--kn-text); }
    .shell__topnav-links a.is-active {
      color: var(--kn-text);
      border-bottom-color: var(--kn-brand);
    }

    .shell__topnav-actions { display: flex; gap: var(--kn-sp-2); align-items: center; }

    .shell__icon-btn {
      all: unset;
      cursor: pointer;
      width: 36px;
      height: 36px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: var(--kn-text);
      border: var(--kn-bw-1) solid var(--kn-border);
      border-radius: var(--kn-r-xs);
      background: var(--kn-bg);
      font-size: 14px;
      transition: background var(--kn-dur-fast) var(--kn-ease);
    }
    .shell__icon-btn:hover { background: var(--kn-surface); }
    .shell__icon-btn:focus-visible { box-shadow: var(--kn-ring); }

    .shell__main {
      display: grid;
      grid-template-columns: 240px 1fr;
      flex: 1;
    }

    .shell__sidebar {
      padding: var(--kn-sp-6) var(--kn-sp-4);
      border-right: var(--kn-bw-1) solid var(--kn-border);
      background: var(--kn-bg);
      overflow-y: auto;
      position: sticky;
      top: 64px;
      align-self: start;
      max-height: calc(100vh - 64px);
    }

    .shell__sidebar-group { margin-bottom: var(--kn-sp-5); }

    .shell__sidebar-heading {
      font-family: var(--kn-font-mono);
      font-size: var(--kn-fs-xs);
      font-weight: var(--kn-fw-bold);
      letter-spacing: var(--kn-tracking-mono);
      text-transform: uppercase;
      color: var(--kn-text-muted);
      margin-bottom: var(--kn-sp-2);
      padding: 0 var(--kn-sp-3);
    }

    .shell__sidebar-link {
      display: block;
      padding: 6px var(--kn-sp-3);
      font-size: var(--kn-fs-base);
      color: var(--kn-text-muted);
      text-decoration: none;
      border-radius: var(--kn-r-xs);
      transition: all var(--kn-dur-fast) var(--kn-ease);
    }
    .shell__sidebar-link:hover { color: var(--kn-text); background: var(--kn-surface); }
    .shell__sidebar-link.is-active {
      color: var(--kn-brand);
      background: var(--kn-info-bg);
      font-weight: var(--kn-fw-semibold);
    }

    .shell__content {
      padding: var(--kn-sp-9) var(--kn-sp-9);
      max-width: 980px;
      width: 100%;
      box-sizing: border-box;
    }

    @media (max-width: 900px) {
      .shell__main { grid-template-columns: 1fr; }
      .shell__sidebar { display: none; }
      .shell__content { padding: var(--kn-sp-6); }
      .shell__topnav { padding: 0 var(--kn-sp-4); gap: var(--kn-sp-3); }
      .shell__topnav-links { display: none; }
    }
  `],
})
export class ShellComponent {
  protected readonly themeService = inject(KnThemeService);
  protected readonly groups = COMPONENT_GROUPS;

  protected readonly theme = computed(() => this.themeService.theme());

  protected toggleTheme(): void {
    this.themeService.toggle();
  }
}
