import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type KnBadgeTone = 'neutral' | 'brand' | 'success' | 'warn' | 'danger' | 'accent' | 'info';
export type KnBadgeVariant = 'solid' | 'soft' | 'outline';

@Component({
  selector: 'kn-badge',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span class="kn-badge"><ng-content /></span>`,
  styles: [`
    :host { display: inline-flex; vertical-align: middle; }

    .kn-badge {
      display: inline-flex;
      align-items: center;
      font-family: var(--kn-font-mono);
      font-size: var(--kn-fs-xs);
      font-weight: var(--kn-fw-bold);
      letter-spacing: var(--kn-tracking-mono);
      text-transform: uppercase;
      padding: 0 var(--kn-sp-2);
      height: 20px;
      border-radius: var(--kn-r-pill);
      white-space: nowrap;
    }

    /* solid */
    :host([data-variant='solid'][data-tone='neutral']) .kn-badge { background: var(--kn-jute-700); color: var(--kn-text-inverse); }
    :host([data-variant='solid'][data-tone='brand'])   .kn-badge { background: var(--kn-brand); color: var(--kn-text-inverse); }
    :host([data-variant='solid'][data-tone='success']) .kn-badge { background: var(--kn-success); color: var(--kn-text-inverse); }
    :host([data-variant='solid'][data-tone='warn'])    .kn-badge { background: var(--kn-warn); color: var(--kn-jute-900); }
    :host([data-variant='solid'][data-tone='danger'])  .kn-badge { background: var(--kn-danger); color: var(--kn-text-inverse); }
    :host([data-variant='solid'][data-tone='accent'])  .kn-badge { background: var(--kn-accent); color: var(--kn-jute-900); }
    :host([data-variant='solid'][data-tone='info'])    .kn-badge { background: var(--kn-info); color: var(--kn-text-inverse); }

    /* soft */
    :host([data-variant='soft'][data-tone='neutral']) .kn-badge { background: var(--kn-surface-alt); color: var(--kn-text); }
    :host([data-variant='soft'][data-tone='brand'])   .kn-badge { background: var(--kn-info-bg); color: var(--kn-brand); }
    :host([data-variant='soft'][data-tone='success']) .kn-badge { background: var(--kn-success-bg); color: var(--kn-success); }
    :host([data-variant='soft'][data-tone='warn'])    .kn-badge { background: var(--kn-warn-bg); color: var(--kn-marigold-700); }
    :host([data-variant='soft'][data-tone='danger'])  .kn-badge { background: var(--kn-danger-bg); color: var(--kn-danger); }
    :host([data-variant='soft'][data-tone='accent'])  .kn-badge { background: var(--kn-warn-bg); color: var(--kn-marigold-700); }
    :host([data-variant='soft'][data-tone='info'])    .kn-badge { background: var(--kn-info-bg); color: var(--kn-info); }

    /* outline */
    :host([data-variant='outline']) .kn-badge {
      background: transparent;
      border: var(--kn-bw-1) solid currentColor;
    }
    :host([data-variant='outline'][data-tone='neutral']) .kn-badge { color: var(--kn-text); }
    :host([data-variant='outline'][data-tone='brand'])   .kn-badge { color: var(--kn-brand); }
    :host([data-variant='outline'][data-tone='success']) .kn-badge { color: var(--kn-success); }
    :host([data-variant='outline'][data-tone='warn'])    .kn-badge { color: var(--kn-marigold-700); }
    :host([data-variant='outline'][data-tone='danger'])  .kn-badge { color: var(--kn-danger); }
    :host([data-variant='outline'][data-tone='accent'])  .kn-badge { color: var(--kn-marigold-700); }
    :host([data-variant='outline'][data-tone='info'])    .kn-badge { color: var(--kn-info); }
  `],
  host: {
    '[attr.data-variant]': 'variant()',
    '[attr.data-tone]': 'tone()',
  },
})
export class KnBadgeComponent {
  readonly variant = input<KnBadgeVariant>('soft');
  readonly tone = input<KnBadgeTone>('neutral');
}
