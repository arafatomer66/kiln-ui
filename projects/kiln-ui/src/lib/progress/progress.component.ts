import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'kn-progress',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="kn-progress"
      role="progressbar"
      [attr.aria-valuenow]="indeterminate() ? null : value()"
      [attr.aria-valuemin]="0"
      [attr.aria-valuemax]="100"
      [attr.aria-label]="ariaLabel() || null"
    >
      <div class="kn-progress__bar" [style.width.%]="indeterminate() ? null : pct()"></div>
    </div>
    @if (showLabel() && !indeterminate()) {
      <div class="kn-progress__label">{{ pct() }}%</div>
    }
  `,
  styles: [`
    :host { display: block; font-family: var(--kn-font-sans); }

    .kn-progress {
      width: 100%;
      height: 8px;
      background: var(--kn-surface-alt);
      border: var(--kn-bw-2) solid var(--kn-border-strong);
      border-radius: var(--kn-r-pill);
      overflow: hidden;
      position: relative;
    }

    :host([data-size='sm']) .kn-progress { height: 6px; }
    :host([data-size='lg']) .kn-progress { height: 12px; }

    .kn-progress__bar {
      height: 100%;
      background: var(--kn-brand);
      transition: width var(--kn-dur-slow) var(--kn-ease);
    }

    :host([data-tone='success']) .kn-progress__bar { background: var(--kn-success); }
    :host([data-tone='warn'])    .kn-progress__bar { background: var(--kn-warn); }
    :host([data-tone='danger'])  .kn-progress__bar { background: var(--kn-danger); }
    :host([data-tone='accent'])  .kn-progress__bar { background: var(--kn-accent); }

    :host([data-indeterminate='true']) .kn-progress__bar {
      width: 30%;
      animation: kn-progress-indet 1.4s ease-in-out infinite;
    }

    @keyframes kn-progress-indet {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(400%); }
    }

    .kn-progress__label {
      margin-top: var(--kn-sp-1);
      font-family: var(--kn-font-mono);
      font-size: var(--kn-fs-xs);
      letter-spacing: var(--kn-tracking-mono);
      color: var(--kn-text-muted);
      text-align: right;
    }
  `],
  host: {
    '[attr.data-size]': 'size()',
    '[attr.data-tone]': 'tone()',
    '[attr.data-indeterminate]': 'indeterminate() ? "true" : null',
  },
})
export class KnProgressComponent {
  readonly value = input<number>(0);
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly tone = input<'brand' | 'success' | 'warn' | 'danger' | 'accent'>('brand');
  readonly indeterminate = input<boolean>(false);
  readonly showLabel = input<boolean>(false);
  readonly ariaLabel = input<string>('');

  readonly pct = computed(() => Math.max(0, Math.min(100, this.value())));
}
