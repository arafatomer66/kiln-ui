import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';

export interface KnColumn<T = Record<string, unknown>> {
  readonly key: string;
  readonly header: string;
  readonly sortable?: boolean;
  readonly width?: string;
  readonly align?: 'left' | 'center' | 'right';
  readonly cell?: (row: T) => string | number | null | undefined;
}

export type KnSortDir = 'asc' | 'desc' | null;
export interface KnSortState { key: string | null; dir: KnSortDir; }

@Component({
  selector: 'kn-table',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="kn-table__wrap">
      <table class="kn-table">
        <thead>
          <tr>
            @for (col of columns(); track col.key) {
              <th
                [style.width]="col.width"
                [class.is-sortable]="col.sortable"
                [attr.aria-sort]="col.key === sort().key ? (sort().dir === 'asc' ? 'ascending' : 'descending') : null"
                [attr.data-align]="col.align ?? 'left'"
                (click)="onHeaderClick(col)"
              >
                {{ col.header }}
                @if (col.sortable && col.key === sort().key) {
                  <span class="kn-table__sort" aria-hidden="true">{{ sort().dir === 'asc' ? '↑' : '↓' }}</span>
                }
              </th>
            }
          </tr>
        </thead>
        <tbody>
          @for (row of sorted(); track $index) {
            <tr>
              @for (col of columns(); track col.key) {
                <td [attr.data-align]="col.align ?? 'left'">
                  {{ col.cell ? col.cell(row) : (row[col.key] ?? '—') }}
                </td>
              }
            </tr>
          } @empty {
            <tr class="kn-table__empty">
              <td [attr.colspan]="columns().length">{{ emptyText() }}</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: var(--kn-font-sans); }

    .kn-table__wrap {
      overflow-x: auto;
      border: var(--kn-bw-2) solid var(--kn-border-strong);
      border-radius: var(--kn-r-sm);
      box-shadow: var(--kn-shadow-stamp);
    }

    .kn-table {
      width: 100%;
      border-collapse: collapse;
      font-size: var(--kn-fs-base);
      color: var(--kn-text);
      background: var(--kn-bg);
    }

    .kn-table th, .kn-table td {
      padding: var(--kn-sp-3) var(--kn-sp-4);
      text-align: left;
      border-bottom: var(--kn-bw-1) solid var(--kn-border);
    }

    .kn-table th[data-align='center'], .kn-table td[data-align='center'] { text-align: center; }
    .kn-table th[data-align='right'],  .kn-table td[data-align='right']  { text-align: right; }

    .kn-table th {
      font-family: var(--kn-font-mono);
      font-size: var(--kn-fs-xs);
      font-weight: var(--kn-fw-bold);
      letter-spacing: var(--kn-tracking-mono);
      text-transform: uppercase;
      color: var(--kn-text-muted);
      background: var(--kn-surface);
      user-select: none;
    }

    .kn-table th.is-sortable { cursor: pointer; }
    .kn-table th.is-sortable:hover { color: var(--kn-text); }

    .kn-table__sort { margin-left: var(--kn-sp-1); color: var(--kn-brand); }

    .kn-table tbody tr:last-child td { border-bottom: none; }
    .kn-table tbody tr:hover { background: var(--kn-surface); }

    .kn-table__empty td {
      text-align: center;
      color: var(--kn-text-muted);
      padding: var(--kn-sp-7);
      font-style: italic;
    }
  `],
})
export class KnTableComponent<T extends Record<string, unknown> = Record<string, unknown>> {
  readonly columns = input<KnColumn<T>[]>([]);
  readonly rows = input<T[]>([]);
  readonly emptyText = input<string>('No data to display.');

  readonly sortChange = output<KnSortState>();

  readonly sort = signal<KnSortState>({ key: null, dir: null });

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
    if (current.key !== col.key) {
      next = { key: col.key, dir: 'asc' };
    } else if (current.dir === 'asc') {
      next = { key: col.key, dir: 'desc' };
    } else {
      next = { key: null, dir: null };
    }
    this.sort.set(next);
    this.sortChange.emit(next);
  }
}
