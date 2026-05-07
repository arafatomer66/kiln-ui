import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { KnLoadingBarService } from './loading-bar.service';

@Component({
  selector: 'kn-loading-bar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (active()) {
      <div class="kn-loading-bar" role="progressbar" [attr.aria-valuenow]="progress()" aria-valuemin="0" aria-valuemax="100">
        <div class="kn-loading-bar__fill" [style.width.%]="progress()"></div>
      </div>
    }
  `,
  styles: [`
    :host {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: var(--kn-z-toast);
      pointer-events: none;
    }

    .kn-loading-bar {
      width: 100%;
      height: 3px;
      background: transparent;
      overflow: hidden;
    }

    .kn-loading-bar__fill {
      height: 100%;
      background: var(--kn-brand);
      box-shadow: 0 0 8px rgba(27, 58, 111, 0.6);
      transition: width 280ms cubic-bezier(0.2, 0.7, 0.2, 1);
    }

    :host([data-tone='accent']) .kn-loading-bar__fill { background: var(--kn-accent); }
  `],
  host: {
    '[attr.data-tone]': 'tone()',
  },
})
export class KnLoadingBarComponent {
  private readonly service = inject(KnLoadingBarService);

  readonly tone = input<'brand' | 'accent'>('brand');

  protected readonly active = computed(() => this.service.active());
  protected readonly progress = computed(() => this.service.progress());
}
