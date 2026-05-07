import { Dialog, DialogConfig, DialogRef } from '@angular/cdk/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { GlobalPositionStrategy } from '@angular/cdk/overlay';
import { Injectable, inject } from '@angular/core';

export interface KnBottomSheetOptions<D = unknown> {
  data?: D;
  ariaLabel?: string;
  disableClose?: boolean;
  height?: string; // e.g. '60vh'
}

@Injectable({ providedIn: 'root' })
export class KnBottomSheetService {
  private readonly dialog = inject(Dialog);

  open<C, D = unknown, R = unknown>(
    component: ComponentType<C>,
    options: KnBottomSheetOptions<D> = {}
  ): DialogRef<R, C> {
    const positionStrategy = new GlobalPositionStrategy().bottom('0').centerHorizontally();

    const config: DialogConfig<D, DialogRef<R, C>> = {
      data: options.data,
      width: '100vw',
      maxWidth: '100vw',
      height: options.height,
      panelClass: 'kn-bs-panel',
      backdropClass: 'kn-bs-backdrop',
      hasBackdrop: true,
      disableClose: options.disableClose ?? false,
      ariaLabel: options.ariaLabel,
      positionStrategy,
      autoFocus: 'first-tabbable',
      restoreFocus: true,
    };
    return this.dialog.open<R, D, C>(component, config);
  }
}
