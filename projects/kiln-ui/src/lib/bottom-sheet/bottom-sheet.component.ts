import { DialogRef } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';

@Component({
  selector: 'kn-bottom-sheet',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="kn-bs" role="dialog" [attr.aria-label]="ariaLabel() || null">
      <div class="kn-bs__handle" aria-hidden="true"></div>

      @if (title()) {
        <header class="kn-bs__head">
          <h2 class="kn-bs__title">{{ title() }}</h2>
          @if (closable()) {
            <button type="button" class="kn-bs__close" aria-label="Close" (click)="close()">×</button>
          }
        </header>
      }

      <div class="kn-bs__body">
        <ng-content />
      </div>

      <ng-content select="kn-bottom-sheet-footer" />
    </div>
  `,
  styles: [`
    :host {
      display: block;
      font-family: var(--kn-font-sans);
    }

    .kn-bs {
      background: var(--kn-bg);
      color: var(--kn-text);
      border-top: var(--kn-bw-2) solid var(--kn-border-strong);
      border-radius: var(--kn-r-lg) var(--kn-r-lg) 0 0;
      box-shadow: 0 -8px 32px rgba(42, 36, 24, 0.18);
      animation: kn-bs-in 280ms cubic-bezier(0.2, 0.7, 0.2, 1);
      max-height: 92vh;
      display: flex;
      flex-direction: column;
    }

    @keyframes kn-bs-in {
      from { transform: translateY(100%); }
      to   { transform: translateY(0); }
    }

    .kn-bs__handle {
      width: 40px;
      height: 4px;
      background: var(--kn-jute-300);
      border-radius: var(--kn-r-pill);
      margin: var(--kn-sp-2) auto 0;
    }

    .kn-bs__head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--kn-sp-3) var(--kn-sp-5);
      border-bottom: var(--kn-bw-1) solid var(--kn-border);
    }

    .kn-bs__title {
      margin: 0;
      font-family: var(--kn-font-display);
      font-size: var(--kn-fs-lg);
      font-weight: var(--kn-fw-bold);
    }

    .kn-bs__close {
      all: unset;
      cursor: pointer;
      font-size: 22px;
      line-height: 1;
      color: var(--kn-text-muted);
      padding: 0 var(--kn-sp-2);
      border-radius: var(--kn-r-xs);
    }
    .kn-bs__close:hover { color: var(--kn-text); }
    .kn-bs__close:focus-visible { box-shadow: var(--kn-ring); }

    .kn-bs__body {
      padding: var(--kn-sp-5);
      overflow-y: auto;
      flex: 1;
    }

    ::ng-deep kn-bottom-sheet-footer {
      display: flex;
      gap: var(--kn-sp-3);
      padding: var(--kn-sp-4) var(--kn-sp-5);
      border-top: var(--kn-bw-1) solid var(--kn-border);
      background: var(--kn-surface);
    }
  `],
})
export class KnBottomSheetComponent {
  private readonly dialogRef = inject(DialogRef, { optional: true });

  readonly title = input<string>('');
  readonly closable = input<boolean>(true);
  readonly ariaLabel = input<string>('');

  close(): void { this.dialogRef?.close(); }
}

@Component({
  selector: 'kn-bottom-sheet-footer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-content />`,
})
export class KnBottomSheetFooterComponent {}
