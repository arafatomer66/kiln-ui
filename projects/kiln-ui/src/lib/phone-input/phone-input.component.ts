import { CdkConnectedOverlay, CdkOverlayOrigin, ConnectedPosition } from '@angular/cdk/overlay';
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

let nextPhoneId = 0;

export interface KnCountry {
  readonly code: string;          // ISO-2 e.g. 'BD'
  readonly name: string;
  readonly dial: string;          // e.g. '+880'
  readonly flag: string;          // emoji
}

export const KN_COUNTRIES: KnCountry[] = [
  { code: 'BD', name: 'Bangladesh',     dial: '+880', flag: '🇧🇩' },
  { code: 'IN', name: 'India',          dial: '+91',  flag: '🇮🇳' },
  { code: 'PK', name: 'Pakistan',       dial: '+92',  flag: '🇵🇰' },
  { code: 'NP', name: 'Nepal',          dial: '+977', flag: '🇳🇵' },
  { code: 'LK', name: 'Sri Lanka',      dial: '+94',  flag: '🇱🇰' },
  { code: 'AE', name: 'UAE',            dial: '+971', flag: '🇦🇪' },
  { code: 'SA', name: 'Saudi Arabia',   dial: '+966', flag: '🇸🇦' },
  { code: 'SG', name: 'Singapore',      dial: '+65',  flag: '🇸🇬' },
  { code: 'MY', name: 'Malaysia',       dial: '+60',  flag: '🇲🇾' },
  { code: 'GB', name: 'United Kingdom', dial: '+44',  flag: '🇬🇧' },
  { code: 'US', name: 'United States',  dial: '+1',   flag: '🇺🇸' },
  { code: 'CA', name: 'Canada',         dial: '+1',   flag: '🇨🇦' },
  { code: 'AU', name: 'Australia',      dial: '+61',  flag: '🇦🇺' },
];

