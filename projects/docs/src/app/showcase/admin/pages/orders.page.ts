import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { FormsModule } from '@angular/forms';
import {
  KnAlertComponent, KnBadgeComponent, KnButtonComponent, KnCardComponent,
  KnDividerComponent, KnDrawerComponent, KnDrawerFooterComponent, KnDrawerService,
  KnInputComponent, KnPaginationComponent, KnSelectComponent, KnSelectOption,
  KnTableComponent, KnColumn, KnToastService,
} from 'kiln-ui';
import { MOCK_ORDERS, ORDER_STATUS_TONE, Order } from '../mock-data';

@Component({
  standalone: true,
  imports: [KnDrawerComponent, KnDrawerFooterComponent, KnButtonComponent, KnBadgeComponent, KnDividerComponent],
  template: `
    <kn-drawer [title]="'Order ' + order.id">
      <div class="detail">
        <div class="detail__row">
          <span>Customer</span>
          <strong>{{ order.customer }} · {{ order.customerBn }}</strong>
        </div>
        <div class="detail__row">
          <span>Area</span>
          <strong>{{ order.area }}</strong>
        </div>
        <div class="detail__row">
          <span>Date</span>
          <strong>{{ order.date }}</strong>
        </div>
        <div class="detail__row">
          <span>Items</span>
          <strong>{{ order.items }}</strong>
        </div>
        <kn-divider />
        <div class="detail__row">
          <span>Total</span>
          <strong class="detail__total">৳{{ order.total.toLocaleString('en-IN') }}</strong>
        </div>
        <div class="detail__row">
          <span>Status</span>
          <kn-badge variant="solid" [tone]="status.tone">{{ status.label }}</kn-badge>
        </div>
      </div>
      <kn-drawer-footer>
        <kn-button variant="outline" size="sm" (clicked)="close()">Close</kn-button>
        <kn-button variant="solid" size="sm">Print invoice</kn-button>
      </kn-drawer-footer>
    </kn-drawer>
  `,
  styles: [`
    .detail { display: flex; flex-direction: column; gap: var(--kn-sp-3); }
    .detail__row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: var(--kn-fs-sm);
      color: var(--kn-text-muted);
    }
    .detail__row strong { color: var(--kn-text); }
    .detail__total { font-family: var(--kn-font-display); font-size: var(--kn-fs-xl); }
  `],
})
class OrderDetailDrawer {
  protected readonly order = inject<Order>(DIALOG_DATA);
  private readonly dialogRef = inject<DialogRef<void>>(DialogRef);
  protected get status() { return ORDER_STATUS_TONE[this.order.status]; }
  protected close(): void { this.dialogRef.close(); }
}

const STATUS_FILTER_OPTIONS: KnSelectOption<string>[] = [
  { value: '',          label: 'All statuses' },
  { value: 'pending',   label: 'Pending' },
  { value: 'paid',      label: 'Paid' },
  { value: 'shipped',   label: 'Shipped' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'cancelled', label: 'Cancelled' },
];

