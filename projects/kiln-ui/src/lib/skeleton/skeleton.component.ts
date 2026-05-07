import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'kn-skeleton',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span class="kn-skeleton" [attr.aria-busy]="'true'" aria-label="Loading"></span>`,
  styles: [`
    :host {
      display: inline-block;
      width: 100%;
      vertical-align: middle;
    }

    .kn-skeleton {
      display: block;
      width: 100%;
      height: 100%;
      background:
        linear-gradient(
          90deg,
          var(--kn-surface-alt) 0%,
          var(--kn-surface) 40%,
          var(--kn-surface-alt) 80%
        );
      background-size: 200% 100%;
      animation: kn-skeleton-shimmer 1.4s linear infinite;
      border-radius: var(--kn-r-xs);
    }

    :host([data-shape='circle']) { width: var(--kn-skeleton-size, 32px); height: var(--kn-skeleton-size, 32px); }
    :host([data-shape='circle']) .kn-skeleton { border-radius: 50%; }

    :host([data-variant='text'])    { width: 100%; height: 14px; }
    :host([data-variant='heading']) { width: 60%;  height: 28px; }
    :host([data-variant='block'])   { width: 100%; height: 96px; }
    :host([data-variant='avatar'])  { width: 36px; height: 36px; }
    :host([data-variant='avatar']) .kn-skeleton { border-radius: 50%; }

    @keyframes kn-skeleton-shimmer {
      0%   { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }

    @media (prefers-reduced-motion: reduce) {
      .kn-skeleton { animation: none; opacity: 0.7; }
    }
  `],
  host: {
    '[attr.data-variant]': 'variant()',
    '[attr.data-shape]': 'shape()',
    '[style.width]': 'width() || null',
    '[style.height]': 'height() || null',
  },
})
export class KnSkeletonComponent {
  readonly variant = input<'text' | 'heading' | 'block' | 'avatar' | 'custom'>('text');
  readonly shape = input<'rect' | 'circle'>('rect');
  readonly width = input<string>('');
  readonly height = input<string>('');
}