const POSITIONS: ConnectedPosition[] = [
  { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top',    offsetY: 4 },
  { originX: 'start', originY: 'top',    overlayX: 'start', overlayY: 'bottom', offsetY: -4 },
];

@Component({
  selector: 'kn-phone-input',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CdkConnectedOverlay, CdkOverlayOrigin],
  template: `
    @if (label()) {
      <label class="kn-phone__label" [attr.for]="phoneId">
        <span>{{ label() }}</span>
        @if (hint()) { <span class="kn-phone__hint">{{ hint() }}</span> }
      </label>
    }

    <div class="kn-phone" [attr.data-invalid]="invalid() ? 'true' : null">
      <button
        type="button"
        class="kn-phone__country"
        cdkOverlayOrigin
        #origin="cdkOverlayOrigin"
        [disabled]="disabled()"
        [attr.aria-haspopup]="'listbox'"
        [attr.aria-expanded]="open()"
        (click)="toggle()"
      >
        <span class="kn-phone__flag" aria-hidden="true">{{ country().flag }}</span>
        <span class="kn-phone__dial">{{ country().dial }}</span>
        <span class="kn-phone__caret" aria-hidden="true">▾</span>
      </button>

      <input
        class="kn-phone__number"
        type="tel"
        [id]="phoneId"
        [placeholder]="placeholder()"
        [disabled]="disabled()"
        [value]="national()"
        [attr.aria-invalid]="invalid() ? 'true' : null"
        (input)="onNumberInput($event)"
        (blur)="onBlur()"
      />
    </div>

    <ng-template
      cdkConnectedOverlay
      [cdkConnectedOverlayOrigin]="origin"
      [cdkConnectedOverlayOpen]="open()"
      [cdkConnectedOverlayPositions]="positions"
      [cdkConnectedOverlayHasBackdrop]="true"
      cdkConnectedOverlayBackdropClass="kn-overlay-transparent-backdrop"
      (backdropClick)="close()"
    >
      <ul class="kn-phone__menu" role="listbox">
        @for (c of countries(); track c.code) {
          <li
            class="kn-phone__option"
            role="option"
            [attr.aria-selected]="c.code === country().code"
            [class.is-selected]="c.code === country().code"
            (click)="selectCountry(c)"
          >
            <span class="kn-phone__flag" aria-hidden="true">{{ c.flag }}</span>
            <span class="kn-phone__option-name">{{ c.name }}</span>
            <span class="kn-phone__option-dial">{{ c.dial }}</span>
          </li>
        }
      </ul>
    </ng-template>

    @if (errorMessage() && invalid()) {
      <div class="kn-phone__error"><span class="kn-phone__icon">✕</span>{{ errorMessage() }}</div>
    } @else if (helperText()) {
      <div class="kn-phone__helper">{{ helperText() }}</div>
    }
  `,
  styles: [`
    :host { display: block; font-family: var(--kn-font-sans); position: relative; }

    .kn-phone__label {
      display: flex;
      justify-content: space-between;
      font-family: var(--kn-font-mono);
      font-size: var(--kn-fs-xs);
      font-weight: var(--kn-fw-bold);
      letter-spacing: var(--kn-tracking-mono);
      text-transform: uppercase;
      color: var(--kn-text);
      margin-bottom: var(--kn-sp-2);
    }
    .kn-phone__hint { color: var(--kn-text-muted); font-weight: var(--kn-fw-regular); }

    .kn-phone {
      display: flex;
      align-items: stretch;
      background: var(--kn-bg);
      border: var(--kn-bw-2) solid var(--kn-border-strong);
      border-radius: var(--kn-r-sm);
      overflow: hidden;
      transition: box-shadow var(--kn-dur-fast) var(--kn-ease);
    }
    .kn-phone:focus-within { box-shadow: var(--kn-ring); }
    .kn-phone[data-invalid='true'] { border-color: var(--kn-danger); }

    .kn-phone__country {
      all: unset;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: var(--kn-sp-2);
      padding: 0 var(--kn-sp-3);
      background: var(--kn-surface);
      color: var(--kn-text);
      border-right: var(--kn-bw-1) solid var(--kn-border);
      font-size: var(--kn-fs-base);
      flex-shrink: 0;
    }
    .kn-phone__country:hover { background: var(--kn-surface-alt); }
    .kn-phone__country:focus-visible { box-shadow: var(--kn-ring); }
    .kn-phone__country[disabled] { opacity: 0.6; cursor: not-allowed; }

    .kn-phone__flag { font-size: 18px; line-height: 1; }
    .kn-phone__dial { font-family: var(--kn-font-mono); font-weight: var(--kn-fw-semibold); font-size: var(--kn-fs-sm); }
    .kn-phone__caret { color: var(--kn-text-muted); font-size: 11px; }

    .kn-phone__number {
      flex: 1;
      min-width: 0;
      height: 36px;
      padding: 0 var(--kn-sp-3);
      background: transparent;
      color: var(--kn-text);
      font-family: var(--kn-font-mono);
      font-size: var(--kn-fs-base);
      border: none;
      outline: none;
    }
    .kn-phone__number::placeholder { color: var(--kn-text-muted); opacity: 0.7; }

    .kn-phone__menu {
      list-style: none;
      margin: 0;
      padding: var(--kn-sp-1);
      max-height: 280px;
      overflow-y: auto;
      min-width: 240px;
      background: var(--kn-bg);
      border: var(--kn-bw-2) solid var(--kn-border-strong);
      border-radius: var(--kn-r-sm);
      box-shadow: var(--kn-shadow-stamp-strong);
    }

    .kn-phone__option {
      display: flex;
      align-items: center;
      gap: var(--kn-sp-3);
      padding: var(--kn-sp-2) var(--kn-sp-3);
      cursor: pointer;
      border-radius: var(--kn-r-xs);
    }
    .kn-phone__option:hover { background: var(--kn-surface); }
    .kn-phone__option.is-selected { background: var(--kn-info-bg); color: var(--kn-brand); }

    .kn-phone__option-name { flex: 1; min-width: 0; font-size: var(--kn-fs-sm); }
    .kn-phone__option-dial {
      font-family: var(--kn-font-mono);
      font-size: var(--kn-fs-xs);
      color: var(--kn-text-muted);
      letter-spacing: var(--kn-tracking-mono);
    }

    .kn-phone__helper, .kn-phone__error {
      margin-top: var(--kn-sp-2);
      font-size: var(--kn-fs-sm);
    }
    .kn-phone__helper { color: var(--kn-text-muted); }
    .kn-phone__error  { color: var(--kn-danger); }
    .kn-phone__icon   { margin-right: var(--kn-sp-1); font-weight: var(--kn-fw-bold); }

    :host ::ng-deep .kn-overlay-transparent-backdrop { background: transparent; }
  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => KnPhoneInputComponent),
      multi: true,
    },
  ],
})
export class KnPhoneInputComponent implements ControlValueAccessor {
  readonly phoneId = `kn-phone-${nextPhoneId++}`;

  readonly label = input<string>('');
  readonly hint = input<string>('');
  readonly placeholder = input<string>('1XXX-XXXXXX');
  readonly defaultCountry = input<string>('BD');
  readonly disabled = input<boolean>(false);
  readonly invalid = input<boolean>(false);
  readonly helperText = input<string>('');
  readonly errorMessage = input<string>('');
  readonly countries = input<KnCountry[]>(KN_COUNTRIES);

  readonly valueChange = output<string>();

  readonly country = signal<KnCountry>(KN_COUNTRIES[0]);
  readonly national = signal<string>('');
  readonly open = signal<boolean>(false);

  protected readonly positions = POSITIONS;

  constructor() {
    const def = KN_COUNTRIES.find((c) => c.code === this.defaultCountry()) ?? KN_COUNTRIES[0];
    this.country.set(def);
  }

  readonly fullValue = computed(() => `${this.country().dial} ${this.national()}`.trim());

  protected toggle(): void {
    if (this.disabled()) return;
    this.open.set(!this.open());
  }

  protected close(): void { this.open.set(false); }

  protected selectCountry(c: KnCountry): void {
    this.country.set(c);
    this.close();
    this.emit();
  }

  protected onNumberInput(event: Event): void {
    const v = (event.target as HTMLInputElement).value;
    this.national.set(v.replace(/[^\d\s-]/g, ''));
    this.emit();
  }

  protected onBlur(): void { this.onTouched(); }

  private emit(): void {
    const v = this.fullValue();
    this.onChange(v);
    this.valueChange.emit(v);
  }

  // CVA
  private onChange: (v: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string | null): void {
    if (!value) {
      this.national.set('');
      return;
    }
    const trimmed = value.trim();
    const match = this.countries().find((c) => trimmed.startsWith(c.dial));
    if (match) {
      this.country.set(match);
      this.national.set(trimmed.slice(match.dial.length).trim());
    } else {
      this.national.set(trimmed);
    }
  }

  registerOnChange(fn: (v: string) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(_: boolean): void {}
}
