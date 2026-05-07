import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
  output,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'kn-rating',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (label()) {
      <label class="kn-rating__label">{{ label() }}</label>
    }
    <div
      class="kn-rating"
      [attr.role]="readonly() ? 'img' : 'radiogroup'"
      [attr.aria-label]="ariaLabel() || label() || 'Rating'"
      [attr.aria-disabled]="disabled() ? 'true' : null"
      (mouseleave)="hover.set(0)"
    >
      @for (i of stops(); track i) {
        <button
          type="button"
          class="kn-rating__star"
          [class.is-filled]="(hover() || value()) >= i"
          [attr.aria-label]="i + ' out of ' + max()"
          [attr.aria-checked]="value() === i"
          [disabled]="disabled() || readonly()"
          (mouseenter)="hover.set(i)"
          (focus)="hover.set(i)"
          (click)="select(i)"
          (keydown)="onKeydown($event, i)"
        >★</button>
      }
      @if (showValue()) {
        <span class="kn-rating__value">{{ value() }} / {{ max() }}</span>
      }
    </div>
  `,
  styles: [`
    :host { display: inline-flex; flex-direction: column; gap: var(--kn-sp-2); font-family: var(--kn-font-sans); }

    .kn-rating__label {
      font-family: var(--kn-font-mono);
      font-size: var(--kn-fs-xs);
      font-weight: var(--kn-fw-bold);
      letter-spacing: var(--kn-tracking-mono);
      text-transform: uppercase;
      color: var(--kn-text);
    }

    .kn-rating {
      display: inline-flex;
      align-items: center;
      gap: 2px;
    }

    .kn-rating__star {
      all: unset;
      cursor: pointer;
      width: 28px;
      height: 28px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
      color: var(--kn-jute-300);
      transition: color var(--kn-dur-fast) var(--kn-ease), transform var(--kn-dur-fast) var(--kn-ease);
      border-radius: var(--kn-r-xs);
    }
    .kn-rating__star.is-filled { color: var(--kn-marigold-500); }
    .kn-rating__star:hover { transform: scale(1.1); }
    .kn-rating__star:focus-visible { box-shadow: var(--kn-ring); }
    .kn-rating__star[disabled] { cursor: default; opacity: 0.6; }

    .kn-rating__value {
      margin-left: var(--kn-sp-2);
      font-family: var(--kn-font-mono);
      font-size: var(--kn-fs-sm);
      color: var(--kn-text-muted);
      letter-spacing: var(--kn-tracking-mono);
    }
  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => KnRatingComponent),
      multi: true,
    },
  ],
})
export class KnRatingComponent implements ControlValueAccessor {
  readonly max = input<number>(5);
  readonly label = input<string>('');
  readonly readonly = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly showValue = input<boolean>(false);
  readonly ariaLabel = input<string>('');

  readonly valueChange = output<number>();

  readonly value = signal<number>(0);
  readonly hover = signal<number>(0);
  readonly stops = computed(() => Array.from({ length: this.max() }, (_, i) => i + 1));

  protected select(v: number): void {
    if (this.disabled() || this.readonly()) return;
    const next = this.value() === v ? 0 : v;
    this.value.set(next);
    this.onChange(next);
    this.valueChange.emit(next);
  }

  protected onKeydown(event: KeyboardEvent, current: number): void {
    if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
      event.preventDefault();
      this.select(Math.min(current + 1, this.max()));
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
      event.preventDefault();
      this.select(Math.max(current - 1, 0));
    }
  }

  // CVA
  private onChange: (v: number) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: number | null): void { this.value.set(value ?? 0); }
  registerOnChange(fn: (v: number) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(_: boolean): void {}
}
