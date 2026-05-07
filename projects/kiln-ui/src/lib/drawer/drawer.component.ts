import { DialogRef } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';

@Component({
  selector: 'kn-drawer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <aside class="kn-drawer" role="dialog" [attr.aria-label]="ariaLabel() || null">
      @if (title() || closable()) {
        <header class="kn-drawer__header">
          <h2 class="kn-drawer__title">{{ title() }}</h2>
          @if (closable()) {
            <button type="button" class="kn-drawer__close" aria-label="Close" (click)="close()">×</button>
          }
        </header>
      }

      <div class="kn-drawer__body">
        <ng-content />
      </div>

      <ng-content select="kn-drawer-footer" />
    </aside>
  `,
  styles: [`
    :host {
      display: block;
      height: 100%;
      font-family: var(--kn-font-sans);
    }

    .kn-drawer {
      display: flex;
      flex-direction: column;
      height: 100%;
      background: var(--kn-bg);
      color: var(--kn-text);
      border-left: var(--kn-bw-2) solid var(--kn-border-strong);
      box-shadow: -4px 0 0 var(--kn-jute-300);
    }

    .kn-drawer__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--kn-sp-4) var(--kn-sp-6);
      border-bottom: var(--kn-bw-1) solid var(--kn-border);
      flex-shrink: 0;
    }

    .kn-drawer__title {
      margin: 0;
      font-family: var(--kn-font-display);
      font-size: var(--kn-fs-xl);
      font-weight: var(--kn-fw-bold);
    }

    .kn-drawer__close {
      all: unset;
      cursor: pointer;
      font-size: 22px;
      line-height: 1;
      color: var(--kn-text-muted);
      padding: 0 var(--kn-sp-2);
      border-radius: var(--kn-r-xs);

      &:hover { color: var(--kn-text); }
      &:focus-visible { box-shadow: var(--kn-ring); }
    }

    .kn-drawer__body {
      flex: 1;
      padding: var(--kn-sp-6);
      overflow-y: auto;
    }

    ::ng-deep kn-drawer-footer {
      display: flex;
      justify-content: flex-end;
      gap: var(--kn-sp-3);
      padding: var(--kn-sp-4) var(--kn-sp-6);
      border-top: var(--kn-bw-1) solid var(--kn-border);
      background: var(--kn-surface);
      flex-shrink: 0;
    }
  `],
})
export class KnDrawerComponent {
  private readonly dialogRef = inject(DialogRef, { optional: true });

  readonly title = input<string>('');
  readonly closable = input<boolean>(true);
  readonly ariaLabel = input<string>('');

  close(): void { this.dialogRef?.close(); }
}

@Component({
  selector: 'kn-drawer-footer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-content />`,
})
export class KnDrawerFooterComponent {}
