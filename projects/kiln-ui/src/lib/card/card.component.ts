import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type KnCardVariant = 'stamp' | 'soft' | 'ghost';
export type KnCardPadding = 'none' | 'sm' | 'md' | 'lg';

@Component({
  selector: 'kn-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="kn-card">
      <span class="kn-card__motif kn-card__motif--tl" aria-hidden="true">❖</span>
      <span class="kn-card__motif kn-card__motif--tr" aria-hidden="true">❖</span>
      <span class="kn-card__motif kn-card__motif--bl" aria-hidden="true">❖</span>
      <span class="kn-card__motif kn-card__motif--br" aria-hidden="true">❖</span>
      <ng-content />
    </div>
  `,
  styleUrl: './card.scss',
  host: {
    '[attr.data-variant]': 'variant()',
    '[attr.data-padding]': 'padding()',
    '[attr.data-motifs]': 'motifs() ? null : "false"',
    '[attr.data-interactive]': 'interactive() ? "true" : null',
  },
})
export class KnCardComponent {
  readonly variant = input<KnCardVariant>('stamp');
  readonly padding = input<KnCardPadding>('md');
  readonly motifs = input<boolean>(true);
  readonly interactive = input<boolean>(false);
}

@Component({
  selector: 'kn-card-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-content />`,
})
export class KnCardHeaderComponent {}

@Component({
  selector: 'kn-card-footer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-content />`,
})
export class KnCardFooterComponent {}
