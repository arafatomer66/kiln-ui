import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  inject,
  input,
  signal,
} from '@angular/core';

@Component({
  selector: 'kn-accordion-item',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="kn-acc-item" [attr.data-open]="isOpen() ? 'true' : null">
      <button
        type="button"
        class="kn-acc-item__trigger"
        [attr.aria-expanded]="isOpen()"
        [attr.aria-controls]="panelId"
        [id]="triggerId"
        (click)="toggle()"
      >
        <span class="kn-acc-item__heading">{{ heading() }}</span>
        <span class="kn-acc-item__caret" aria-hidden="true">{{ isOpen() ? '−' : '+' }}</span>
      </button>
      @if (isOpen()) {
        <div
          class="kn-acc-item__panel"
          role="region"
          [id]="panelId"
          [attr.aria-labelledby]="triggerId"
        >
          <ng-content />
        </div>
      }
    </div>
  `,
  styles: [`
    :host { display: block; font-family: var(--kn-font-sans); }

    .kn-acc-item {
      border-bottom: var(--kn-bw-1) solid var(--kn-border);
    }

    .kn-acc-item__trigger {
      all: unset;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: var(--kn-sp-4) 0;
      cursor: pointer;
      color: var(--kn-text);

      &:focus-visible { box-shadow: var(--kn-ring); border-radius: var(--kn-r-xs); }
    }

    .kn-acc-item__heading {
      font-size: var(--kn-fs-md);
      font-weight: var(--kn-fw-semibold);
    }

    .kn-acc-item__caret {
      color: var(--kn-text-muted);
      font-size: 18px;
      line-height: 1;
      margin-left: var(--kn-sp-3);
    }

    .kn-acc-item__panel {
      padding: 0 0 var(--kn-sp-5);
      color: var(--kn-text-muted);
      font-size: var(--kn-fs-base);
      line-height: var(--kn-lh-normal);
      animation: kn-acc-in 200ms cubic-bezier(0.2, 0.7, 0.2, 1);
    }

    @keyframes kn-acc-in {
      from { opacity: 0; transform: translateY(-4px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  `],
})
export class KnAccordionItemComponent {
  readonly heading = input<string>('');
  readonly disabled = input<boolean>(false);

  readonly id = `kn-acc-${Math.random().toString(36).slice(2, 9)}`;
  readonly triggerId = `${this.id}-trigger`;
  readonly panelId = `${this.id}-panel`;

  private readonly group = inject(KnAccordionComponent, { optional: true });

  readonly isOpen = computed(() => this.group?.isOpen(this) ?? false);

  protected toggle(): void {
    if (this.disabled()) return;
    this.group?.toggle(this);
  }
}

@Component({
  selector: 'kn-accordion',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-content />`,
  styles: [`
    :host { display: block; }
  `],
})
export class KnAccordionComponent {
  readonly multiple = input<boolean>(false);

  readonly items = contentChildren(KnAccordionItemComponent);
  private readonly openItems = signal<Set<KnAccordionItemComponent>>(new Set());

  isOpen(item: KnAccordionItemComponent): boolean {
    return this.openItems().has(item);
  }

  toggle(item: KnAccordionItemComponent): void {
    const next = new Set(this.openItems());
    if (next.has(item)) {
      next.delete(item);
    } else {
      if (!this.multiple()) next.clear();
      next.add(item);
    }
    this.openItems.set(next);
  }
}
