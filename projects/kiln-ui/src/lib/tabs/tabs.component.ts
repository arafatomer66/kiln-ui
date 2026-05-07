import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  TemplateRef,
  contentChildren,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

@Directive({
  selector: '[knTabContent]',
  standalone: true,
})
export class KnTabContentDirective {
  readonly template = inject(TemplateRef<unknown>);
}

@Component({
  selector: 'kn-tab',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-template></ng-template>`,
})
export class KnTabComponent {
  readonly label = input<string>('');
  readonly disabled = input<boolean>(false);

  readonly content = contentChildren(KnTabContentDirective);
}

@Component({
  selector: 'kn-tabs',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
  template: `
    <div class="kn-tabs__list" role="tablist">
      @for (tab of tabs(); track $index; let i = $index) {
        <button
          type="button"
          class="kn-tabs__tab"
          role="tab"
          [id]="tabId(i)"
          [attr.aria-selected]="active() === i"
          [attr.aria-controls]="panelId(i)"
          [class.is-active]="active() === i"
          [disabled]="tab.disabled()"
          (click)="select(i)"
        >
          {{ tab.label() }}
        </button>
      }
    </div>

    <div class="kn-tabs__line" aria-hidden="true"></div>

    @for (tab of tabs(); track $index; let i = $index) {
      @if (active() === i) {
        <div
          class="kn-tabs__panel"
          role="tabpanel"
          [id]="panelId(i)"
          [attr.aria-labelledby]="tabId(i)"
        >
          @for (c of tab.content(); track $index) {
            <ng-container *ngTemplateOutlet="c.template" />
          }
        </div>
      }
    }
  `,
  styles: [`
    :host {
      display: block;
      font-family: var(--kn-font-sans);
    }

    .kn-tabs__list {
      display: flex;
      gap: var(--kn-sp-1);
      margin-bottom: -2px;
    }

    .kn-tabs__tab {
      all: unset;
      cursor: pointer;
      padding: var(--kn-sp-3) var(--kn-sp-4);
      font-family: var(--kn-font-mono);
      font-size: var(--kn-fs-xs);
      font-weight: var(--kn-fw-semibold);
      letter-spacing: var(--kn-tracking-mono);
      text-transform: uppercase;
      color: var(--kn-text-muted);
      border-bottom: 3px solid transparent;
      transition: color var(--kn-dur-fast) var(--kn-ease), border-color var(--kn-dur-fast) var(--kn-ease);

      &:hover { color: var(--kn-text); }
      &:focus-visible { box-shadow: var(--kn-ring); border-radius: var(--kn-r-xs); }
      &[disabled] { opacity: 0.4; cursor: not-allowed; }

      &.is-active {
        color: var(--kn-text);
        font-weight: var(--kn-fw-bold);
        border-bottom-color: var(--kn-brand);
      }
    }

    .kn-tabs__line {
      height: 1px;
      background: var(--kn-border);
    }

    .kn-tabs__panel {
      padding: var(--kn-sp-5) 0;
      animation: kn-tab-in 200ms cubic-bezier(0.2, 0.7, 0.2, 1);
    }

    @keyframes kn-tab-in {
      from { opacity: 0; transform: translateY(4px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  `],
})
export class KnTabsComponent {
  readonly activeIndex = input<number>(0);
  readonly activeChange = output<number>();

  readonly tabs = contentChildren(KnTabComponent);

  readonly active = signal<number>(0);

  constructor() {
    effect(() => {
      this.active.set(this.activeIndex());
    });
  }

  protected select(index: number): void {
    if (this.tabs()[index]?.disabled()) return;
    this.active.set(index);
    this.activeChange.emit(index);
  }

  protected tabId(i: number): string { return `kn-tab-${i}`; }
  protected panelId(i: number): string { return `kn-panel-${i}`; }
}
