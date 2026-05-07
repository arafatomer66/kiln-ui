import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { KnButtonComponent } from '../button/button.component';
import { KnModalComponent, KnModalFooterComponent } from '../modal/modal.component';

export type KnConfirmTone = 'info' | 'warn' | 'danger';

export interface KnConfirmData {
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel: string;
  tone: KnConfirmTone;
}

@Component({
  selector: 'kn-confirm',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [KnModalComponent, KnModalFooterComponent, KnButtonComponent],
  template: `
    <kn-modal [title]="data.title">
      <p class="kn-confirm__msg">{{ data.message }}</p>
      <kn-modal-footer>
        <kn-button variant="outline" size="sm" (clicked)="cancel()">{{ data.cancelLabel }}</kn-button>
        <kn-button
          variant="solid"
          [tone]="data.tone === 'danger' ? 'danger' : data.tone === 'warn' ? 'accent' : 'brand'"
          size="sm"
          (clicked)="confirm()"
        >{{ data.confirmLabel }}</kn-button>
      </kn-modal-footer>
    </kn-modal>
  `,
  styles: [`
    .kn-confirm__msg {
      margin: 0;
      color: var(--kn-text);
      line-height: var(--kn-lh-relaxed);
    }
  `],
})
export class KnConfirmComponent {
  protected readonly data = inject<KnConfirmData>(DIALOG_DATA);
  private readonly dialogRef = inject<DialogRef<boolean>>(DialogRef);

  protected confirm(): void { this.dialogRef.close(true); }
  protected cancel(): void { this.dialogRef.close(false); }
}
