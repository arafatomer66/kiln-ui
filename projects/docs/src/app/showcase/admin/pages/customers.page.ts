import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { FormsModule } from '@angular/forms';
import {
  KnAvatarComponent, KnBadgeComponent, KnButtonComponent, KnCardComponent,
  KnCheckboxComponent, KnChipComponent, KnDividerComponent, KnEmptyStateComponent,
  KnInputComponent, KnModalComponent, KnModalFooterComponent, KnModalService,
  KnPhoneInputComponent, KnSelectComponent, KnSelectOption,
  KnTabsComponent, KnTabComponent, KnTabContentDirective, KnToastService,
} from 'kiln-ui';
import { Customer, MOCK_CUSTOMERS } from '../mock-data';

@Component({
  standalone: true,
  imports: [
    FormsModule,
    KnModalComponent, KnModalFooterComponent, KnButtonComponent, KnInputComponent,
    KnSelectComponent, KnCheckboxComponent, KnPhoneInputComponent,
  ],
  template: `
    <kn-modal title="Add customer">
      <div class="form">
        <kn-input label="Full name" placeholder="Aisha Rahman" [(ngModel)]="name" />
        <kn-input label="Email" type="email" placeholder="aisha@example.com" [(ngModel)]="email" />
        <kn-phone-input label="Mobile number" defaultCountry="BD" [(ngModel)]="phone" />
        <kn-select label="Area" [options]="areas" [(ngModel)]="area" />
        <kn-checkbox label="Send welcome email" [(ngModel)]="sendEmail" />
      </div>
      <kn-modal-footer>
        <kn-button variant="outline" size="sm" (clicked)="cancel()">Cancel</kn-button>
        <kn-button variant="solid" size="sm" (clicked)="save()">Save customer</kn-button>
      </kn-modal-footer>
    </kn-modal>
  `,
  styles: [`
    .form { display: flex; flex-direction: column; gap: var(--kn-sp-4); }
  `],
})
class AddCustomerModal {
  private readonly dialogRef = inject<DialogRef<{ name: string }>>(DialogRef);

  protected readonly name = signal('');
  protected readonly email = signal('');
  protected readonly phone = signal('');
  protected readonly area = signal<string>('Dhanmondi');
  protected readonly sendEmail = signal(true);

  protected readonly areas: KnSelectOption<string>[] = [
    { value: 'Dhanmondi',   label: 'Dhanmondi' },
    { value: 'Gulshan',     label: 'Gulshan' },
    { value: 'Banani',      label: 'Banani' },
    { value: 'Uttara',      label: 'Uttara' },
    { value: 'Mirpur',      label: 'Mirpur' },
    { value: 'Mohammadpur', label: 'Mohammadpur' },
  ];

  protected save(): void { this.dialogRef.close({ name: this.name() || 'New customer' }); }
  protected cancel(): void { this.dialogRef.close(); }
}

