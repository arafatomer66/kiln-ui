import { Dialog, DialogConfig, DialogRef } from '@angular/cdk/dialog';
import { GlobalPositionStrategy } from '@angular/cdk/overlay';
import { Injectable, inject } from '@angular/core';
import { KnCommandPaletteComponent, KnCommand } from './command-palette.component';

export interface KnCommandPaletteOptions {
  commands: KnCommand[];
  placeholder?: string;
}

@Injectable({ providedIn: 'root' })
export class KnCommandPaletteService {
  private readonly dialog = inject(Dialog);
  private currentRef: DialogRef<KnCommand | undefined, KnCommandPaletteComponent> | null = null;

  open(options: KnCommandPaletteOptions): DialogRef<KnCommand | undefined, KnCommandPaletteComponent> {
    if (this.currentRef) {
      this.currentRef.close();
    }

    const positionStrategy = new GlobalPositionStrategy()
      .top('15vh')
      .centerHorizontally();

    const config: DialogConfig<KnCommandPaletteOptions, DialogRef<KnCommand | undefined, KnCommandPaletteComponent>> = {
      data: options,
      width: '600px',
      maxWidth: '92vw',
      panelClass: 'kn-cmd-panel',
      backdropClass: 'kn-cmd-backdrop',
      hasBackdrop: true,
      positionStrategy,
      autoFocus: 'first-tabbable',
      restoreFocus: true,
    };

    const ref = this.dialog.open<KnCommand | undefined, KnCommandPaletteOptions, KnCommandPaletteComponent>(
      KnCommandPaletteComponent,
      config
    );

    this.currentRef = ref;
    ref.closed.subscribe(() => {
      if (this.currentRef === ref) this.currentRef = null;
    });

    return ref;
  }

  close(result?: KnCommand): void {
    this.currentRef?.close(result);
  }
}
