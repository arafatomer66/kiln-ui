import { ScrollingModule } from '@angular/cdk/scrolling';
import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import type { KnColumn, KnSortDir, KnSortState } from '../table/table.component';

@Component({
  selector: 'kn-virtual-table',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ScrollingModule],
  template: `
    <div class="kn-vt__wrap" [style.height.px]="height()">
      <div class="kn-vt__head" [style.grid-template-columns]="gridColumns()">
        @for (col of columns(); track col.key) {
          <div
            class="kn-vt__th"
            [class.is-sortable]="col.sortable"
            [attr.data-align]="col.align ?? 'left'"
            (click)="onHeaderClick(col)"
          >
            {{ col.header }}
            @if (col.sortable && col.key === sort().key) {
              <span class="kn-vt__sort">{{ sort().dir === 'asc' ? '↑' : '↓' }}</span>
            }
          </div>
        }
      </div>

      <cdk-virtual-scroll-viewport [itemSize]="rowHeight()" class="kn-vt__viewport" [style.height.px]="height() - 44">
        <div
          *cdkVirtualFor="let row of sorted(); let i = index"
          class="kn-vt__row"
          [class.is-zebra]="i % 2 === 1"
          [style.grid-template-columns]="gridColumns()"
          [style.height.px]="rowHeight()"
        >
          @for (col of columns(); track col.key) {
            <div class="kn-vt__td" [attr.data-align]="col.align ?? 'left'">
              {{ col.cell ? col.cell(row) : (row[col.key] ?? '—') }}
            </div>
          }
        </div>
      </cdk-virtual-scroll-viewport>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: var(--kn-font-sans); }

    .kn-vt__wrap {
      border: var(--kn-bw-2) solid var(--kn-border-strong);
      border-radius: var(--kn-r-sm);
      box-shadow: var(--kn-shadow-stamp);
      overflow: hidden;
      background: var(--kn-bg);
    }

    .kn-vt__head {
      display: grid;
      background: var(--kn-surface);
      border-bottom: var(--kn-bw-1) solid var(--kn-border);
      height: 44px;
      align-items: center;
      user-select: none;
    }

    .kn-vt__th {
      padding: 0 var(--kn-sp-4);
      font-family: var(--kn-font-mono);
      font-size: var(--kn-fs-xs);
      font-weight: var(--kn-fw-bold);
      letter-spacing: var(--kn-tracking-mono);
      text-transform: uppercase;
      color: var(--kn-text-muted);
    }
    .kn-vt__th.is-sortable { cursor: pointer; }
    .kn-vt__th.is-sortable:hover { color: var(--kn-text); }
    .kn-vt__th[data-align='right']  { text-align: right; }
    .kn-vt__th[data-align='center'] { text-align: center; }

    .kn-vt__sort { color: var(--kn-brand); margin-left: var(--kn-sp-1); }

    .kn-vt__viewport {
      width: 100%;
    }

    .kn-vt__row {
      display: grid;
      align-items: center;
      border-bottom: var(--kn-bw-1) solid var(--kn-border);
      transition: background var(--kn-dur-fast) var(--kn-ease);
    }
    .kn-vt__row:hover { background: var(--kn-surface); }
    .kn-vt__row.is-zebra { background: var(--kn-jute-50); }
    .kn-vt__row.is-zebra:hover { background: var(--kn-surface-alt); }

    .kn-vt__td {
      padding: 0 var(--kn-sp-4);
      font-size: var(--kn-fs-base);
      color: var(--kn-text);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .kn-vt__td[data-align='right']  { text-align: right; }
    .kn-vt__td[data-align='center'] { text-align: center; }
  `],
})
export class KnVirtualTableComponent<T extends Record<string, unknown> = Record<string, unknown>> {
  readonly columns = input<KnColumn<T>[]>([]);
  readonly rows = input<T[]>([]);
  readonly height = input<number>(480);
  readonly rowHeight = input<number>(48);

  readonly sortChange = output<KnSortState>();

  readonly sort = signal<KnSortState>({ key: null, dir: null });

  readonly gridColumns = computed(() =>
    this.columns().map((c) => c.width ?? 'minmax(0, 1fr)').join(' ')
  );

  readonly sorted = computed(() => {
    const s = this.sort();
    if (!s.key || !s.dir) return this.rows();
    const key = s.key;
    const dir = s.dir === 'asc' ? 1 : -1;
    return [...this.rows()].sort((a, b) => {
      const av = a[key];
      const bv = b[key];
      if (av == null && bv == null) return 0;
      if (av == null) return -1 * dir;
      if (bv == null) return 1 * dir;
      if (av < bv) return -1 * dir;
      if (av > bv) return 1 * dir;
      return 0;
    });
  });

  protected onHeaderClick(col: KnColumn<T>): void {
    if (!col.sortable) return;
    const current = this.sort();
    let next: KnSortState;
    if (current.key !== col.key) next = { key: col.key, dir: 'asc' };
    else if (current.dir === 'asc') next = { key: col.key, dir: 'desc' };
    else next = { key: null, dir: null };
    this.sort.set(next);
    this.sortChange.emit(next);
  }
}
