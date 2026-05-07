import { Dialog, DialogConfig, DialogRef } from '@angular/cdk/dialog';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { KnConfirmComponent, KnConfirmData, KnConfirmTone } from './confirm.component';

export interface KnConfirmOptions {
  title?: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
}

@Injectable({ providedIn: 'root' })
export class KnConfirmService {
  private readonly dialog = inject(Dialog);

  /** Generic confirm. Returns a promise resolving to true (confirmed) or false (cancelled / closed). */
  show(options: KnConfirmOptions = {}, tone: KnConfirmTone = 'info'): Promise<boolean> {
    const data: KnConfirmData = {
      title: options.title ?? 'Are you sure?',
      message: options.message ?? '',
      confirmLabel: options.confirmLabel ?? 'Confirm',
      cancelLabel: options.cancelLabel ?? 'Cancel',
      tone,
    };

    const config: DialogConfig<KnConfirmData, DialogRef<boolean, KnConfirmComponent>> = {
      data,
      width: '420px',
      maxWidth: '92vw',
      panelClass: 'kn-confirm-panel',
      backdropClass: 'kn-confirm-backdrop',
      hasBackdrop: true,
      autoFocus: 'first-tabbable',
      restoreFocus: true,
    };

    const ref = this.dialog.open<boolean, KnConfirmData, KnConfirmComponent>(KnConfirmComponent, config);
    return firstValueFrom(ref.closed).then((v) => v ?? false);
  }

  info(options: KnConfirmOptions): Promise<boolean>   { return this.show(options, 'info'); }
  warn(options: KnConfirmOptions): Promise<boolean>   { return this.show(options, 'warn'); }
  danger(options: KnConfirmOptions): Promise<boolean> {
    return this.show({ confirmLabel: 'Delete', cancelLabel: 'Cancel', ...options }, 'danger');
  }
}
