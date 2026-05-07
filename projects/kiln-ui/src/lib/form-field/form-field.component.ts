import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'kn-form-field',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (label() || hint()) {
      <div class="kn-ff__label-row">
        @if (label()) {
          <label class="kn-ff__label" [class.is-required]="required()">{{ label() }}</label>
        }
        @if (hint() && !invalid()) {
          <span class="kn-ff__hint">{{ hint() }}</span>
        }
      </div>
    }

    <div class="kn-ff__control" [attr.data-invalid]="invalid() ? 'true' : null">
      <ng-content />
    </div>

    @if (errorMessage() && invalid()) {
      <div class="kn-ff__error">
        <span class="kn-ff__icon" aria-hidden="true">✕</span>{{ errorMessage() }}
      </div>
    } @else if (helperText()) {
      <div class="kn-ff__helper">{{ helperText() }}</div>
    }
  `,
  styles: [`
    :host { display: block; font-family: var(--kn-font-sans); }

    :host([data-spacing='compact']) { margin-bottom: var(--kn-sp-3); }
    :host([data-spacing='comfortable']) { margin-bottom: var(--kn-sp-5); }

    .kn-ff__label-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: var(--kn-sp-2);
    }

    .kn-ff__label {
      font-family: var(--kn-font-mono);
      font-size: var(--kn-fs-xs);
      font-weight: var(--kn-fw-bold);
      letter-spacing: var(--kn-tracking-mono);
      text-transform: uppercase;
      color: var(--kn-text);
    }

    .kn-ff__label.is-required::after {
      content: '*';
      color: var(--kn-danger);
      margin-left: var(--kn-sp-1);
    }

    .kn-ff__hint {
      font-family: var(--kn-font-mono);
      font-size: var(--kn-fs-xs);
      letter-spacing: var(--kn-tracking-mono);
      color: var(--kn-text-muted);
    }

    .kn-ff__control {
      display: block;
    }

    .kn-ff__helper, .kn-ff__error {
      margin-top: var(--kn-sp-2);
      font-size: var(--kn-fs-sm);
      line-height: var(--kn-lh-normal);
    }
    .kn-ff__helper { color: var(--kn-text-muted); }
    .kn-ff__error  { color: var(--kn-danger); }
    .kn-ff__icon   { margin-right: var(--kn-sp-1); font-weight: var(--kn-fw-bold); }
  `],
  host: {
    '[attr.data-spacing]': 'spacing()',
  },
})
export class KnFormFieldComponent {
  readonly label = input<string>('');
  readonly hint = input<string>('');
  readonly helperText = input<string>('');
  readonly errorMessage = input<string>('');
  readonly invalid = input<boolean>(false);
  readonly required = input<boolean>(false);
  readonly spacing = input<'compact' | 'comfortable'>('comfortable');
}
