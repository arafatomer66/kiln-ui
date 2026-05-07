import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  KnBadgeComponent, KnButtonComponent, KnCardComponent, KnChipComponent,
  KnDividerComponent, KnTooltipDirective,
} from 'kiln-ui';
import { MOCK_PRODUCTS, Product } from '../mock-data';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    KnCardComponent, KnButtonComponent, KnBadgeComponent, KnChipComponent,
    KnDividerComponent, KnTooltipDirective,
  ],
  template: `
    <header class="page-head">
      <div>
        <div class="page-head__eyebrow">PRODUCTS · পণ্য</div>
        <h1 class="page-head__title">Products</h1>
        <p class="page-head__sub">8 products across 6 categories. 1 out of stock.</p>
      </div>
      <div class="page-head__cta">
        <kn-button variant="outline" knTooltip="Bulk import via CSV">Import</kn-button>
        <kn-button variant="solid">+ New product</kn-button>
      </div>
    </header>

    <div class="filters">
      <kn-chip [removable]="true">Category: All</kn-chip>
      <kn-chip variant="soft" [removable]="true">In stock only</kn-chip>
    </div>

    <div class="grid">
      @for (p of products(); track p.id) {
        <kn-card padding="md" class="card" [interactive]="true">
          <header class="card__head">
            <div class="card__category">{{ p.category }}</div>
            @if (p.active) {
              <kn-badge variant="soft" tone="success">Live</kn-badge>
            } @else {
              <kn-badge variant="soft" tone="neutral">Hidden</kn-badge>
            }
          </header>

          <h3 class="card__title">{{ p.name }}</h3>
          <p class="card__title-bn">{{ p.nameBn }}</p>

          <kn-divider />

          <div class="card__meta">
            <div>
              <div class="card__label">Price</div>
              <div class="card__value">৳{{ p.price.toLocaleString('en-IN') }}</div>
            </div>
            <div>
              <div class="card__label">Stock</div>
              <div class="card__value">
                {{ p.stock }}
                @if (p.stock === 0) {
                  <kn-badge variant="solid" tone="danger">Out</kn-badge>
                } @else if (p.stock < 25) {
                  <kn-badge variant="soft" tone="warn">Low</kn-badge>
                }
              </div>
            </div>
          </div>

          <div class="card__actions">
            <kn-button variant="outline" size="sm">Edit</kn-button>
            <kn-button variant="ghost" size="sm" tone="danger">Archive</kn-button>
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

    .filters { display: flex; gap: var(--kn-sp-2); margin-bottom: var(--kn-sp-5); flex-wrap: wrap; }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: var(--kn-sp-4);
    }

    .card { display: block; }
    .card__head { display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--kn-sp-2); }
    .card__category {
      font-family: var(--kn-font-mono);
      font-size: var(--kn-fs-xs);
      font-weight: var(--kn-fw-bold);
      letter-spacing: var(--kn-tracking-mono);
      text-transform: uppercase;
      color: var(--kn-text-muted);
    }
    .card__title { font-family: var(--kn-font-display); font-size: var(--kn-fs-md); font-weight: var(--kn-fw-bold); margin: 0; }
    .card__title-bn { font-family: var(--kn-font-display); font-style: italic; color: var(--kn-text-muted); margin: 0 0 var(--kn-sp-2); font-size: var(--kn-fs-sm); }

    .card__meta { display: flex; justify-content: space-between; gap: var(--kn-sp-3); margin: var(--kn-sp-3) 0; }
    .card__label {
      font-family: var(--kn-font-mono);
      font-size: var(--kn-fs-xs);
      font-weight: var(--kn-fw-bold);
      letter-spacing: var(--kn-tracking-mono);
      text-transform: uppercase;
      color: var(--kn-text-muted);
    }
    .card__value {
      font-family: var(--kn-font-display);
      font-size: var(--kn-fs-lg);
      font-weight: var(--kn-fw-bold);
      display: inline-flex;
      gap: var(--kn-sp-2);
      align-items: center;
    }

    .card__actions { display: flex; gap: var(--kn-sp-2); }
  `],
})
export class ProductsPage {
  protected readonly products = signal<Product[]>([...MOCK_PRODUCTS]);
}
