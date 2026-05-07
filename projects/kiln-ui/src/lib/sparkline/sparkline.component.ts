import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'kn-sparkline',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      class="kn-spark"
      [attr.viewBox]="'0 0 ' + width() + ' ' + height()"
      [attr.aria-label]="ariaLabel() || null"
      preserveAspectRatio="none"
    >
      @if (showArea()) {
        <path class="kn-spark__area" [attr.d]="areaPath()" />
      }
      <polyline
        class="kn-spark__line"
        [attr.points]="linePoints()"
        fill="none"
        stroke-linejoin="round"
        stroke-linecap="round"
      />
      @if (showDots()) {
        @for (p of dots(); track $index) {
          <circle [attr.cx]="p.x" [attr.cy]="p.y" r="1.6" class="kn-spark__dot" />
        }
      }
      @if (showLast() && dots().length) {
        <circle
          [attr.cx]="dots()[dots().length - 1].x"
          [attr.cy]="dots()[dots().length - 1].y"
          r="2.5"
          class="kn-spark__last"
        />
      }
    </svg>
  `,
  styles: [`
    :host { display: inline-block; vertical-align: middle; line-height: 0; }

    .kn-spark { width: 100%; height: 100%; display: block; color: var(--kn-brand); }

    .kn-spark__line  { stroke: currentColor; stroke-width: 1.5; }
    .kn-spark__area  { fill: currentColor; opacity: 0.12; }
    .kn-spark__dot   { fill: currentColor; opacity: 0.5; }
    .kn-spark__last  { fill: currentColor; }

    :host([data-tone='success']) .kn-spark { color: var(--kn-success); }
    :host([data-tone='danger'])  .kn-spark { color: var(--kn-danger); }
    :host([data-tone='warn'])    .kn-spark { color: var(--kn-warn); }
    :host([data-tone='accent'])  .kn-spark { color: var(--kn-accent); }
    :host([data-tone='muted'])   .kn-spark { color: var(--kn-text-muted); }
  `],
  host: {
    '[attr.data-tone]': 'tone()',
    '[style.width.px]': 'width()',
    '[style.height.px]': 'height()',
  },
})
export class KnSparklineComponent {
  readonly values = input<number[]>([]);
  readonly width = input<number>(120);
  readonly height = input<number>(32);
  readonly tone = input<'brand' | 'success' | 'danger' | 'warn' | 'accent' | 'muted'>('brand');
  readonly showArea = input<boolean>(true);
  readonly showDots = input<boolean>(false);
  readonly showLast = input<boolean>(true);
  readonly padding = input<number>(2);
  readonly ariaLabel = input<string>('');

  private readonly bounds = computed(() => {
    const v = this.values();
    if (v.length === 0) return { min: 0, max: 1 };
    const min = Math.min(...v);
    const max = Math.max(...v);
    if (min === max) return { min: min - 1, max: max + 1 };
    return { min, max };
  });

  protected readonly dots = computed(() => {
    const v = this.values();
    if (v.length === 0) return [];
    const w = this.width();
    const h = this.height();
    const p = this.padding();
    const { min, max } = this.bounds();
    const range = max - min;
    const innerW = w - p * 2;
    const innerH = h - p * 2;
    const step = v.length > 1 ? innerW / (v.length - 1) : 0;
    return v.map((value, i) => ({
      x: +(p + i * step).toFixed(2),
      y: +(p + innerH - ((value - min) / range) * innerH).toFixed(2),
    }));
  });

  protected readonly linePoints = computed(() =>
    this.dots().map((p) => `${p.x},${p.y}`).join(' ')
  );

  protected readonly areaPath = computed(() => {
    const dots = this.dots();
    if (dots.length === 0) return '';
    const h = this.height();
    const p = this.padding();
    const baseY = h - p;
    const start = `M ${dots[0].x} ${baseY}`;
    const lines = dots.map((d) => `L ${d.x} ${d.y}`).join(' ');
    const end = `L ${dots[dots.length - 1].x} ${baseY} Z`;
    return `${start} ${lines} ${end}`;
  });
}