@Component({
  selector: 'app-admin-customers',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    KnCardComponent, KnButtonComponent, KnAvatarComponent, KnBadgeComponent,
    KnChipComponent, KnInputComponent, KnDividerComponent, KnEmptyStateComponent,
    KnTabsComponent, KnTabComponent, KnTabContentDirective,
  ],
  template: `
    <header class="page-head">
      <div>
        <div class="page-head__eyebrow">CUSTOMERS · গ্রাহক</div>
        <h1 class="page-head__title">Customers</h1>
        <p class="page-head__sub">8 active customers · 3 invited · 1 paused</p>
      </div>
      <div class="page-head__cta">
        <kn-button variant="outline">Export</kn-button>
        <kn-button variant="solid" (clicked)="openAdd()">+ Add customer</kn-button>
      </div>
    </header>

    <div class="layout">
      <kn-card padding="md" class="list">
        <kn-input placeholder="Search customers…" [(ngModel)]="search" />
        <div class="filters">
          <kn-chip variant="soft" [removable]="true">Status: Active</kn-chip>
          <kn-chip variant="soft" [removable]="true">Area: Dhanmondi</kn-chip>
        </div>
        <kn-divider />
        @if (filtered().length === 0) {
          <kn-empty-state
            size="sm"
            tone="muted"
            title="No matches"
            [description]="'No customers found for &quot;' + search() + '&quot;.'"
          />
        } @else {
          <ul class="list__items">
            @for (c of filtered(); track c.id) {
              <li
                class="list__item"
                [class.is-selected]="selected()?.id === c.id"
                (click)="selected.set(c)"
              >
                <kn-avatar size="sm" [name]="c.name" />
                <div class="list__body">
                  <div class="list__name">{{ c.name }}</div>
                  <div class="list__meta">{{ c.area }} · {{ c.orders }} orders</div>
                </div>
                <kn-badge variant="soft" [tone]="statusTone(c.status)">{{ c.status }}</kn-badge>
              </li>
            }
          </ul>
        }
      </kn-card>

      @if (selected(); as c) {
        <kn-card padding="md" class="detail">
          <header class="detail__head">
            <kn-avatar size="lg" [name]="c.name" />
            <div>
              <h2 class="detail__name">{{ c.name }}</h2>
              <p class="detail__name-bn">{{ c.nameBn }}</p>
              <div class="detail__meta">
                <span>{{ c.email }}</span>
                <span>·</span>
                <span>{{ c.phone }}</span>
              </div>
            </div>
            <kn-badge variant="solid" [tone]="statusTone(c.status)">{{ c.status }}</kn-badge>
          </header>

          <kn-divider />

          <kn-tabs>
            <kn-tab label="Overview">
              <ng-template knTabContent>
                <div class="grid">
                  <div class="kpi"><div class="kpi__label">Orders</div><div class="kpi__value">{{ c.orders }}</div></div>
                  <div class="kpi"><div class="kpi__label">Spent</div><div class="kpi__value">৳{{ c.spent.toLocaleString('en-IN') }}</div></div>
                  <div class="kpi"><div class="kpi__label">AOV</div><div class="kpi__value">৳{{ Math.round(c.spent / c.orders).toLocaleString('en-IN') }}</div></div>
                  <div class="kpi"><div class="kpi__label">Joined</div><div class="kpi__value">{{ c.joined }}</div></div>
                </div>
              </ng-template>
            </kn-tab>
            <kn-tab label="Orders">
              <ng-template knTabContent>
                <p class="muted">Last 5 orders for {{ c.name }} would appear here. (Mock data — wire to your orders API.)</p>
              </ng-template>
            </kn-tab>
            <kn-tab label="Notes">
              <ng-template knTabContent>
                <p class="muted">Internal notes & tags for this customer. (Demo placeholder.)</p>
              </ng-template>
            </kn-tab>
            <kn-tab label="Activity">
              <ng-template knTabContent>
                <p class="muted">Login history, support tickets, and lifecycle events would render here.</p>
              </ng-template>
            </kn-tab>
          </kn-tabs>

          <kn-divider />

          <div class="detail__actions">
            <kn-button variant="outline" size="sm">Send message</kn-button>
            <kn-button variant="outline" size="sm">View orders</kn-button>
            <kn-button variant="outline" size="sm" tone="danger">Pause account</kn-button>
          </div>
        </kn-card>
      }
    </div>
  `,
  styles: [`
    :host { display: block; color: var(--kn-text); font-family: var(--kn-font-sans); }

    .page-head { display: flex; align-items: flex-end; justify-content: space-between; gap: var(--kn-sp-4); margin-bottom: var(--kn-sp-5); }
    .page-head__eyebrow { font-family: var(--kn-font-mono); font-size: var(--kn-fs-xs); font-weight: var(--kn-fw-bold); letter-spacing: var(--kn-tracking-mono); text-transform: uppercase; color: var(--kn-brand); margin-bottom: var(--kn-sp-2); }
    .page-head__title { font-family: var(--kn-font-display); font-size: var(--kn-fs-3xl); font-weight: var(--kn-fw-bold); margin: 0; }
    .page-head__sub { color: var(--kn-text-muted); margin: 4px 0 0; }
    .page-head__cta { display: flex; gap: var(--kn-sp-2); }

    .layout {
      display: grid;
      grid-template-columns: 360px 1fr;
      gap: var(--kn-sp-5);
    }
    @media (max-width: 1100px) { .layout { grid-template-columns: 1fr; } }

    .list > * + * { margin-top: var(--kn-sp-4); }

    .filters { display: flex; gap: var(--kn-sp-2); flex-wrap: wrap; }

    .list__items { list-style: none; margin: 0; padding: 0; }
    .list__item {
      display: flex;
      align-items: center;
      gap: var(--kn-sp-3);
      padding: var(--kn-sp-3);
      border-radius: var(--kn-r-sm);
      cursor: pointer;
      transition: background var(--kn-dur-fast) var(--kn-ease);
    }
    .list__item:hover { background: var(--kn-surface); }
    .list__item.is-selected { background: var(--kn-info-bg); border: var(--kn-bw-1) solid var(--kn-indigo-300); }
    .list__body { flex: 1; min-width: 0; }
    .list__name { font-weight: var(--kn-fw-semibold); }
    .list__meta { font-size: var(--kn-fs-sm); color: var(--kn-text-muted); }

    .detail__head {
      display: flex;
      align-items: flex-start;
      gap: var(--kn-sp-4);
      padding-bottom: var(--kn-sp-3);
    }
    .detail__head > div { flex: 1; }
    .detail__name { font-family: var(--kn-font-display); font-size: var(--kn-fs-2xl); font-weight: var(--kn-fw-bold); margin: 0; }
    .detail__name-bn { font-family: var(--kn-font-display); color: var(--kn-text-muted); margin: 0; font-style: italic; }
    .detail__meta { display: flex; gap: var(--kn-sp-2); color: var(--kn-text-muted); font-size: var(--kn-fs-sm); margin-top: var(--kn-sp-2); }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: var(--kn-sp-3);
    }
    .kpi { padding: var(--kn-sp-3); background: var(--kn-surface); border-radius: var(--kn-r-sm); border: var(--kn-bw-1) solid var(--kn-border); }
    .kpi__label {
      font-family: var(--kn-font-mono);
      font-size: var(--kn-fs-xs);
      font-weight: var(--kn-fw-bold);
      letter-spacing: var(--kn-tracking-mono);
      text-transform: uppercase;
      color: var(--kn-text-muted);
    }
    .kpi__value {
      font-family: var(--kn-font-display);
      font-size: var(--kn-fs-xl);
      font-weight: var(--kn-fw-bold);
      margin-top: 4px;
    }

    .muted { color: var(--kn-text-muted); font-size: var(--kn-fs-sm); padding: var(--kn-sp-3) 0; }

    .detail__actions { display: flex; gap: var(--kn-sp-2); flex-wrap: wrap; }
  `],
})
export class CustomersPage {
  private readonly modal = inject(KnModalService);
  private readonly toast = inject(KnToastService);

  protected readonly Math = Math;

  protected readonly search = signal('');
  protected readonly selected = signal<Customer | null>(MOCK_CUSTOMERS[0]);

  protected readonly filtered = computed<Customer[]>(() => {
    const term = this.search().toLowerCase().trim();
    if (!term) return MOCK_CUSTOMERS;
    return MOCK_CUSTOMERS.filter((c) =>
      c.name.toLowerCase().includes(term) ||
      c.area.toLowerCase().includes(term) ||
      c.email.toLowerCase().includes(term)
    );
  });

  protected statusTone(status: Customer['status']): 'success' | 'warn' | 'neutral' {
    if (status === 'active') return 'success';
    if (status === 'invited') return 'warn';
    return 'neutral';
  }

  protected openAdd(): void {
    const ref = this.modal.open<AddCustomerModal, void, { name: string }>(AddCustomerModal, { size: 'sm' });
    ref.closed.subscribe((result) => {
      if (result?.name) {
        this.toast.success('Customer added', `${result.name} was created.`);
      }
    });
  }
}
