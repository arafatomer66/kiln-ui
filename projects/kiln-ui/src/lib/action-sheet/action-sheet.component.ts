import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

export interface KnActionItem {
  readonly id: string;
  readonly label: string;
  readonly icon?: string;
  readonly description?: string;
  readonly tone?: 'neutral' | 'danger';
  readonly disabled?: boolean;
}

export interface KnActionSheetData {
  title?: string;
  items: KnActionItem[];
}

@Component({
  selector: 'kn-action-sheet',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="kn-as" role="dialog" [attr.aria-label]="data.title || 'Actions'">
      <div class="kn-as__handle" aria-hidden="true"></div>
      @if (data.title) {
        <div class="kn-as__title">{{ data.title }}</div>
      }
      <ul class="kn-as__list" role="menu">
        @for (item of data.items; track item.id) {
          <li>
            <button
              type="button"
              class="kn-as__item"
              role="menuitem"
              [disabled]="item.disabled"
              [attr.data-tone]="item.tone ?? 'neutral'"
              (click)="select(item)"
            >
              @if (item.icon) {
                <span class="kn-as__icon" aria-hidden="true">{{ item.icon }}</span>
              }
              <span class="kn-as__label">
                <span class="kn-as__label-main">{{ item.label }}</span>
                @if (item.description) {
                  <span class="kn-as__label-desc">{{ item.description }}</span>
                }
              </span>
            </button>
          </li>
        }
      </ul>
      <button type="button" class="kn-as__cancel" (click)="cancel()">Cancel</button>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: var(--kn-font-sans); }

    .kn-as {
      background: var(--kn-bg);
      color: var(--kn-text);
      border-top: var(--kn-bw-2) solid var(--kn-border-strong);
      border-radius: var(--kn-r-lg) var(--kn-r-lg) 0 0;
      box-shadow: 0 -8px 32px rgba(42, 36, 24, 0.18);
      animation: kn-as-in 280ms cubic-bezier(0.2, 0.7, 0.2, 1);
      padding-bottom: var(--kn-sp-3);
    }

    @keyframes kn-as-in {
      from { transform: translateY(100%); }
      to   { transform: translateY(0); }
    }

    .kn-as__handle {
      width: 40px;
      height: 4px;
      background: var(--kn-jute-300);
      border-radius: var(--kn-r-pill);
      margin: var(--kn-sp-2) auto var(--kn-sp-3);
    }

    .kn-as__title {
      font-family: var(--kn-font-mono);
      font-size: var(--kn-fs-xs);
      font-weight: var(--kn-fw-bold);
      letter-spacing: var(--kn-tracking-mono);
      text-transform: uppercase;
      color: var(--kn-text-muted);
      padding: var(--kn-sp-2) var(--kn-sp-5);
    }

    .kn-as__list {
      list-style: none;
      margin: 0;
      padding: 0 var(--kn-sp-3);
    }

    .kn-as__item {
      all: unset;
      box-sizing: border-box;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: var(--kn-sp-3);
      width: 100%;
      padding: var(--kn-sp-3);
      border-radius: var(--kn-r-sm);
      color: var(--kn-text);
      transition: background var(--kn-dur-fast) var(--kn-ease);
    }
    .kn-as__item:hover { background: var(--kn-surface); }
    .kn-as__item:focus-visible { box-shadow: var(--kn-ring); }
    .kn-as__item[disabled] { opacity: 0.5; cursor: not-allowed; }
    .kn-as__item[data-tone='danger'] { color: var(--kn-danger); }

    .kn-as__icon {
      width: 24px;
      text-align: center;
      font-size: 16px;
      color: var(--kn-text-muted);
      flex-shrink: 0;
    }
    .kn-as__item[data-tone='danger'] .kn-as__icon { color: var(--kn-danger); }

    .kn-as__label { display: flex; flex-direction: column; gap: 2px; }
    .kn-as__label-main { font-size: var(--kn-fs-base); font-weight: var(--kn-fw-medium); }
    .kn-as__label-desc { font-size: var(--kn-fs-xs); color: var(--kn-text-muted); }

    .kn-as__cancel {
      all: unset;
      cursor: pointer;
      box-sizing: border-box;
      display: block;
      margin: var(--kn-sp-3) var(--kn-sp-3) 0;
      padding: var(--kn-sp-3);
      width: calc(100% - var(--kn-sp-6));
      text-align: center;
      font-family: var(--kn-font-mono);
      font-size: var(--kn-fs-xs);
      font-weight: var(--kn-fw-bold);
      letter-spacing: var(--kn-tracking-mono);
      text-transform: uppercase;
      color: var(--kn-text-muted);
      background: var(--kn-surface);
      border: var(--kn-bw-1) solid var(--kn-border);
      border-radius: var(--kn-r-sm);
    }
    .kn-as__cancel:hover { color: var(--kn-text); }
  `],
})
export class KnActionSheetComponent {
  protected readonly data = inject<KnActionSheetData>(DIALOG_DATA);
  private readonly dialogRef = inject<DialogRef<KnActionItem | null>>(DialogRef);

  protected select(item: KnActionItem): void {
    if (item.disabled) return;
    this.dialogRef.close(item);
  }

  protected cancel(): void { this.dialogRef.close(null); }
}
