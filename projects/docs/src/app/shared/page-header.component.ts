import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="page-header">
      @if (eyebrow()) {
        <div class="page-header__eyebrow">{{ eyebrow() }}</div>
      }
      <h1 class="page-header__title">{{ title() }}</h1>
      @if (subtitle()) {
        <p class="page-header__subtitle">{{ subtitle() }}</p>
      }
    </header>
  `,
  styles: [`
    :host { display: block; }

    .page-header {
      margin-bottom: var(--kn-sp-7);
      padding-bottom: var(--kn-sp-5);
      border-bottom: var(--kn-bw-1) solid var(--kn-border);
    }

    .page-header__eyebrow {
      font-family: var(--kn-font-mono);
      font-size: var(--kn-fs-xs);
      font-weight: var(--kn-fw-bold);
      letter-spacing: var(--kn-tracking-mono);
      text-transform: uppercase;
      color: var(--kn-brand);
      margin-bottom: var(--kn-sp-2);
    }

    .page-header__title {
      font-family: var(--kn-font-display);
      font-size: var(--kn-fs-4xl);
      font-weight: var(--kn-fw-bold);
      letter-spacing: var(--kn-tracking-tight);
      line-height: var(--kn-lh-tight);
      margin: 0 0 var(--kn-sp-2);
      color: var(--kn-text);
    }

    .page-header__subtitle {
      font-size: var(--kn-fs-md);
      color: var(--kn-text-muted);
      margin: 0;
      max-width: 720px;
    }
  `],
})
export class PageHeaderComponent {
  readonly eyebrow = input<string>('');
  readonly title = input<string>('');
  readonly subtitle = input<string>('');
}
