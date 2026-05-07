import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface KnCrumb {
  readonly label: string;
  readonly href?: string;
  readonly routerLink?: string | string[];
}

@Component({
  selector: 'kn-breadcrumbs',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <nav class="kn-bc" [attr.aria-label]="ariaLabel()">
      @for (crumb of items(); track $index; let i = $index; let last = $last) {
        @if (last || (!crumb.href && !crumb.routerLink)) {
          <span class="kn-bc__current" [attr.aria-current]="last ? 'page' : null">{{ crumb.label }}</span>
        } @else if (crumb.routerLink) {
          <a class="kn-bc__link" [routerLink]="crumb.routerLink">{{ crumb.label }}</a>
        } @else {
          <a class="kn-bc__link" [attr.href]="crumb.href">{{ crumb.label }}</a>
        }
        @if (!last) {
          <span class="kn-bc__sep" aria-hidden="true">{{ separator() }}</span>
        }
      }
    </nav>
  `,
  styles: [`
    :host { display: inline-flex; font-family: var(--kn-font-sans); }

    .kn-bc {
      display: inline-flex;
      align-items: center;
      flex-wrap: wrap;
      gap: var(--kn-sp-1);
      font-size: var(--kn-fs-sm);
    }

    .kn-bc__link {
      color: var(--kn-text-muted);
      text-decoration: none;
      padding: 2px var(--kn-sp-1);
      border-radius: var(--kn-r-xs);
      transition: color var(--kn-dur-fast) var(--kn-ease);
    }
    .kn-bc__link:hover { color: var(--kn-brand); text-decoration: underline; }
    .kn-bc__link:focus-visible { outline: none; box-shadow: var(--kn-ring); }

    .kn-bc__sep {
      color: var(--kn-text-muted);
      opacity: 0.6;
      user-select: none;
    }

    .kn-bc__current {
      color: var(--kn-text);
      font-weight: var(--kn-fw-semibold);
      padding: 2px var(--kn-sp-1);
    }
  `],
})
export class KnBreadcrumbsComponent {
  readonly items = input<KnCrumb[]>([]);
  readonly separator = input<string>('/');
  readonly ariaLabel = input<string>('Breadcrumb');
}
