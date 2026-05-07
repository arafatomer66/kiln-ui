import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

export type KnAlertTone = 'info' | 'success' | 'warn' | 'danger';

@Component({
  selector: 'kn-alert',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="kn-alert" [attr.role]="role()">
      <span class="kn-alert__motif kn-alert__motif--tl" aria-hidden="true">❖</span>
      <span class="kn-alert__motif kn-alert__motif--tr" aria-hidden="true">❖</span>

      <span class="kn-alert__bar" aria-hidden="true"></span>

      <span class="kn-alert__icon" aria-hidden="true">{{ glyph() }}</span>

      <div class="kn-alert__body">
        @if (title()) {
          <div class="kn-alert__title">{{ title() }}</div>
        }
        <div class="kn-alert__message">
          <ng-content />
        </div>
      </div>

      @if (closable()) {
        <button
          type="button"
          class="kn-alert__close"
          [attr.aria-label]="closeLabel()"
          (click)="onClose()"
        >×</button>
      }
    </div>
  `,
  styles: [`
    :host { display: block; font-family: var(--kn-font-sans); position: relative; }

    .kn-alert {
      position: relative;
      display: flex;
      align-items: flex-start;
      gap: var(--kn-sp-3);
      padding: var(--kn-sp-3) var(--kn-sp-4);
      background: var(--kn-surface);
      border: var(--kn-bw-2) solid var(--kn-border-strong);
      border-radius: var(--kn-r-sm);
      box-shadow: var(--kn-shadow-stamp);
      color: var(--kn-text);
    }

    .kn-alert__motif {
      position: absolute;
      width: 12px;
      height: 12px;
      color: var(--kn-brand);
      font-size: 14px;
      line-height: 1;
      pointer-events: none;
    }

    .kn-alert__motif--tl { top: -6px; left: -6px; }
    .kn-alert__motif--tr { top: -6px; right: -6px; }

    .kn-alert__bar {
      position: absolute;
      left: 0; top: 0; bottom: 0;
      width: 6px;
    }

    :host([data-tone='info'])    .kn-alert__bar  { background: var(--kn-info); }
    :host([data-tone='success']) .kn-alert__bar  { background: var(--kn-success); }
    :host([data-tone='warn'])    .kn-alert__bar  { background: var(--kn-warn); }
    :host([data-tone='danger'])  .kn-alert__bar  { background: var(--kn-danger); }

    .kn-alert__icon {
      font-size: 16px;
      line-height: 1.4;
    }

    :host([data-tone='info'])    .kn-alert__icon { color: var(--kn-info); }
    :host([data-tone='success']) .kn-alert__icon { color: var(--kn-success); }
    :host([data-tone='warn'])    .kn-alert__icon { color: var(--kn-marigold-700); }
    :host([data-tone='danger'])  .kn-alert__icon { color: var(--kn-danger); }

    .kn-alert__body {
      flex: 1;
      min-width: 0;
    }

    .kn-alert__title {
      font-size: var(--kn-fs-base);
      font-weight: var(--kn-fw-bold);
      margin-bottom: 2px;
    }

    .kn-alert__message {
      font-size: var(--kn-fs-sm);
      color: var(--kn-text-muted);
      line-height: var(--kn-lh-normal);
    }

    .kn-alert__close {
      all: unset;
      cursor: pointer;
      font-size: 18px;
      line-height: 1;
      color: var(--kn-text-muted);
      padding: 0 var(--kn-sp-1);
      border-radius: var(--kn-r-xs);
      transition: color var(--kn-dur-fast) var(--kn-ease);

      &:hover { color: var(--kn-text); }
      &:focus-visible { box-shadow: var(--kn-ring); }
    }
  `],
  host: {
    '[attr.data-tone]': 'tone()',
  },
})
export class KnAlertComponent {
  readonly tone = input<KnAlertTone>('info');
  readonly title = input<string>('');
  readonly closable = input<boolean>(false);
  readonly closeLabel = input<string>('Dismiss');

  readonly closed = output<void>();

  readonly role = computed(() =>
    this.tone() === 'danger' || this.tone() === 'warn' ? 'alert' : 'status'
  );

  readonly glyph = computed(() => {
    switch (this.tone()) {
      case 'success': return '✓';
      case 'warn': return '⚠';
      case 'danger': return '✕';
      default: return 'ⓘ';
    }
  });

  protected onClose(): void { this.closed.emit(); }
}
