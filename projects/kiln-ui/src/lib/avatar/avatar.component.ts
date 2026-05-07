import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type KnAvatarSize = 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'kn-avatar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="kn-avatar" [attr.aria-label]="ariaLabel()">
      @if (src()) {
        <img class="kn-avatar__img" [src]="src()" [alt]="ariaLabel() || ''" />
      } @else {
        <span class="kn-avatar__initials">{{ initials() }}</span>
      }
    </span>
  `,
  styles: [`
    :host { display: inline-flex; }

    .kn-avatar {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: var(--kn-surface-alt);
      color: var(--kn-text);
      border: var(--kn-bw-2) solid var(--kn-border-strong);
      border-radius: var(--kn-r-pill);
      overflow: hidden;
      font-family: var(--kn-font-mono);
      font-weight: var(--kn-fw-bold);
      letter-spacing: var(--kn-tracking-mono);
      text-transform: uppercase;
      flex-shrink: 0;
    }

    :host([data-size='sm']) .kn-avatar { width: 24px; height: 24px; font-size: 9px; }
    :host([data-size='md']) .kn-avatar { width: 36px; height: 36px; font-size: 12px; }
    :host([data-size='lg']) .kn-avatar { width: 48px; height: 48px; font-size: 14px; }
    :host([data-size='xl']) .kn-avatar { width: 64px; height: 64px; font-size: 18px; }

    :host([data-shape='square']) .kn-avatar { border-radius: var(--kn-r-sm); }

    .kn-avatar__img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  `],
  host: {
    '[attr.data-size]': 'size()',
    '[attr.data-shape]': 'shape()',
  },
})
export class KnAvatarComponent {
  readonly src = input<string>('');
  readonly name = input<string>('');
  readonly size = input<KnAvatarSize>('md');
  readonly shape = input<'circle' | 'square'>('circle');
  readonly ariaLabel = input<string>('');

  readonly initials = computed(() => {
    const value = this.name().trim();
    if (!value) return '?';
    return value
      .split(/\s+/)
      .slice(0, 2)
      .map((p) => p.charAt(0))
      .join('');
  });
}
