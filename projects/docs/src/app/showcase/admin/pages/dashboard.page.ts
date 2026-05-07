import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  KnAvatarComponent,
  KnBadgeComponent,
  KnButtonComponent,
  KnCardComponent,
  KnDateRangePickerComponent,
  KnDividerComponent,
  KnProgressComponent,
  KnSkeletonComponent,
  KnTableComponent,
  KnColumn,
} from 'kiln-ui';
import { MOCK_ACTIVITY, MOCK_ORDERS, ORDER_STATUS_TONE, Order } from '../mock-data';

interface Stat {
  label: string;
  labelBn: string;
  value: string;
  delta: string;
  trend: 'up' | 'down' | 'flat';
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    KnCardComponent, KnButtonComponent, KnBadgeComponent, KnAvatarComponent,
    KnDividerComponent, KnProgressComponent, KnTableComponent,
    KnDateRangePickerComponent, KnSkeletonComponent,
  ],
  template: `
    <header class="page-head">
      <div>
        <div class="page-head__eyebrow">DASHBOARD · ড্যাশবোর্ড</div>
        <h1 class="page-head__title">Good morning, Omer.</h1>
        <p class="page-head__sub">Here's what's happened on ShareDeal in the last 24 hours.</p>
      </div>
      <div class="page-head__cta">
        <div class="page-head__period">
          <kn-date-range-picker placeholder="Last 30 days" />
        </div>
        <kn-button variant="outline">Export</kn-button>
        <kn-button variant="solid">+ New order</kn-button>
      </div>
    </header>

    <section class="stats">
      @if (loading()) {
        @for (i of [1, 2, 3, 4]; track i) {
          <kn-card padding="md">
            <kn-skeleton variant="text" width="80px" />
            <div style="margin: 8px 0;"><kn-skeleton variant="heading" width="120px" height="32px" /></div>
            <kn-skeleton variant="text" width="100px" />
          </kn-card>
        }
      } @else {
        @for (stat of stats; track stat.label) {
          <kn-card padding="md">
            <div class="stat__label">{{ stat.label }} · {{ stat.labelBn }}</div>
            <div class="stat__value">{{ stat.value }}</div>
            <div class="stat__delta" [attr.data-trend]="stat.trend">
              @if (stat.trend === 'up') { ↑ }
              @if (stat.trend === 'down') { ↓ }
              {{ stat.delta }}
            </div>
          </kn-card>
        }
      }
    </section>

    <section class="row">
      <kn-card padding="md" class="row__main">
        <header class="card-head">
          <div>
            <h2 class="card-head__title">Recent orders</h2>
            <p class="card-head__sub">Last 10 orders across all areas</p>
          </div>
          <kn-button variant="link">View all →</kn-button>
        </header>
        <kn-divider />
        <kn-table [columns]="orderColumns" [rows]="orders" />
      </kn-card>

      <kn-card padding="md" class="row__side">
        <header class="card-head">
          <h2 class="card-head__title">Activity</h2>
          <kn-badge variant="soft" tone="info">Live</kn-badge>
        </header>
        <kn-divider />
        <ul class="activity">
          @for (entry of activity; track $index) {
            <li class="activity__item">
              <kn-avatar size="sm" [name]="entry.who" />
              <div class="activity__body">
                <div class="activity__line">
                  <strong>{{ entry.who }}</strong>
                  <span class="activity__action">{{ entry.action }}</span>
                  <span class="activity__target">{{ entry.target }}</span>
                </div>
                <div class="activity__when">{{ entry.when }}</div>
              </div>
              <kn-badge variant="soft" [tone]="entry.tone === 'info' ? 'neutral' : entry.tone">·</kn-badge>
            </li>
          }
        </ul>
      </kn-card>
    </section>

    <section class="goals">
      <kn-card padding="md">
        <header class="card-head">
          <h2 class="card-head__title">Q2 goals</h2>
          <p class="card-head__sub">Tracking against the May targets</p>
        </header>
        <kn-divider />
        <div class="goals__list">
          <div class="goal">
            <div class="goal__label">
              <span>Orders fulfilled</span>
              <span class="goal__value">2,814 / 4,000</span>
            </div>
            <kn-progress [value]="70" tone="brand" />
          </div>
          <div class="goal">
            <div class="goal__label">
              <span>New customers · নতুন গ্রাহক</span>
              <span class="goal__value">427 / 600</span>
            </div>
            <kn-progress [value]="71" tone="success" />
          </div>
          <div class="goal">
            <div class="goal__label">
              <span>Revenue · আয়</span>
              <span class="goal__value">৳18.4L / ৳25L</span>
            </div>
            <kn-progress [value]="73" tone="accent" />
          </div>
          <div class="goal">
            <div class="goal__label">
              <span>NPS score</span>
              <span class="goal__value">62 / 70</span>
            </div>
            <kn-progress [value]="89" tone="success" />
          </div>
        </div>
      </kn-card>
    </section>
  `,
  styles: [`
    :host { display: block; color: var(--kn-text); font-family: var(--kn-font-sans); }

    .page-head {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: var(--kn-sp-4);
      margin-bottom: var(--kn-sp-7);
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

    .page-head__title {
      font-family: var(--kn-font-display);
      font-size: var(--kn-fs-3xl);
      font-weight: var(--kn-fw-bold);
      margin: 0;
      letter-spacing: var(--kn-tracking-tight);
    }

    .page-head__sub { color: var(--kn-text-muted); margin: 4px 0 0; font-size: var(--kn-fs-base); }
    .page-head__cta { display: flex; gap: var(--kn-sp-2); align-items: flex-end; }
    .page-head__period { width: 220px; }

    .stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: var(--kn-sp-4);
      margin-bottom: var(--kn-sp-6);
    }

    .stat__label {
      font-family: var(--kn-font-mono);
      font-size: var(--kn-fs-xs);
      font-weight: var(--kn-fw-bold);
      letter-spacing: var(--kn-tracking-mono);
      text-transform: uppercase;
      color: var(--kn-text-muted);
      margin-bottom: var(--kn-sp-2);
    }

    .stat__value {
      font-family: var(--kn-font-display);
      font-size: var(--kn-fs-3xl);
      font-weight: var(--kn-fw-bold);
      line-height: 1;
      margin-bottom: var(--kn-sp-1);
    }

    .stat__delta {
      font-family: var(--kn-font-mono);
      font-size: var(--kn-fs-xs);
      letter-spacing: var(--kn-tracking-mono);
    }
    .stat__delta[data-trend='up']   { color: var(--kn-success); }
    .stat__delta[data-trend='down'] { color: var(--kn-danger); }
    .stat__delta[data-trend='flat'] { color: var(--kn-text-muted); }

    .row {
      display: grid;
      grid-template-columns: 1.7fr 1fr;
      gap: var(--kn-sp-5);
      margin-bottom: var(--kn-sp-6);
    }
    @media (max-width: 1100px) { .row { grid-template-columns: 1fr; } }

    .card-head {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: var(--kn-sp-3);
    }
    .card-head__title { font-family: var(--kn-font-display); font-size: var(--kn-fs-lg); font-weight: var(--kn-fw-bold); margin: 0; }
    .card-head__sub { color: var(--kn-text-muted); font-size: var(--kn-fs-sm); margin: 2px 0 0; }

    .activity { list-style: none; margin: 0; padding: 0; }
    .activity__item {
      display: flex;
      align-items: center;
      gap: var(--kn-sp-3);
      padding: var(--kn-sp-3) 0;
      border-bottom: var(--kn-bw-1) solid var(--kn-border);
    }
    .activity__item:last-child { border-bottom: none; }
    .activity__body { flex: 1; min-width: 0; }
    .activity__line { font-size: var(--kn-fs-sm); }
    .activity__action { color: var(--kn-text-muted); margin: 0 4px; }
    .activity__target { font-family: var(--kn-font-mono); font-size: var(--kn-fs-xs); color: var(--kn-brand); }
    .activity__when { font-family: var(--kn-font-mono); font-size: var(--kn-fs-xs); color: var(--kn-text-muted); margin-top: 2px; }

    .goals__list { display: flex; flex-direction: column; gap: var(--kn-sp-4); margin-top: var(--kn-sp-3); }
    .goal__label { display: flex; justify-content: space-between; font-size: var(--kn-fs-sm); margin-bottom: var(--kn-sp-1); }
    .goal__value { font-family: var(--kn-font-mono); color: var(--kn-text-muted); }
  `],
})
export class DashboardPage implements OnInit {
  protected readonly loading = signal(true);

