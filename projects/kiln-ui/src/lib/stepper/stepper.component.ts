import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';

export interface KnStep {
  readonly title: string;
  readonly description?: string;
  readonly disabled?: boolean;
}

@Component({
  selector: 'kn-stepper',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ol class="kn-stepper" [attr.data-orientation]="orientation()">
      @for (step of steps(); track $index; let i = $index) {
        <li
          class="kn-stepper__step"
          [class.is-active]="i === active()"
          [class.is-complete]="i < active()"
          [class.is-disabled]="step.disabled"
          [attr.aria-current]="i === active() ? 'step' : null"
        >
          <button
            type="button"
            class="kn-stepper__index"
            [disabled]="step.disabled || !clickable()"
            (click)="select(i)"
          >
            @if (i < active()) {
              <span aria-hidden="true">✓</span>
            } @else {
              {{ i + 1 }}
            }
          </button>
          <div class="kn-stepper__body">
            <div class="kn-stepper__title">{{ step.title }}</div>
            @if (step.description) {
              <div class="kn-stepper__desc">{{ step.description }}</div>
            }
          </div>
          @if (i < steps().length - 1) {
            <span class="kn-stepper__line" aria-hidden="true"></span>
          }
        </li>
      }
    </ol>
  `,
  styles: [`
    :host { display: block; font-family: var(--kn-font-sans); }

    .kn-stepper {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      gap: var(--kn-sp-3);
    }

    .kn-stepper[data-orientation='vertical'] {
      flex-direction: column;
      gap: var(--kn-sp-1);
    }

    .kn-stepper__step {
      display: flex;
      align-items: flex-start;
      gap: var(--kn-sp-3);
      flex: 1;
      position: relative;
    }

    .kn-stepper[data-orientation='vertical'] .kn-stepper__step { flex: 0; }

    .kn-stepper__index {
      all: unset;
      flex-shrink: 0;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: var(--kn-bg);
      border: var(--kn-bw-2) solid var(--kn-border-strong);
      color: var(--kn-text);
      font-family: var(--kn-font-mono);
      font-size: var(--kn-fs-sm);
      font-weight: var(--kn-fw-bold);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      &:focus-visible { box-shadow: var(--kn-ring); }
      &[disabled] { cursor: not-allowed; }
    }

    .is-active .kn-stepper__index {
      background: var(--kn-brand);
      border-color: var(--kn-brand);
      color: var(--kn-text-inverse);
    }

    .is-complete .kn-stepper__index {
      background: var(--kn-success);
      border-color: var(--kn-success);
      color: var(--kn-text-inverse);
    }

    .is-disabled { opacity: 0.4; }

    .kn-stepper__body { flex: 1; min-width: 0; padding-top: 4px; }

    .kn-stepper__title {
      font-size: var(--kn-fs-base);
      font-weight: var(--kn-fw-semibold);
      color: var(--kn-text);
    }

    .kn-stepper__desc {
      font-size: var(--kn-fs-sm);
      color: var(--kn-text-muted);
      margin-top: 2px;
    }

    .kn-stepper__line {
      flex: 1;
      height: 2px;
      background: var(--kn-border);
      margin-top: 14px;
    }

    .kn-stepper[data-orientation='vertical'] .kn-stepper__line {
      width: 2px;
      height: 24px;
      margin-left: 13px;
    }

    .is-complete .kn-stepper__line { background: var(--kn-success); }
  `],
})
export class KnStepperComponent {
  readonly steps = input<KnStep[]>([]);
  readonly activeIndex = input<number>(0);
  readonly orientation = input<'horizontal' | 'vertical'>('horizontal');
  readonly clickable = input<boolean>(true);

  readonly activeChange = output<number>();

  readonly active = computed(() => this.activeIndex());

  protected select(index: number): void {
    if (!this.clickable()) return;
    if (this.steps()[index]?.disabled) return;
    this.activeChange.emit(index);
  }
}
