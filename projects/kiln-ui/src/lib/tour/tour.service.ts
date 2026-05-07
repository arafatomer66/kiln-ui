import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ApplicationRef, ComponentRef, EnvironmentInjector, Injectable, createComponent, inject, signal } from '@angular/core';
import { KnTourOverlayComponent } from './tour-overlay.component';

export interface KnTourStep {
  readonly target: string; // CSS selector
  readonly title: string;
  readonly description: string;
  readonly placement?: 'top' | 'right' | 'bottom' | 'left' | 'auto';
}

@Injectable({ providedIn: 'root' })
export class KnTourService {
  private readonly overlay = inject(Overlay);
  private readonly appRef = inject(ApplicationRef);
  private readonly envInjector = inject(EnvironmentInjector);

  private overlayRef: OverlayRef | null = null;
  private componentRef: ComponentRef<KnTourOverlayComponent> | null = null;

  readonly active = signal<boolean>(false);
  readonly currentIndex = signal<number>(0);

  start(steps: KnTourStep[]): void {
    if (steps.length === 0) return;
    this.stop();

    this.overlayRef = this.overlay.create({
      hasBackdrop: false,
      positionStrategy: this.overlay.position().global(),
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
    });

    const portal = new ComponentPortal(KnTourOverlayComponent);
    this.componentRef = this.overlayRef.attach(portal);
    this.componentRef.instance.steps = steps;
    this.componentRef.instance.dismiss = () => this.stop();
    this.componentRef.instance.indexChange = (i: number) => this.currentIndex.set(i);
    this.componentRef.changeDetectorRef.markForCheck();

    this.active.set(true);
    this.currentIndex.set(0);
  }

  stop(): void {
    this.overlayRef?.dispose();
    this.overlayRef = null;
    this.componentRef = null;
    this.active.set(false);
    this.currentIndex.set(0);
  }
}
