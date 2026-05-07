import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'kn-chip',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="kn-chip">
      <ng-content />
      @if (removable()) {
        <button
          type="button"
          class="kn-chip__remove"
          [attr.aria-label]="removeLabel()"
          (click)="onRemove($event)"
        >×</button>
      }
    </span>
  `,
  styles: [`
    :host { display: inline-flex; vertical-align: middle; }

    .kn-chip {
      display: inline-flex;
      align-items: center;
      gap: var(--kn-sp-2);
      font-family: var(--kn-font-sans);
      font-size: var(--kn-fs-sm);
      color: var(--kn-text);
      background: var(--kn-surface);
      border: var(--kn-bw-2) solid var(--kn-border-strong);
      border-radius: var(--kn-r-sm);
      padding: 4px var(--kn-sp-3);
      white-space: nowrap;
    }

    :host([data-variant='soft']) .kn-chip {
      background: var(--kn-surface-alt);
      border-width: var(--kn-bw-1);
      border-color: var(--kn-border);
    }

    .kn-chip__remove {
      all: unset;
      cursor: pointer;
      font-size: 16px;
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
    '[attr.data-variant]': 'variant()',
  },
})
export class KnChipComponent {
  readonly variant = input<'solid' | 'soft'>('solid');
  readonly removable = input<boolean>(false);
  readonly removeLabel = input<string>('Remove');

  readonly removed = output<void>();

  protected onRemove(event: MouseEvent): void {
    event.stopPropagation();
    this.removed.emit();
  }
}
