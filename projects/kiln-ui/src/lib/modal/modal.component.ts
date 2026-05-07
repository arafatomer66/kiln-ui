import { DialogRef } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';

@Component({
  selector: 'kn-modal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="kn-modal" role="dialog" [attr.aria-label]="ariaLabel() || null">
      <span class="kn-modal__motif kn-modal__motif--tl" aria-hidden="true">❖</span>
      <span class="kn-modal__motif kn-modal__motif--tr" aria-hidden="true">❖</span>
      <span class="kn-modal__motif kn-modal__motif--bl" aria-hidden="true">❖</span>
      <span class="kn-modal__motif kn-modal__motif--br" aria-hidden="true">❖</span>

      @if (title() || closable()) {
        <header class="kn-modal__header">
          <h2 class="kn-modal__title">{{ title() }}</h2>
          @if (closable()) {
            <button type="button" class="kn-modal__close" aria-label="Close" (click)="close()">×</button>
          }
        </header>
      }

      <div class="kn-modal__body">
        <ng-content />
      </div>

      <ng-content select="kn-modal-footer" />
    </div>
  `,
  styles: [`
    :host { display: block; font-family: var(--kn-font-sans); }

    .kn-modal {
      position: relative;
      background: var(--kn-bg);
      color: var(--kn-text);
      border: var(--kn-bw-2) solid var(--kn-border-strong);
      border-radius: var(--kn-r-sm);
      box-shadow: var(--kn-shadow-stamp-strong);
      animation: kn-modal-in 180ms cubic-bezier(0.2, 0.7, 0.2, 1);
    }

    @keyframes kn-modal-in {
      from { opacity: 0; transform: translateY(8px) scale(0.98); }
      to   { opacity: 1; transform: translateY(0)   scale(1); }
    }

    .kn-modal__motif {
      position: absolute;
      width: 12px; height: 12px;
      color: var(--kn-brand);
      font-size: 14px; line-height: 1;
      pointer-events: none;
    }

    .kn-modal__motif--tl { top: -6px; left: -6px; }
    .kn-modal__motif--tr { top: -6px; right: -6px; }
    .kn-modal__motif--bl { bottom: -6px; left: -6px; }
    .kn-modal__motif--br { bottom: -6px; right: -6px; }

    .kn-modal__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--kn-sp-4) var(--kn-sp-6);
      border-bottom: var(--kn-bw-1) solid var(--kn-border);
    }

    .kn-modal__title {
      margin: 0;
      font-family: var(--kn-font-display);
      font-size: var(--kn-fs-xl);
      font-weight: var(--kn-fw-bold);
      letter-spacing: var(--kn-tracking-tight);
    }

    .kn-modal__close {
      all: unset;
      cursor: pointer;
      font-size: 22px;
      line-height: 1;
      color: var(--kn-text-muted);
      padding: 0 var(--kn-sp-2);
      border-radius: var(--kn-r-xs);
      transition: color var(--kn-dur-fast) var(--kn-ease);

      &:hover { color: var(--kn-text); }
      &:focus-visible { box-shadow: var(--kn-ring); }
    }

    .kn-modal__body {
      padding: var(--kn-sp-6);
      font-size: var(--kn-fs-base);
      line-height: var(--kn-lh-normal);
    }

    ::ng-deep kn-modal-footer {
      display: flex;
      justify-content: flex-end;
      gap: var(--kn-sp-3);
      padding: var(--kn-sp-4) var(--kn-sp-6);
      border-top: var(--kn-bw-1) solid var(--kn-border);
      background: var(--kn-surface);
    }
  `],
})
export class KnModalComponent {
  private readonly dialogRef = inject(DialogRef, { optional: true });

  readonly title = input<string>('');
  readonly closable = input<boolean>(true);
  readonly ariaLabel = input<string>('');

  close(): void {
    this.dialogRef?.close();
  }
}

@Component({
  selector: 'kn-modal-footer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-content />`,
})
export class KnModalFooterComponent {}
