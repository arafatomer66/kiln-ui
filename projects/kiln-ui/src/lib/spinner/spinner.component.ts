import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'kn-spinner',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="kn-spinner" role="progressbar" [attr.aria-label]="ariaLabel()" aria-busy="true"></span>
  `,
  styles: [`
    :host { display: inline-flex; }

    .kn-spinner {
      display: inline-block;
      border: 2px solid currentColor;
      border-top-color: transparent;
      border-radius: 50%;
      animation: kn-spinner-rotate 600ms linear infinite;
      color: var(--kn-brand);
    }

    :host([data-size='sm']) .kn-spinner { width: 12px; height: 12px; border-width: 2px; }
    :host([data-size='md']) .kn-spinner { width: 18px; height: 18px; border-width: 2px; }
    :host([data-size='lg']) .kn-spinner { width: 28px; height: 28px; border-width: 3px; }
    :host([data-size='xl']) .kn-spinner { width: 40px; height: 40px; border-width: 4px; }

    @keyframes kn-spinner-rotate { to { transform: rotate(360deg); } }
  `],
  host: {
    '[attr.data-size]': 'size()',
  },
})
export class KnSpinnerComponent {
  readonly size = input<'sm' | 'md' | 'lg' | 'xl'>('md');
  readonly ariaLabel = input<string>('Loading');
}
