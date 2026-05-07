import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { KnSparklineComponent } from '../sparkline/sparkline.component';

export type KnStatTrend = 'up' | 'down' | 'flat';

@Component({
  selector: 'kn-stat-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [KnSparklineComponent],
  template: `
    <div class="kn-stat">
      @if (motifs()) {
        <span class="kn-stat__motif kn-stat__motif--tl" aria-hidden="true">❖</span>
        <span class="kn-stat__motif kn-stat__motif--tr" aria-hidden="true">❖</span>
      }

      <div class="kn-stat__head">
        <div class="kn-stat__label">
          {{ label() }}
          @if (labelSecondary()) {
            <span class="kn-stat__label-secondary"> · {{ labelSecondary() }}</span>
          }
        </div>
        @if (icon()) {
          <span class="kn-stat__icon" aria-hidden="true">{{ icon() }}</span>
        }
      </div>

      <div class="kn-stat__row">
        <div class="kn-stat__value">{{ value() }}</div>
        @if (sparkline().length > 0) {
          <kn-sparkline
            [values]="sparkline()"
            [tone]="trend() === 'down' ? 'danger' : trend() === 'up' ? 'success' : 'muted'"
            [width]="sparkWidth()"
            [height]="32"
            [showLast]="true"
          />
        }
      </div>

      @if (delta()) {
        <div class="kn-stat__delta" [attr.data-trend]="trend()">
          @if (trend() === 'up') { <span aria-hidden="true">↑</span> }
          @if (trend() === 'down') { <span aria-hidden="true">↓</span> }
          {{ delta() }}
        </div>
      }
    </div>
  `,
  styles: [`
    :host { display: block; font-family: var(--kn-font-sans); position: relative; }

    .kn-stat {
      position: relative;
      background: var(--kn-surface);
      border: var(--kn-bw-2) solid var(--kn-border-strong);
      border-radius: var(--kn-r-sm);
      box-shadow: var(--kn-shadow-stamp);
      padding: var(--kn-sp-5) var(--kn-sp-5) var(--kn-sp-4);
      color: var(--kn-text);
    }

    .kn-stat__motif {
      position: absolute;
      width: 12px;
      height: 12px;
      color: var(--kn-brand);
      font-size: 14px;
      line-height: 1;
      pointer-events: none;
    }
    .kn-stat__motif--tl { top: -6px; left: -6px; }
    .kn-stat__motif--tr { top: -6px; right: -6px; }

    .kn-stat__head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: var(--kn-sp-3);
    }

    .kn-stat__label {
      font-family: var(--kn-font-mono);
      font-size: var(--kn-fs-xs);
      font-weight: var(--kn-fw-bold);
      letter-spacing: var(--kn-tracking-mono);
      text-transform: uppercase;
      color: var(--kn-text-muted);
    }

    .kn-stat__label-secondary {
      font-weight: var(--kn-fw-regular);
      opacity: 0.85;
    }

    .kn-stat__icon { color: var(--kn-text-muted); font-size: 14px; }

    .kn-stat__row {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: var(--kn-sp-3);
      margin-bottom: var(--kn-sp-2);
    }

    .kn-stat__value {
      font-family: var(--kn-font-display);
      font-size: var(--kn-fs-3xl);
      font-weight: var(--kn-fw-bold);
      line-height: 1;
      letter-spacing: var(--kn-tracking-tight);
    }

    .kn-stat__delta {
      font-family: var(--kn-font-mono);
      font-size: var(--kn-fs-xs);
      letter-spacing: var(--kn-tracking-mono);
      color: var(--kn-text-muted);
    }
    .kn-stat__delta[data-trend='up']   { color: var(--kn-success); }
    .kn-stat__delta[data-trend='down'] { color: var(--kn-danger); }
  `],
})
export class KnStatCardComponent {
  readonly label = input<string>('');
  readonly labelSecondary = input<string>('');
  readonly value = input<string | number>('');
  readonly delta = input<string>('');
  readonly trend = input<KnStatTrend>('flat');
  readonly sparkline = input<number[]>([]);
  readonly sparkWidth = input<number>(80);
  readonly icon = input<string>('');
  readonly motifs = input<boolean>(true);
}
