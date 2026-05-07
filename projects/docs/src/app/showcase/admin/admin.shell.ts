import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {
  KnAvatarComponent,
  KnBadgeComponent,
  KnDropdownComponent,
  KnMenuItemComponent,
  KnMenuDividerComponent,
  KnMenuLabelComponent,
  KnThemeService,
  KnToastService,
} from 'kiln-ui';

interface NavItem { slug: string; label: string; icon: string; }
interface NavSection { heading: string; items: NavItem[]; }

@Component({
  selector: 'app-admin-shell',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterOutlet, RouterLink, RouterLinkActive,
    KnAvatarComponent, KnBadgeComponent,
    KnDropdownComponent, KnMenuItemComponent, KnMenuDividerComponent, KnMenuLabelComponent,
  ],
  template: `
    <div class="admin" [class.is-collapsed]="collapsed()">
      <aside class="admin__sidebar">
        <div class="admin__brand">
          <span class="admin__brand-glyph">❖</span>
          @if (!collapsed()) {
            <span class="admin__brand-text">
              <span class="admin__brand-en">ShareDeal</span>
              <span class="admin__brand-bn">শেয়ারডিল</span>
            </span>
          }
        </div>

        <nav class="admin__nav">
          @for (section of sections; track section.heading) {
            @if (!collapsed()) {
              <div class="admin__nav-heading">{{ section.heading }}</div>
            }
            @for (item of section.items; track item.slug) {
              <a
                class="admin__nav-link"
                [routerLink]="item.slug"
                routerLinkActive="is-active"
                [routerLinkActiveOptions]="{ exact: item.slug === 'dashboard' }"
                [attr.title]="collapsed() ? item.label : null"
              >
                <span class="admin__nav-icon">{{ item.icon }}</span>
                @if (!collapsed()) {
                  <span class="admin__nav-label">{{ item.label }}</span>
                }
              </a>
            }
          }
        </nav>

        <button type="button" class="admin__collapse" (click)="toggleCollapse()" [attr.aria-label]="collapsed() ? 'Expand sidebar' : 'Collapse sidebar'">
          {{ collapsed() ? '›' : '‹' }}
        </button>
      </aside>

      <div class="admin__main">
        <header class="admin__topbar">
          <a class="admin__back" routerLink="/" title="Back to docs">
            <span aria-hidden="true">‹</span>
            <span class="admin__back-text">Back to Kiln UI</span>
          </a>

          <div class="admin__search">
            <span class="admin__search-icon" aria-hidden="true">⌕</span>
            <input
              class="admin__search-input"
              type="search"
              placeholder="Search orders, customers, products…"
              aria-label="Search"
            />
            <span class="admin__search-shortcut">⌘K</span>
          </div>

          <div class="admin__actions">
            <button type="button" class="admin__icon-btn" aria-label="Notifications" (click)="ringBell()">
              <span aria-hidden="true">🔔</span>
              <kn-badge variant="solid" tone="danger" class="admin__bell-badge">3</kn-badge>
            </button>

            <button
              type="button"
              class="admin__icon-btn"
              [attr.aria-label]="theme() === 'light' ? 'Switch to dark' : 'Switch to light'"
              (click)="toggleTheme()"
            >
              {{ theme() === 'light' ? '☾' : '☀' }}
            </button>

            <kn-dropdown>
              <button kn-dropdown-trigger type="button" class="admin__user">
                <kn-avatar size="sm" name="Omer Arafat" />
                <span class="admin__user-name">Omer A.</span>
                <span aria-hidden="true">▾</span>
              </button>
              <kn-menu-label>Signed in as</kn-menu-label>
              <kn-menu-item icon="◐">Profile</kn-menu-item>
              <kn-menu-item icon="⚙" shortcut="⌘,">Settings</kn-menu-item>
              <kn-menu-divider />
              <kn-menu-item icon="⌘">Command palette</kn-menu-item>
              <kn-menu-item icon="?">Help &amp; docs</kn-menu-item>
              <kn-menu-divider />
              <kn-menu-item icon="⏻" tone="danger" (action)="signOut()">Sign out</kn-menu-item>
            </kn-dropdown>
          </div>
        </header>

        <main class="admin__content">
          <router-outlet />
        </main>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; height: 100vh; overflow: hidden; }

    .admin {
      display: grid;
      grid-template-columns: 240px 1fr;
      height: 100vh;
      background: var(--kn-bg);
      color: var(--kn-text);
      transition: grid-template-columns 200ms cubic-bezier(0.2, 0.7, 0.2, 1);
    }
    .admin.is-collapsed { grid-template-columns: 64px 1fr; }

    .admin__sidebar {
      position: relative;
      background: var(--kn-surface);
      border-right: var(--kn-bw-1) solid var(--kn-border);
      display: flex;
      flex-direction: column;
      overflow-y: auto;
    }

    .admin__brand {
      display: flex;
      align-items: center;
      gap: var(--kn-sp-2);
      padding: var(--kn-sp-5) var(--kn-sp-4) var(--kn-sp-4);
      border-bottom: var(--kn-bw-1) solid var(--kn-border);
    }

    .admin__brand-glyph {
      flex-shrink: 0;
      width: 32px;
      height: 32px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: var(--kn-text-inverse);
      background: var(--kn-brand);
      border-radius: var(--kn-r-sm);
      font-size: 16px;
      box-shadow: 2px 2px 0 var(--kn-brand-strong);
    }

    .admin__brand-text { display: flex; flex-direction: column; line-height: 1.1; }
    .admin__brand-en   { font-family: var(--kn-font-display); font-size: var(--kn-fs-md); font-weight: var(--kn-fw-bold); }
    .admin__brand-bn   { font-family: var(--kn-font-display); font-size: var(--kn-fs-xs); color: var(--kn-text-muted); font-style: italic; }

    .admin__nav {
      flex: 1;
      padding: var(--kn-sp-4) var(--kn-sp-2);
      display: flex;
      flex-direction: column;
      gap: var(--kn-sp-1);
    }

    .admin__nav-heading {
      font-family: var(--kn-font-mono);
      font-size: var(--kn-fs-xs);
      font-weight: var(--kn-fw-bold);
      letter-spacing: var(--kn-tracking-mono);
      text-transform: uppercase;
      color: var(--kn-text-muted);
      padding: var(--kn-sp-3) var(--kn-sp-3) var(--kn-sp-1);
    }

    .admin__nav-link {
      display: flex;
      align-items: center;
      gap: var(--kn-sp-3);
      padding: var(--kn-sp-2) var(--kn-sp-3);
      font-size: var(--kn-fs-base);
      color: var(--kn-text-muted);
      text-decoration: none;
      border-radius: var(--kn-r-xs);
      transition: background var(--kn-dur-fast) var(--kn-ease), color var(--kn-dur-fast) var(--kn-ease);
    }
    .admin__nav-link:hover { background: var(--kn-surface-alt); color: var(--kn-text); text-decoration: none; }
    .admin__nav-link.is-active {
      color: var(--kn-brand);
      background: var(--kn-info-bg);
      font-weight: var(--kn-fw-semibold);
    }

    .admin__nav-icon {
      width: 20px;
      text-align: center;
      font-size: 14px;
      flex-shrink: 0;
    }

    .is-collapsed .admin__nav-link { justify-content: center; padding: var(--kn-sp-2); }

    .admin__collapse {
      all: unset;
      cursor: pointer;
      margin: var(--kn-sp-3);
      width: 28px;
      height: 28px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: var(--kn-text-muted);
      background: var(--kn-bg);
      border: var(--kn-bw-1) solid var(--kn-border);
      border-radius: var(--kn-r-xs);
      align-self: flex-end;
      font-size: 16px;
    }
    .admin__collapse:hover { color: var(--kn-text); }
    .admin__collapse:focus-visible { box-shadow: var(--kn-ring); }
    .is-collapsed .admin__collapse { align-self: center; }

    .admin__main {
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .admin__topbar {
      display: flex;
      align-items: center;
      gap: var(--kn-sp-4);
      padding: 0 var(--kn-sp-5);
      height: 60px;
      background: var(--kn-surface);
      border-bottom: var(--kn-bw-1) solid var(--kn-border);
      flex-shrink: 0;
    }

    .admin__back {
      display: inline-flex;
      align-items: center;
      gap: var(--kn-sp-1);
      color: var(--kn-text-muted);
      font-size: var(--kn-fs-sm);
      text-decoration: none;
      padding: var(--kn-sp-1) var(--kn-sp-2);
      border-radius: var(--kn-r-xs);
    }
    .admin__back:hover { color: var(--kn-text); background: var(--kn-surface-alt); text-decoration: none; }
    .admin__back-text { font-family: var(--kn-font-mono); font-size: var(--kn-fs-xs); letter-spacing: var(--kn-tracking-mono); text-transform: uppercase; }

    .admin__search {
      flex: 1;
      max-width: 480px;
      display: flex;
      align-items: center;
      background: var(--kn-bg);
      border: var(--kn-bw-1) solid var(--kn-border);
      border-radius: var(--kn-r-sm);
      padding: 0 var(--kn-sp-3);
      height: 36px;
    }
    .admin__search:focus-within { box-shadow: var(--kn-ring); border-color: var(--kn-border-strong); }

    .admin__search-icon { color: var(--kn-text-muted); font-size: 14px; margin-right: var(--kn-sp-2); }

    .admin__search-input {
      flex: 1;
      background: transparent;
      border: none;
      outline: none;
      color: var(--kn-text);
      font-family: inherit;
      font-size: var(--kn-fs-base);
    }
    .admin__search-input::placeholder { color: var(--kn-text-muted); }

    .admin__search-shortcut {
      font-family: var(--kn-font-mono);
      font-size: var(--kn-fs-xs);
      color: var(--kn-text-muted);
      padding: 2px 6px;
      background: var(--kn-surface);
      border: var(--kn-bw-1) solid var(--kn-border);
      border-radius: var(--kn-r-xs);
    }

    .admin__actions { display: flex; gap: var(--kn-sp-2); align-items: center; }

    .admin__icon-btn {
      all: unset;
      cursor: pointer;
      width: 36px;
      height: 36px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: var(--kn-text);
      border-radius: var(--kn-r-xs);
      position: relative;
    }
    .admin__icon-btn:hover { background: var(--kn-surface-alt); }
    .admin__icon-btn:focus-visible { box-shadow: var(--kn-ring); }

    .admin__bell-badge {
      position: absolute;
      top: 0;
      right: 0;
      transform: translate(25%, -25%);
    }

    .admin__user {
      all: unset;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: var(--kn-sp-2);
      padding: var(--kn-sp-1) var(--kn-sp-2);
      border-radius: var(--kn-r-xs);
    }
    .admin__user:hover { background: var(--kn-surface-alt); }
    .admin__user-name { font-size: var(--kn-fs-sm); font-weight: var(--kn-fw-semibold); }

    .admin__content {
      flex: 1;
      overflow-y: auto;
      padding: var(--kn-sp-7) var(--kn-sp-7) var(--kn-sp-9);
      background: var(--kn-bg);
    }

    @media (max-width: 900px) {
      .admin { grid-template-columns: 64px 1fr; }
      .admin.is-collapsed { grid-template-columns: 0 1fr; }
      .admin__brand-text, .admin__nav-label, .admin__nav-heading { display: none; }
      .admin__nav-link { justify-content: center; padding: var(--kn-sp-2); }
      .admin__back-text, .admin__user-name, .admin__search-shortcut { display: none; }
      .admin__content { padding: var(--kn-sp-4); }
    }
  `],
})
export class AdminShellComponent {
  private readonly themeService = inject(KnThemeService);
  private readonly toast = inject(KnToastService);
  private readonly router = inject(Router);

  protected readonly collapsed = signal(false);
  protected readonly theme = computed(() => this.themeService.theme());

  protected readonly sections: NavSection[] = [
    {
      heading: 'Overview',
      items: [
        { slug: 'dashboard', label: 'Dashboard', icon: '◧' },
      ],
    },
    {
      heading: 'Commerce',
      items: [
        { slug: 'orders',    label: 'Orders',    icon: '⊟' },
        { slug: 'customers', label: 'Customers', icon: '◐' },
        { slug: 'products',  label: 'Products',  icon: '◇' },
      ],
    },
    {
      heading: 'Workspace',
      items: [
        { slug: 'settings',  label: 'Settings',  icon: '⚙' },
      ],
    },
  ];

  protected toggleCollapse(): void { this.collapsed.update((c) => !c); }
  protected toggleTheme(): void { this.themeService.toggle(); }

  protected ringBell(): void {
    this.toast.info('3 new notifications', 'Click any to read more.');
  }

  protected signOut(): void {
    this.toast.warn('Sign out', 'You would be signed out in a real app.');
    setTimeout(() => this.router.navigateByUrl('/'), 700);
  }
}
