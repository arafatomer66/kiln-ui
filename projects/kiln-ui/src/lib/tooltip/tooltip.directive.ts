import { Overlay, OverlayPositionBuilder, OverlayRef, ConnectedPosition } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  Directive,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewEncapsulation,
  inject,
  input,
} from '@angular/core';

export type KnTooltipPosition = 'top' | 'right' | 'bottom' | 'left';

@Component({
  selector: 'kn-tooltip-content',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="kn-tooltip">{{ text }}</div>
  `,
  styles: [`
    .kn-tooltip {
      background: var(--kn-jute-900);
      color: var(--kn-jute-50);
      font-family: var(--kn-font-sans);
      font-size: var(--kn-fs-sm);
      padding: var(--kn-sp-2) var(--kn-sp-3);
      border-radius: var(--kn-r-sm);
      box-shadow: 2px 2px 0 var(--kn-jute-700);
      max-width: 280px;
      pointer-events: none;
      animation: kn-tt-in 120ms cubic-bezier(0.2, 0.7, 0.2, 1);
    }

    @keyframes kn-tt-in {
      from { opacity: 0; transform: translateY(2px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  `],
})
export class KnTooltipContentComponent {
  text = '';
}

const POSITIONS: Record<KnTooltipPosition, ConnectedPosition> = {
  top:    { originX: 'center', originY: 'top',    overlayX: 'center', overlayY: 'bottom', offsetY: -8 },
  right:  { originX: 'end',    originY: 'center', overlayX: 'start',  overlayY: 'center', offsetX:  8 },
  bottom: { originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top',    offsetY:  8 },
  left:   { originX: 'start',  originY: 'center', overlayX: 'end',    overlayY: 'center', offsetX: -8 },
};

@Directive({
  selector: '[knTooltip]',
  standalone: true,
})
export class KnTooltipDirective implements OnDestroy {
  private readonly overlay = inject(Overlay);
  private readonly positionBuilder = inject(OverlayPositionBuilder);
  private readonly host = inject(ElementRef<HTMLElement>);

  readonly knTooltip = input<string>('');
  readonly knTooltipPosition = input<KnTooltipPosition>('top');
  readonly knTooltipDelay = input<number>(150);

  private overlayRef: OverlayRef | null = null;
  private contentRef: ComponentRef<KnTooltipContentComponent> | null = null;
  private timer: ReturnType<typeof setTimeout> | null = null;

  @HostListener('mouseenter')
  @HostListener('focusin')
  protected show(): void {
    if (!this.knTooltip()) return;
    this.cancelTimer();
    this.timer = setTimeout(() => this.create(), this.knTooltipDelay());
  }

  @HostListener('mouseleave')
  @HostListener('focusout')
  protected hide(): void {
    this.cancelTimer();
    this.dispose();
  }

  private create(): void {
    if (this.overlayRef) return;
    const positionStrategy = this.positionBuilder
      .flexibleConnectedTo(this.host)
      .withPositions([POSITIONS[this.knTooltipPosition()]]);
    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
    });
    const portal = new ComponentPortal(KnTooltipContentComponent);
    this.contentRef = this.overlayRef.attach(portal);
    this.contentRef.instance.text = this.knTooltip();
    this.contentRef.changeDetectorRef.markForCheck();
  }

  private dispose(): void {
    this.overlayRef?.dispose();
    this.overlayRef = null;
    this.contentRef = null;
  }

  private cancelTimer(): void {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  ngOnDestroy(): void {
    this.cancelTimer();
    this.dispose();
  }
}
