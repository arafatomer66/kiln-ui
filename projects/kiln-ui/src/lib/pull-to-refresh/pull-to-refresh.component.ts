import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';

@Component({
  selector: 'kn-pull-to-refresh',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="kn-ptr__indicator"
      [style.transform]="indicatorTransform()"
      [class.is-armed]="armed()"
      aria-hidden="true"
    >
      @if (refreshing()) {
        <span class="kn-ptr__spinner"></span>
        <span>Refreshing…</span>
      } @else if (armed()) {
        <span class="kn-ptr__arrow kn-ptr__arrow--up">↑</span>
        <span>Release to refresh</span>
      } @else {
        <span class="kn-ptr__arrow">↓</span>
        <span>Pull to refresh</span>
      }
    </div>

    <div class="kn-ptr__content" [style.transform]="contentTransform()">
      <ng-content />
    </div>
  `,
  styles: [`
    :host {
      display: block;
      position: relative;
      overflow: hidden;
      font-family: var(--kn-font-sans);
    }

    .kn-ptr__indicator {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--kn-sp-2);
      font-family: var(--kn-font-mono);
      font-size: var(--kn-fs-xs);
      letter-spacing: var(--kn-tracking-mono);
      text-transform: uppercase;
      color: var(--kn-text-muted);
      transition: transform 280ms cubic-bezier(0.2, 0.7, 0.2, 1);
      pointer-events: none;
      will-change: transform;
    }

    .kn-ptr__indicator.is-armed { color: var(--kn-brand); font-weight: var(--kn-fw-bold); }

    .kn-ptr__arrow {
      font-size: 14px;
      transition: transform 200ms ease;
    }
    .kn-ptr__arrow--up { transform: rotate(180deg); }

    .kn-ptr__spinner {
      width: 14px;
      height: 14px;
      border: 2px solid currentColor;
      border-top-color: transparent;
      border-radius: 50%;
      animation: kn-ptr-spin 600ms linear infinite;
    }

    @keyframes kn-ptr-spin {
      to { transform: rotate(360deg); }
    }

    .kn-ptr__content {
      transition: transform 280ms cubic-bezier(0.2, 0.7, 0.2, 1);
      will-change: transform;
    }
  `],
})
export class KnPullToRefreshComponent {
  private readonly host = inject(ElementRef<HTMLElement>);

  readonly threshold = input<number>(64);
  readonly disabled = input<boolean>(false);

  readonly refreshTriggered = output<void>();

  protected readonly pullDistance = signal<number>(0);
  protected readonly refreshing = signal<boolean>(false);
  protected readonly armed = computed(() => this.pullDistance() >= this.threshold());

  protected readonly indicatorTransform = computed(() => {
    if (this.refreshing()) return `translateY(${this.threshold() - 64}px)`;
    return `translateY(${Math.min(this.pullDistance(), this.threshold() * 1.5) - 64}px)`;
  });

  protected readonly contentTransform = computed(() => {
    if (this.refreshing()) return `translateY(${this.threshold()}px)`;
    return `translateY(${Math.min(this.pullDistance(), this.threshold() * 1.5)}px)`;
  });

  private startY = 0;
  private tracking = false;

  @HostListener('touchstart', ['$event'])
  protected onTouchStart(event: TouchEvent): void {
    if (this.disabled() || this.refreshing()) return;
    if ((this.host.nativeElement.scrollTop ?? 0) > 0) return;
    this.startY = event.touches[0].clientY;
    this.tracking = true;
  }

  @HostListener('touchmove', ['$event'])
  protected onTouchMove(event: TouchEvent): void {
    if (!this.tracking || this.disabled() || this.refreshing()) return;
    const dy = event.touches[0].clientY - this.startY;
    if (dy > 0) {
      // resist past threshold
      const eased = dy < this.threshold() ? dy : this.threshold() + (dy - this.threshold()) * 0.4;
      this.pullDistance.set(eased);
      event.preventDefault();
    }
  }

  @HostListener('touchend')
  protected onTouchEnd(): void {
    if (!this.tracking) return;
    this.tracking = false;
    if (this.armed()) {
      this.refreshing.set(true);
      this.refreshTriggered.emit();
    } else {
      this.pullDistance.set(0);
    }
  }

  /** Call when your async refresh completes. */
  complete(): void {
    this.refreshing.set(false);
    this.pullDistance.set(0);
  }
}
