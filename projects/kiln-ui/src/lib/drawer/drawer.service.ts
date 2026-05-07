import { Dialog, DialogConfig, DialogRef } from '@angular/cdk/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { GlobalPositionStrategy } from '@angular/cdk/overlay';
import { Injectable, inject } from '@angular/core';

export type KnDrawerSide = 'left' | 'right';
export type KnDrawerSize = 'sm' | 'md' | 'lg';

export interface KnDrawerOptions<D = unknown> {
  data?: D;
  side?: KnDrawerSide;
  size?: KnDrawerSize;
  disableClose?: boolean;
  ariaLabel?: string;
}

const SIZE_WIDTHS: Record<KnDrawerSize, string> = {
  sm: '320px',
  md: '440px',
  lg: '560px',
};

@Injectable({ providedIn: 'root' })
export class KnDrawerService {
  private readonly dialog = inject(Dialog);

  open<C, D = unknown, R = unknown>(
    component: ComponentType<C>,
    options: KnDrawerOptions<D> = {}
  ): DialogRef<R, C> {
    const side = options.side ?? 'right';
    const positionStrategy = new GlobalPositionStrategy();
    if (side === 'right') {
      positionStrategy.right('0').top('0');
    } else {
      positionStrategy.left('0').top('0');
    }

    const config: DialogConfig<D, DialogRef<R, C>> = {
      data: options.data,
      width: SIZE_WIDTHS[options.size ?? 'md'],
      maxWidth: '92vw',
      height: '100vh',
      disableClose: options.disableClose ?? false,
      ariaLabel: options.ariaLabel,
      panelClass: ['kn-drawer-panel', `kn-drawer-panel--${side}`],
      backdropClass: 'kn-drawer-backdrop',
      hasBackdrop: true,
      autoFocus: 'first-tabbable',
      restoreFocus: true,
      positionStrategy,
    };
    return this.dialog.open<R, D, C>(component, config);
  }
}
