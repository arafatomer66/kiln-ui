import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'kn-empty-state',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="kn-empty">
      <svg class="kn-empty__motif" viewBox="0 0 120 120" aria-hidden="true">
        <g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M10 60 L30 50 L50 65 L70 50 L90 65 L110 55" opacity="0.55"/>
          <path d="M10 70 L30 60 L50 75 L70 60 L90 75 L110 65" opacity="0.35"/>
          <circle cx="60" cy="42" r="14" opacity="0.6"/>
          <path d="M60 28 L60 22 M60 56 L60 62 M46 42 L40 42 M74 42 L80 42" opacity="0.4"/>
          <path d="M60 14 L66 22 L74 22 L67 28 L70 36 L60 30 L50 36 L53 28 L46 22 L54 22 Z" opacity="0.5"/>
        </g>
      </svg>

      <h3 class="kn-empty__title">{{ title() }}</h3>
      @if (description()) {
        <p class="kn-empty__desc">{{ description() }}</p>
      }
      <ng-content />
    </div>
  `,
  styles: [`
    :host { display: block; font-family: var(--kn-font-sans); }

    .kn-empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: var(--kn-sp-9) var(--kn-sp-6);
      color: var(--kn-text);
    }

    .kn-empty__motif {
      width: 96px;
      height: 96px;
      color: var(--kn-brand);
      margin-bottom: var(--kn-sp-4);
    }

    :host([data-tone='muted']) .kn-empty__motif { color: var(--kn-jute-300); }
    :host([data-tone='accent']) .kn-empty__motif { color: var(--kn-accent); }

    .kn-empty__title {
      font-family: var(--kn-font-display);
      font-size: var(--kn-fs-xl);
      font-weight: var(--kn-fw-bold);
      letter-spacing: var(--kn-tracking-tight);
      margin: 0 0 var(--kn-sp-2);
    }

    .kn-empty__desc {
      color: var(--kn-text-muted);
      font-size: var(--kn-fs-base);
      line-height: var(--kn-lh-normal);
      margin: 0 0 var(--kn-sp-5);
      max-width: 420px;
    }

    :host([data-size='sm']) .kn-empty { padding: var(--kn-sp-7) var(--kn-sp-4); }
    :host([data-size='sm']) .kn-empty__motif { width: 64px; height: 64px; }
  `],
  host: {
    '[attr.data-size]': 'size()',
    '[attr.data-tone]': 'tone()',
  },
})
export class KnEmptyStateComponent {
  readonly title = input<string>('Nothing here yet');
  readonly description = input<string>('');
  readonly size = input<'sm' | 'md'>('md');
  readonly tone = input<'brand' | 'muted' | 'accent'>('brand');
}
