import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CodeBlockComponent } from './code-block.component';

@Component({
  selector: 'app-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CodeBlockComponent],
  template: `
    <section class="example">
      @if (title()) {
        <h3 class="example__title">{{ title() }}</h3>
      }
      @if (description()) {
        <p class="example__desc">{{ description() }}</p>
      }
      <div class="example__preview">
        <ng-content />
      </div>
      @if (code()) {
        <app-code-block [code]="code()!" />
      }
    </section>
  `,
  styles: [`
    :host { display: block; margin: var(--kn-sp-6) 0; }

    .example__title {
      font-family: var(--kn-font-display);
      font-size: var(--kn-fs-lg);
      font-weight: var(--kn-fw-bold);
      margin: 0 0 var(--kn-sp-2);
      color: var(--kn-text);
    }

    .example__desc {
      color: var(--kn-text-muted);
      font-size: var(--kn-fs-base);
      margin: 0 0 var(--kn-sp-3);
    }

    .example__preview {
      padding: var(--kn-sp-7) var(--kn-sp-6);
      background: var(--kn-surface);
      border: var(--kn-bw-2) solid var(--kn-border-strong);
      border-radius: var(--kn-r-sm);
      box-shadow: var(--kn-shadow-stamp);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      gap: var(--kn-sp-3);
    }
  `],
})
export class ExampleComponent {
  readonly title = input<string>('');
  readonly description = input<string>('');
  readonly code = input<string | null>(null);
}