const PAGE_SIZE = 6;

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    KnCardComponent, KnButtonComponent, KnInputComponent,
    KnSelectComponent, KnTableComponent, KnPaginationComponent, KnAlertComponent,
  ],
  template: `
    <header class="page-head">
      <div>
        <div class="page-head__eyebrow">ORDERS · অর্ডার</div>
        <h1 class="page-head__title">Orders</h1>
        <p class="page-head__sub">{{ filtered().length }} matching orders this month.</p>
      </div>
      <div class="page-head__cta">
        <kn-button variant="outline">Export CSV</kn-button>
        <kn-button variant="solid">+ New order</kn-button>
      </div>
    </header>

    <kn-alert tone="info" title="Live data" [closable]="true">
      Orders are mocked locally. In production this view would stream updates via Server-Sent Events.
    </kn-alert>

    <kn-card padding="md" class="stack">
      <div class="filters">
        <kn-input
          label="Search"
          placeholder="Order ID, customer, area…"
          [(ngModel)]="searchTerm"
        />
        <kn-select
          label="Status"
          [options]="statusOptions"
          [(ngModel)]="statusFilter"
        />
      </div>

      <kn-table [columns]="columns" [rows]="paged()" />

      <footer class="page-foot">
        <span class="page-foot__count">
          Showing {{ paged().length }} of {{ filtered().length }} orders
        </span>
        <kn-pagination
          [page]="page()"
          [total]="totalPages()"
          (pageChange)="page.set($event)"
        />
      </footer>
    </kn-card>
  `,
  styles: [`
    :host { display: block; color: var(--kn-text); font-family: var(--kn-font-sans); }

    .page-head {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: var(--kn-sp-4);
      margin-bottom: var(--kn-sp-5);
    }

    .page-head__eyebrow {
      font-family: var(--kn-font-mono);
      font-size: var(--kn-fs-xs);
      font-weight: var(--kn-fw-bold);
      letter-spacing: var(--kn-tracking-mono);
      text-transform: uppercase;
      color: var(--kn-brand);
      margin-bottom: var(--kn-sp-2);
    }
    .page-head__title { font-family: var(--kn-font-display); font-size: var(--kn-fs-3xl); font-weight: var(--kn-fw-bold); margin: 0; }
    .page-head__sub { color: var(--kn-text-muted); margin: 4px 0 0; }
    .page-head__cta { display: flex; gap: var(--kn-sp-2); }

    .stack > * + * { margin-top: var(--kn-sp-4); }

    .filters {
      display: grid;
      grid-template-columns: 1fr 220px;
      gap: var(--kn-sp-4);
    }
    @media (max-width: 720px) { .filters { grid-template-columns: 1fr; } }

    .page-foot {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--kn-sp-3);
      flex-wrap: wrap;
    }
    .page-foot__count { font-size: var(--kn-fs-sm); color: var(--kn-text-muted); }
  `],
})
export class OrdersPage {
  private readonly drawer = inject(KnDrawerService);
  private readonly toast = inject(KnToastService);

  protected readonly searchTerm = signal('');
  protected readonly statusFilter = signal<string>('');
  protected readonly page = signal(1);

  protected readonly statusOptions = STATUS_FILTER_OPTIONS;

  protected readonly filtered = computed<Order[]>(() => {
    const term = this.searchTerm().toLowerCase().trim();
    const status = this.statusFilter();
    return MOCK_ORDERS.filter((o) => {
      if (status && o.status !== status) return false;
      if (!term) return true;
      return (
        o.id.toLowerCase().includes(term) ||
        o.customer.toLowerCase().includes(term) ||
        o.area.toLowerCase().includes(term)
      );
    });
  });

  protected readonly totalPages = computed(() => Math.max(1, Math.ceil(this.filtered().length / PAGE_SIZE)));

  protected readonly paged = computed<Order[]>(() => {
    const start = (this.page() - 1) * PAGE_SIZE;
    return this.filtered().slice(start, start + PAGE_SIZE);
  });

  protected readonly columns: KnColumn<Order>[] = [
    { key: 'id', header: 'Order', sortable: true },
    { key: 'customer', header: 'Customer', sortable: true,
      cell: (r) => `${r.customer} · ${r.customerBn}` },
    { key: 'area', header: 'Area' },
    { key: 'date', header: 'Date', sortable: true },
    { key: 'items', header: 'Items', align: 'right' },
    { key: 'total', header: 'Total', align: 'right', sortable: true,
      cell: (r) => `৳${r.total.toLocaleString('en-IN')}` },
    { key: 'status', header: 'Status', align: 'right',
      cell: (r) => ORDER_STATUS_TONE[r.status].label },
    { key: 'actions', header: '', align: 'right', cell: () => 'View →' },
  ];

  protected openDetail(order: Order): void {
    this.drawer.open(OrderDetailDrawer, { side: 'right', size: 'sm', data: order });
  }
}
