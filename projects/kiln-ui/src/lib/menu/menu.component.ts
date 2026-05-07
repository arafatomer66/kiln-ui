import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'kn-menu-item',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      type="button"
      class="kn-menu-item"
      role="menuitem"
      [disabled]="disabled()"
      [attr.data-tone]="tone()"
      (click)="onClick($event)"
    >
      @if (icon()) {
        <span class="kn-menu-item__icon" aria-hidden="true">{{ icon() }}</span>
      }
      <span class="kn-menu-item__label"><ng-content /></span>
      @if (shortcut()) {
        <span class="kn-menu-item__shortcut">{{ shortcut() }}</span>
      }
    </button>
  `,
  styles: [`
    :host { display: block; }

    .kn-menu-item {
      all: unset;
      display: flex;
      align-items: center;
      gap: var(--kn-sp-3);
      width: 100%;
      padding: var(--kn-sp-2) var(--kn-sp-3);
      box-sizing: border-box;
      cursor: pointer;
      color: var(--kn-text);
      font-size: var(--kn-fs-base);
      border-radius: var(--kn-r-xs);
      transition: background var(--kn-dur-fast) var(--kn-ease);

      &:hover, &:focus-visible { background: var(--kn-surface); outline: none; }
      &[disabled] { opacity: 0.5; cursor: not-allowed; }
    }

    .kn-menu-item[data-tone='danger'] { color: var(--kn-danger); }

    .kn-menu-item__icon {
      width: 16px;
      text-align: center;
      color: var(--kn-text-muted);
    }

    .kn-menu-item__label { flex: 1; }

    .kn-menu-item__shortcut {
      font-family: var(--kn-font-mono);
      font-size: var(--kn-fs-xs);
      color: var(--kn-text-muted);
      letter-spacing: var(--kn-tracking-mono);
    }
  `],
})
export class KnMenuItemComponent {
  readonly disabled = input<boolean>(false);
  readonly icon = input<string>('');
  readonly shortcut = input<string>('');
  readonly tone = input<'neutral' | 'danger'>('neutral');

  readonly action = output<MouseEvent>();

  protected onClick(event: MouseEvent): void {
    if (this.disabled()) {
      event.preventDefault();
      return;
    }
    this.action.emit(event);
  }
}

@Component({
  selector: 'kn-menu-divider',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<hr class="kn-menu-divider" role="separator" />`,
  styles: [`
    .kn-menu-divider {
      border: none;
      border-top: var(--kn-bw-1) solid var(--kn-border);
      margin: var(--kn-sp-1) 0;
    }
  `],
})
export class KnMenuDividerComponent {}

@Component({
  selector: 'kn-menu-label',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="kn-menu-label"><ng-content /></div>`,
  styles: [`
    .kn-menu-label {
      font-family: var(--kn-font-mono);
      font-size: var(--kn-fs-xs);
      font-weight: var(--kn-fw-bold);
      letter-spacing: var(--kn-tracking-mono);
      text-transform: uppercase;
      color: var(--kn-text-muted);
      padding: var(--kn-sp-2) var(--kn-sp-3) var(--kn-sp-1);
    }
  `],
})
export class KnMenuLabelComponent {}
