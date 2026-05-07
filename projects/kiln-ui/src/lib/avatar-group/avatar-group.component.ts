import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { KnAvatarComponent, KnAvatarSize } from '../avatar/avatar.component';

export interface KnAvatarRef {
  readonly name: string;
  readonly src?: string;
}

@Component({
  selector: 'kn-avatar-group',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [KnAvatarComponent],
  template: `
    <div class="kn-avatar-group" [attr.aria-label]="ariaLabel() || null">
      @for (a of visible(); track $index) {
        <span class="kn-avatar-group__item">
          <kn-avatar [name]="a.name" [src]="a.src ?? ''" [size]="size()" />
        </span>
      }
      @if (overflow() > 0) {
        <span class="kn-avatar-group__more" [attr.title]="overflow() + ' more'">
          +{{ overflow() }}
        </span>
      }
    </div>
  `,
  styles: [`
    :host { display: inline-flex; }

    .kn-avatar-group {
      display: inline-flex;
      align-items: center;
    }

    .kn-avatar-group__item {
      display: inline-flex;
      margin-left: -8px;
    }
    .kn-avatar-group__item:first-child { margin-left: 0; }
    .kn-avatar-group__item :host { display: inline-flex; }

    .kn-avatar-group__more {
      margin-left: -8px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: var(--kn-surface-alt);
      color: var(--kn-text-muted);
      font-family: var(--kn-font-mono);
      font-size: var(--kn-fs-xs);
      font-weight: var(--kn-fw-bold);
      letter-spacing: var(--kn-tracking-mono);
      border: var(--kn-bw-2) solid var(--kn-border-strong);
      border-radius: 50%;
    }

    :host([data-size='sm']) .kn-avatar-group__more { width: 24px; height: 24px; font-size: 9px; }
    :host([data-size='md']) .kn-avatar-group__more { width: 36px; height: 36px; font-size: 11px; }
    :host([data-size='lg']) .kn-avatar-group__more { width: 48px; height: 48px; font-size: 13px; }
    :host([data-size='xl']) .kn-avatar-group__more { width: 64px; height: 64px; font-size: 15px; }
  `],
  host: {
    '[attr.data-size]': 'size()',
  },
})
export class KnAvatarGroupComponent {
  readonly avatars = input<KnAvatarRef[]>([]);
  readonly max = input<number>(4);
  readonly size = input<KnAvatarSize>('md');
  readonly ariaLabel = input<string>('');

  readonly visible = computed(() => this.avatars().slice(0, this.max()));
  readonly overflow = computed(() => Math.max(0, this.avatars().length - this.max()));
}
