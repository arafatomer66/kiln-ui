import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { KnToastService } from './toast.service';

@Component({
  selector: 'kn-toast-container',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="kn-toasts" [attr.data-position]="position()">
      @for (toast of toasts(); track toast.id) {
        <div class="kn-toast" [attr.data-tone]="toast.tone" role="status" aria-live="polite">
          <span class="kn-toast__motif" aria-hidden="true">❖</span>
          <span class="kn-toast__icon" aria-hidden="true">{{ glyph(toast.tone) }}</span>
          <div class="kn-toast__body">
            <div class="kn-toast__title">{{ toast.title }}</div>
            @if (toast.message) {
              <div class="kn-toast__message">{{ toast.message }}</div>
            }
          </div>
          <button
            type="button"
            class="kn-toast__close"
            aria-label="Dismiss"
            (click)="service.dismiss(toast.id)"
          >×</button>
        </div>
      }
    </div>
  `,
  styles: [`
    .kn-toasts {
      position: fixed;
      display: flex;
      flex-direction: column;
      gap: var(--kn-sp-3);
      z-index: var(--kn-z-toast);
      pointer-events: none;
      max-width: 380px;
      width: calc(100% - var(--kn-sp-8));
    }

    .kn-toasts[data-position='top-right']    { top: var(--kn-sp-6);    right: var(--kn-sp-6); }
    .kn-toasts[data-position='top-left']     { top: var(--kn-sp-6);    left: var(--kn-sp-6); }
    .kn-toasts[data-position='bottom-right'] { bottom: var(--kn-sp-6); right: var(--kn-sp-6); }
    .kn-toasts[data-position='bottom-left']  { bottom: var(--kn-sp-6); left: var(--kn-sp-6); }

    .kn-toast {
      position: relative;
      display: flex;
      align-items: flex-start;
      gap: var(--kn-sp-3);
      padding: var(--kn-sp-3) var(--kn-sp-4);
      background: var(--kn-bg);
      color: var(--kn-text);
      border: var(--kn-bw-2) solid var(--kn-border-strong);
      border-radius: var(--kn-r-sm);
      box-shadow: var(--kn-shadow-stamp);
      pointer-events: all;
      animation: kn-toast-in 220ms cubic-bezier(0.2, 0.7, 0.2, 1);
      font-family: var(--kn-font-sans);
    }

    @keyframes kn-toast-in {
      from { opacity: 0; transform: translateX(20px); }
      to   { opacity: 1; transform: translateX(0); }
    }

    .kn-toast__motif {
      position: absolute;
      top: -6px; right: -6px;
      width: 12px; height: 12px;
      color: var(--kn-brand);
      font-size: 14px; line-height: 1;
      pointer-events: none;
    }

    .kn-toast__icon { font-size: 16px; line-height: 1.4; flex-shrink: 0; }

    .kn-toast[data-tone='info']    .kn-toast__icon { color: var(--kn-info); }
    .kn-toast[data-tone='success'] .kn-toast__icon { color: var(--kn-success); }
    .kn-toast[data-tone='warn']    .kn-toast__icon { color: var(--kn-marigold-700); }
    .kn-toast[data-tone='danger']  .kn-toast__icon { color: var(--kn-danger); }

    .kn-toast__body { flex: 1; min-width: 0; }
    .kn-toast__title { font-weight: var(--kn-fw-bold); font-size: var(--kn-fs-base); }
    .kn-toast__message { color: var(--kn-text-muted); font-size: var(--kn-fs-sm); margin-top: 2px; }

    .kn-toast__close {
      all: unset;
      cursor: pointer;
      font-size: 18px;
      line-height: 1;
      color: var(--kn-text-muted);
      padding: 0 var(--kn-sp-1);
      border-radius: var(--kn-r-xs);

      &:hover { color: var(--kn-text); }
      &:focus-visible { box-shadow: var(--kn-ring); }
    }
  `],
})
export class KnToastContainerComponent {
  protected readonly service = inject(KnToastService);

  readonly position = input<'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'>('top-right');

  protected readonly toasts = computed(() => this.service.toasts());

  protected glyph(tone: string): string {
    switch (tone) {
      case 'success': return '✓';
      case 'warn': return '⚠';
      case 'danger': return '✕';
      default: return 'ⓘ';
    }
  }
}
