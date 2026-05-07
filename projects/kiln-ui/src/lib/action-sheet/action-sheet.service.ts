import { Dialog, DialogConfig, DialogRef } from '@angular/cdk/dialog';
import { GlobalPositionStrategy } from '@angular/cdk/overlay';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { KnActionSheetComponent, KnActionSheetData, KnActionItem } from './action-sheet.component';

@Injectable({ providedIn: 'root' })
export class KnActionSheetService {
  private readonly dialog = inject(Dialog);

  open(data: KnActionSheetData): Promise<KnActionItem | null> {
    const positionStrategy = new GlobalPositionStrategy().bottom('0').centerHorizontally();

    const config: DialogConfig<KnActionSheetData, DialogRef<KnActionItem | null, KnActionSheetComponent>> = {
      data,
      width: '420px',
      maxWidth: '92vw',
      panelClass: 'kn-as-panel',
      backdropClass: 'kn-as-backdrop',
      hasBackdrop: true,
      positionStrategy,
      autoFocus: 'first-tabbable',
      restoreFocus: true,
    };

    const ref = this.dialog.open<KnActionItem | null, KnActionSheetData, KnActionSheetComponent>(
      KnActionSheetComponent,
      config
    );
    return firstValueFrom(ref.closed).then((v) => v ?? null);
  }
}
