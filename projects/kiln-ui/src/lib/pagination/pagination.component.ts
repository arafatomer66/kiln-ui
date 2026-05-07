import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'kn-pagination',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="kn-pagination" [attr.aria-label]="ariaLabel()">
      <button
        type="button"
        class="kn-pagination__btn"
        [disabled]="page() === 1"
        (click)="goTo(page() - 1)"
        aria-label="Previous page"
      >‹</button>

      @for (entry of pages(); track $index) {
        @if (entry === '…') {
          <span class="kn-pagination__ellipsis">…</span>
        } @else {
          <button
            type="button"
            class="kn-pagination__btn"
            [class.is-active]="entry === page()"
            [attr.aria-current]="entry === page() ? 'page' : null"
            (click)="goTo(+entry)"
          >{{ entry }}</button>
        }
      }

      <button
        type="button"
        class="kn-pagination__btn"
        [disabled]="page() === total()"
        (click)="goTo(page() + 1)"
        aria-label="Next page"
      >›</button>
    </nav>
  `,
  styles: [`
    :host { display: block; font-family: var(--kn-font-sans); }

    .kn-pagination {
      display: inline-flex;
      gap: var(--kn-sp-1);
      align-items: center;
    }

    .kn-pagination__btn {
      all: unset;
      cursor: pointer;
      min-width: 32px;
      height: 32px;
      padding: 0 var(--kn-sp-2);
      box-sizing: border-box;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-family: var(--kn-font-mono);
      font-size: var(--kn-fs-sm);
      font-weight: var(--kn-fw-semibold);
      color: var(--kn-text);
      background: var(--kn-bg);
      border: var(--kn-bw-1) solid var(--kn-border);
      border-radius: var(--kn-r-xs);
      transition: background var(--kn-dur-fast) var(--kn-ease);

      &:hover { background: var(--kn-surface); }
      &:focus-visible { box-shadow: var(--kn-ring); }
      &[disabled] { opacity: 0.4; cursor: not-allowed; }
      &.is-active {
        background: var(--kn-brand);
        color: var(--kn-text-inverse);
        border-color: var(--kn-brand);
      }
    }

    .kn-pagination__ellipsis {
      padding: 0 var(--kn-sp-1);
      color: var(--kn-text-muted);
    }
  `],
})
export class KnPaginationComponent {
  readonly page = input<number>(1);
  readonly total = input<number>(1);
  readonly siblingCount = input<number>(1);
  readonly ariaLabel = input<string>('Pagination');

  readonly pageChange = output<number>();

  readonly pages = computed<(number | '…')[]>(() => {
    const total = this.total();
    const current = this.page();
    const siblings = this.siblingCount();

    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const left = Math.max(2, current - siblings);
    const right = Math.min(total - 1, current + siblings);

    const result: (number | '…')[] = [1];
    if (left > 2) result.push('…');
    for (let i = left; i <= right; i++) result.push(i);
    if (right < total - 1) result.push('…');
    result.push(total);
    return result;
  });

  protected goTo(target: number): void {
    if (target < 1 || target > this.total()) return;
    if (target === this.page()) return;
    this.pageChange.emit(target);
  }
}
