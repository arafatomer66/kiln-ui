import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
  output,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const DEFAULT_PALETTE = [
  '#1B3A6F', '#142D57', '#6B8AB8',
  '#E8A33D', '#C8861E', '#F4C674',
  '#2D6A4F', '#B5371F', '#C8861E',
  '#2A2418', '#6B5B3E', '#D4C5A0', '#FAF6EC', '#FFFFFF',
];

@Component({
  selector: 'kn-color-picker',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (label()) {
      <label class="kn-cp__label">{{ label() }}</label>
    }

    <div class="kn-cp">
      <span class="kn-cp__current" aria-hidden="true" [style.background]="value() || 'transparent'"></span>
      <input
        class="kn-cp__hex"
        type="text"
        spellcheck="false"
        [value]="value()"
        [disabled]="disabled()"
        [attr.aria-label]="ariaLabel() || label() || 'Color value'"
        (input)="onHexInput($event)"
        (blur)="onBlur()"
      />
      <input
        class="kn-cp__native"
        type="color"
        [value]="value() || '#1B3A6F'"
        [disabled]="disabled()"
        (input)="onNativeInput($event)"
        aria-hidden="true"
        tabindex="-1"
      />
    </div>

    @if (showPalette()) {
      <div class="kn-cp__palette" role="listbox" [attr.aria-label]="'Color palette'">
        @for (c of palette(); track $index) {
          <button
            type="button"
            class="kn-cp__swatch"
            [class.is-selected]="value()?.toLowerCase() === c.toLowerCase()"
            [style.background]="c"
            [attr.aria-label]="c"
            [attr.aria-selected]="value()?.toLowerCase() === c.toLowerCase()"
            (click)="select(c)"
          ></button>
        }
      </div>
    }
  `,
  styles: [`
    :host { display: block; font-family: var(--kn-font-sans); }

    .kn-cp__label {
      display: block;
      font-family: var(--kn-font-mono);
      font-size: var(--kn-fs-xs);
      font-weight: var(--kn-fw-bold);
      letter-spacing: var(--kn-tracking-mono);
      text-transform: uppercase;
      color: var(--kn-text);
      margin-bottom: var(--kn-sp-2);
    }

    .kn-cp {
      display: inline-flex;
      align-items: center;
      gap: 0;
      background: var(--kn-bg);
      border: var(--kn-bw-2) solid var(--kn-border-strong);
      border-radius: var(--kn-r-sm);
      overflow: hidden;
      transition: box-shadow var(--kn-dur-fast) var(--kn-ease);
    }
    .kn-cp:focus-within { box-shadow: var(--kn-ring); }

    .kn-cp__current {
      width: 36px;
      height: 36px;
      border-right: var(--kn-bw-1) solid var(--kn-border);
      flex-shrink: 0;
      cursor: pointer;
      background-image: linear-gradient(45deg, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%),
                        linear-gradient(45deg, #ddd 25%, #fff 25%, #fff 75%, #ddd 75%);
      background-size: 8px 8px;
      background-position: 0 0, 4px 4px;
    }

    .kn-cp__hex {
      width: 96px;
      height: 36px;
      padding: 0 var(--kn-sp-3);
      border: none;
      outline: none;
      background: transparent;
      color: var(--kn-text);
      font-family: var(--kn-font-mono);
      font-size: var(--kn-fs-sm);
      letter-spacing: var(--kn-tracking-mono);
      text-transform: uppercase;
    }

    .kn-cp__native {
      position: absolute;
      width: 1px;
      height: 1px;
      opacity: 0;
      pointer-events: none;
    }

    .kn-cp__palette {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 4px;
      margin-top: var(--kn-sp-3);
      max-width: 240px;
    }

    .kn-cp__swatch {
      all: unset;
      cursor: pointer;
      width: 28px;
      height: 28px;
      border-radius: var(--kn-r-xs);
      border: var(--kn-bw-1) solid var(--kn-border);
      transition: transform var(--kn-dur-fast) var(--kn-ease);
    }
    .kn-cp__swatch:hover { transform: scale(1.1); }
    .kn-cp__swatch:focus-visible { box-shadow: var(--kn-ring); }
    .kn-cp__swatch.is-selected { box-shadow: 0 0 0 2px var(--kn-bg), 0 0 0 4px var(--kn-brand); }
  `],
  host: {
    '[style.position]': '"relative"',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => KnColorPickerComponent),
      multi: true,
    },
  ],
})
export class KnColorPickerComponent implements ControlValueAccessor {
  readonly label = input<string>('');
  readonly disabled = input<boolean>(false);
  readonly showPalette = input<boolean>(true);
  readonly palette = input<string[]>(DEFAULT_PALETTE);
  readonly ariaLabel = input<string>('');

  readonly valueChange = output<string>();

  readonly value = signal<string>('#1B3A6F');

  protected onHexInput(event: Event): void {
    let v = (event.target as HTMLInputElement).value.trim();
    if (v && !v.startsWith('#')) v = '#' + v;
    this.value.set(v);
    this.commit();
  }

  protected onNativeInput(event: Event): void {
    this.value.set((event.target as HTMLInputElement).value);
    this.commit();
  }

  protected select(c: string): void {
    if (this.disabled()) return;
    this.value.set(c);
    this.commit();
  }

  protected onBlur(): void { this.onTouched(); }

  private commit(): void {
    this.onChange(this.value());
    this.valueChange.emit(this.value());
  }

  // CVA
  private onChange: (v: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string | null): void { this.value.set(value ?? '#1B3A6F'); }
  registerOnChange(fn: (v: string) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(_: boolean): void {}
}
