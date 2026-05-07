import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

export type KnButtonVariant = 'solid' | 'outline' | 'ghost' | 'link';
export type KnButtonSize = 'sm' | 'md' | 'lg';
export type KnButtonTone = 'brand' | 'danger' | 'accent';
export type KnButtonType = 'button' | 'submit' | 'reset';

@Component({
  selector: 'kn-button',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      class="kn-button"
      [type]="type()"
      [disabled]="disabled() || loading()"
      [attr.aria-busy]="loading() ? 'true' : null"
      [attr.aria-label]="ariaLabel() || null"
      (click)="onClick($event)"
    >
      @if (loading()) {
        <span class="kn-button__spinner" aria-hidden="true"></span>
      }
      <ng-content />
    </button>
  `,
  styleUrl: './button.scss',
  host: {
    '[attr.data-variant]': 'variant()',
    '[attr.data-size]': 'size()',
    '[attr.data-tone]': 'tone()',
    '[attr.data-block]': 'block() ? "true" : null',
  },
})
export class KnButtonComponent {
  readonly variant = input<KnButtonVariant>('solid');
  readonly size = input<KnButtonSize>('md');
  readonly tone = input<KnButtonTone>('brand');
  readonly type = input<KnButtonType>('button');
  readonly disabled = input<boolean>(false);
  readonly loading = input<boolean>(false);
  readonly block = input<boolean>(false);
  readonly ariaLabel = input<string>('');

  readonly clicked = output<MouseEvent>();

  protected onClick(event: MouseEvent): void {
    if (this.disabled() || this.loading()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.clicked.emit(event);
  }
}
