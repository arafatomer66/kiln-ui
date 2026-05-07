import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'kn-divider',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @switch (variant()) {
      @case ('alpana') {
        <div class="kn-divider kn-divider--alpana" role="separator">
          <svg class="kn-divider__art" viewBox="0 0 320 16" preserveAspectRatio="none" aria-hidden="true">
            <path
              d="M0 8 L24 4 L48 12 L72 4 L96 12 L120 4 L140 12 L160 4 L180 12 L200 4 L224 12 L248 4 L272 12 L296 4 L320 8"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
            />
            <circle cx="160" cy="8" r="3" fill="currentColor" />
          </svg>
        </div>
      }
      @case ('dot') {
        <div class="kn-divider kn-divider--dot" role="separator">
          <span class="kn-divider__line"></span>
          <span class="kn-divider__glyph">❖</span>
          <span class="kn-divider__line"></span>
        </div>
      }
      @default {
        <div class="kn-divider kn-divider--plain" role="separator">
          <span class="kn-divider__line"></span>
          @if (label()) {
            <span class="kn-divider__label">{{ label() }}</span>
            <span class="kn-divider__line"></span>
          }
        </div>
      }
    }
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      color: var(--kn-border);
      margin: var(--kn-sp-4) 0;
    }

    .kn-divider {
      display: flex;
      align-items: center;
      gap: var(--kn-sp-3);
      width: 100%;
    }

    .kn-divider__line {
      flex: 1;
      height: 1px;
      background: currentColor;
    }

    .kn-divider__glyph {
      color: var(--kn-brand);
      font-size: 14px;
      line-height: 1;
    }

    .kn-divider__label {
      font-family: var(--kn-font-mono);
      font-size: var(--kn-fs-xs);
      font-weight: var(--kn-fw-bold);
      letter-spacing: var(--kn-tracking-mono);
      text-transform: uppercase;
      color: var(--kn-text-muted);
    }

    .kn-divider__art {
      width: 100%;
      height: 16px;
      color: var(--kn-brand);
      display: block;
    }
  `],
})
export class KnDividerComponent {
  readonly variant = input<'plain' | 'dot' | 'alpana'>('plain');
  readonly label = input<string>('');
}