  ngOnInit(): void {
    setTimeout(() => this.loading.set(false), 900);
  }

  protected readonly stats: Stat[] = [
    { label: 'Revenue',    labelBn: 'আয়',         value: '৳1,84,320', delta: '+12.4% vs last week', trend: 'up'   },
    { label: 'Orders',     labelBn: 'অর্ডার',      value: '342',       delta: '+8.1%',                trend: 'up'   },
    { label: 'New customers', labelBn: 'নতুন গ্রাহক', value: '47',     delta: '+24.0%',               trend: 'up'   },
    { label: 'Cancellations', labelBn: 'বাতিল',     value: '6',         delta: '−2.0%',                trend: 'down' },
  ];

  protected readonly orders: Order[] = MOCK_ORDERS.slice(0, 8);
  protected readonly activity = MOCK_ACTIVITY;

  protected readonly orderColumns: KnColumn<Order>[] = [
    { key: 'id', header: 'Order', sortable: true },
    { key: 'customer', header: 'Customer', sortable: true,
      cell: (r) => `${r.customer} · ${r.customerBn}` },
    { key: 'area', header: 'Area' },
    { key: 'total', header: 'Total', align: 'right',
      cell: (r) => `৳${r.total.toLocaleString('en-IN')}` },
    { key: 'status', header: 'Status', align: 'right',
      cell: (r) => ORDER_STATUS_TONE[r.status].label },
  ];
}
