import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, computed, signal } from '@angular/core';
import type { KnTourStep } from './tour.service';

interface Rect { x: number; y: number; w: number; h: number; }

@Component({
  selector: 'kn-tour-overlay',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="kn-tour" role="dialog" aria-label="Onboarding tour">
      <!-- Backdrop with cutout for the target -->
      <svg class="kn-tour__mask" aria-hidden="true">
        <defs>
          <mask id="kn-tour-mask">
            <rect width="100%" height="100%" fill="white"/>
            @if (rect()) {
              <rect
                [attr.x]="rect()!.x - 6"
                [attr.y]="rect()!.y - 6"
                [attr.width]="rect()!.w + 12"
                [attr.height]="rect()!.h + 12"
                rx="6"
                fill="black"
              />
            }
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="rgba(42, 36, 24, 0.55)" mask="url(#kn-tour-mask)" />
      </svg>

      <!-- Tooltip card -->
      @if (rect(); as r) {
        <div class="kn-tour__card" [style.left.px]="cardLeft()" [style.top.px]="cardTop()">
          <span class="kn-tour__motif kn-tour__motif--tl" aria-hidden="true">❖</span>
          <span class="kn-tour__motif kn-tour__motif--tr" aria-hidden="true">❖</span>
          <div class="kn-tour__step">Step {{ index() + 1 }} of {{ steps.length }}</div>
          <h3 class="kn-tour__title">{{ steps[index()].title }}</h3>
          <p class="kn-tour__desc">{{ steps[index()].description }}</p>
          <div class="kn-tour__actions">
            <button type="button" class="kn-tour__btn kn-tour__btn--ghost" (click)="onSkip()">Skip</button>
            <div class="kn-tour__nav">
              @if (index() > 0) {
                <button type="button" class="kn-tour__btn kn-tour__btn--outline" (click)="onPrev()">Back</button>
              }
              <button type="button" class="kn-tour__btn kn-tour__btn--solid" (click)="onNext()">
                {{ index() === steps.length - 1 ? 'Done' : 'Next' }}
              </button>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    :host { display: contents; font-family: var(--kn-font-sans); }

    .kn-tour {
      position: fixed;
      inset: 0;
      pointer-events: auto;
      z-index: var(--kn-z-modal, 1100);
    }

    .kn-tour__mask {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }

    .kn-tour__card {
      position: absolute;
      width: 320px;
      padding: var(--kn-sp-5);
      background: var(--kn-bg);
      border: var(--kn-bw-2) solid var(--kn-border-strong);
      border-radius: var(--kn-r-sm);
      box-shadow: var(--kn-shadow-stamp-strong);
      animation: kn-tour-in 200ms cubic-bezier(0.2, 0.7, 0.2, 1);
    }

    @keyframes kn-tour-in {
      from { opacity: 0; transform: translateY(4px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .kn-tour__motif {
      position: absolute;
      width: 12px; height: 12px;
      color: var(--kn-brand);
      font-size: 14px; line-height: 1;
      pointer-events: none;
    }
    .kn-tour__motif--tl { top: -6px; left: -6px; }
    .kn-tour__motif--tr { top: -6px; right: -6px; }

    .kn-tour__step {
      font-family: var(--kn-font-mono);
      font-size: var(--kn-fs-xs);
      font-weight: var(--kn-fw-bold);
      letter-spacing: var(--kn-tracking-mono);
      text-transform: uppercase;
      color: var(--kn-brand);
      margin-bottom: var(--kn-sp-2);
    }

    .kn-tour__title {
      font-family: var(--kn-font-display);
      font-size: var(--kn-fs-lg);
      font-weight: var(--kn-fw-bold);
      margin: 0 0 var(--kn-sp-2);
      color: var(--kn-text);
    }

    .kn-tour__desc {
      color: var(--kn-text-muted);
      line-height: var(--kn-lh-relaxed);
      margin: 0 0 var(--kn-sp-4);
      font-size: var(--kn-fs-base);
    }

    .kn-tour__actions {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--kn-sp-2);
    }
    .kn-tour__nav { display: flex; gap: var(--kn-sp-2); }

    .kn-tour__btn {
      all: unset;
      cursor: pointer;
      padding: 6px var(--kn-sp-3);
      font-family: var(--kn-font-sans);
      font-size: var(--kn-fs-sm);
      font-weight: var(--kn-fw-semibold);
      border-radius: var(--kn-r-xs);
    }
    .kn-tour__btn:focus-visible { box-shadow: var(--kn-ring); }

    .kn-tour__btn--ghost { color: var(--kn-text-muted); }
    .kn-tour__btn--ghost:hover { color: var(--kn-text); }

    .kn-tour__btn--outline { color: var(--kn-text); border: var(--kn-bw-1) solid var(--kn-border); }
    .kn-tour__btn--outline:hover { background: var(--kn-surface); }

    .kn-tour__btn--solid { color: var(--kn-text-inverse); background: var(--kn-brand); }
    .kn-tour__btn--solid:hover { background: var(--kn-brand-strong); }
  `],
})
export class KnTourOverlayComponent implements AfterViewInit, OnDestroy {
  steps: KnTourStep[] = [];
  dismiss: () => void = () => {};
  indexChange: (i: number) => void = () => {};

  protected readonly index = signal<number>(0);
  protected readonly rect = signal<Rect | null>(null);

  readonly cardLeft = computed(() => {
    const r = this.rect();
    if (!r) return 16;
    const cardW = 320;
    const margin = 16;
    const want = r.x + r.w / 2 - cardW / 2;
    const max = window.innerWidth - cardW - margin;
    return Math.max(margin, Math.min(want, max));
  });

  readonly cardTop = computed(() => {
    const r = this.rect();
    if (!r) return 16;
    const margin = 16;
    const below = r.y + r.h + 16;
    if (below + 200 < window.innerHeight) return below;
    return Math.max(margin, r.y - 220);
  });

  ngAfterViewInit(): void {
    this.measure();
    window.addEventListener('resize', this.measureBound);
    window.addEventListener('scroll', this.measureBound, true);
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.measureBound);
    window.removeEventListener('scroll', this.measureBound, true);
  }

  protected onPrev(): void {
    this.index.update((i) => Math.max(0, i - 1));
    this.indexChange(this.index());
    setTimeout(() => this.measure(), 0);
  }

  protected onNext(): void {
    if (this.index() === this.steps.length - 1) {
      this.dismiss();
      return;
    }
    this.index.update((i) => i + 1);
    this.indexChange(this.index());
    setTimeout(() => this.measure(), 0);
  }

  protected onSkip(): void { this.dismiss(); }

  private measure(): void {
    const step = this.steps[this.index()];
    if (!step) return;
    const el = document.querySelector<HTMLElement>(step.target);
    if (!el) {
      this.rect.set({ x: 16, y: 16, w: 0, h: 0 });
      return;
    }
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const r = el.getBoundingClientRect();
    this.rect.set({ x: r.left, y: r.top, w: r.width, h: r.height });
  }

  private measureBound = () => this.measure();
}
