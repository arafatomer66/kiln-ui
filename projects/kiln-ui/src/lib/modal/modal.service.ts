import { Dialog, DialogConfig, DialogRef } from '@angular/cdk/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { Injectable, inject } from '@angular/core';

export type KnModalSize = 'sm' | 'md' | 'lg';

export interface KnModalOptions<D = unknown> {
  data?: D;
  size?: KnModalSize;
  disableClose?: boolean;
  ariaLabel?: string;
  panelClass?: string | string[];
}

const SIZE_WIDTHS: Record<KnModalSize, string> = {
  sm: '420px',
  md: '560px',
  lg: '780px',
};

@Injectable({ providedIn: 'root' })
export class KnModalService {
  private readonly dialog = inject(Dialog);

  open<C, D = unknown, R = unknown>(
    component: ComponentType<C>,
    options: KnModalOptions<D> = {}
  ): DialogRef<R, C> {
    const config: DialogConfig<D, DialogRef<R, C>> = {
      data: options.data,
      width: SIZE_WIDTHS[options.size ?? 'md'],
      maxWidth: '92vw',
      disableClose: options.disableClose ?? false,
      ariaLabel: options.ariaLabel,
      panelClass: ['kn-modal-panel', ...toArray(options.panelClass)],
      backdropClass: 'kn-modal-backdrop',
      hasBackdrop: true,
      autoFocus: 'first-tabbable',
      restoreFocus: true,
    };
    return this.dialog.open<R, D, C>(component, config);
  }
}

function toArray(value: string | string[] | undefined): string[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}
