import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-code-block',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="code-block">
      @if (filename()) {
        <div class="code-block__header">
          <span class="code-block__filename">{{ filename() }}</span>
          <button
            type="button"
            class="code-block__copy"
            [class.is-copied]="copied()"
            [disabled]="copied()"
            (click)="copy()"
          >{{ copied() ? '✓ Copied' : 'Copy' }}</button>
        </div>
      } @else {
        <button
          type="button"
          class="code-block__copy code-block__copy--floating"
          [class.is-copied]="copied()"
          (click)="copy()"
        >{{ copied() ? '✓' : 'Copy' }}</button>
      }
      <pre><code>{{ code() }}</code></pre>
    </div>
  `,
  styles: [`
    :host { display: block; margin: var(--kn-sp-3) 0; }

    .code-block {
      position: relative;
      background: var(--kn-jute-900);
      color: var(--kn-jute-50);
      border: var(--kn-bw-2) solid var(--kn-border-strong);
      border-radius: var(--kn-r-sm);
      box-shadow: var(--kn-shadow-stamp);
      overflow: hidden;
    }

    .code-block__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--kn-sp-2) var(--kn-sp-3);
      background: rgba(255, 255, 255, 0.04);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }

    .code-block__filename {
      font-family: var(--kn-font-mono);
      font-size: var(--kn-fs-xs);
      letter-spacing: var(--kn-tracking-mono);
      color: var(--kn-jute-300);
      text-transform: uppercase;
    }

    .code-block__copy {
      all: unset;
      cursor: pointer;
      font-family: var(--kn-font-mono);
      font-size: var(--kn-fs-xs);
      font-weight: var(--kn-fw-bold);
      letter-spacing: var(--kn-tracking-mono);
      text-transform: uppercase;
      color: var(--kn-jute-300);
      padding: 4px var(--kn-sp-2);
      border-radius: var(--kn-r-xs);
      transition: color var(--kn-dur-fast) var(--kn-ease), background var(--kn-dur-fast) var(--kn-ease);
    }

    .code-block__copy:hover { color: var(--kn-jute-50); background: rgba(255, 255, 255, 0.08); }
    .code-block__copy.is-copied { color: var(--kn-success); }

    .code-block__copy--floating {
      position: absolute;
      top: var(--kn-sp-2);
      right: var(--kn-sp-2);
    }

    pre {
      margin: 0;
      padding: var(--kn-sp-4);
      overflow-x: auto;
      font-family: var(--kn-font-mono);
      font-size: 13px;
      line-height: 1.6;
    }

    code { background: transparent; }
  `],
})
export class CodeBlockComponent {
  readonly code = input<string>('');
  readonly filename = input<string>('');
  readonly language = input<string>('typescript');

  readonly copied = signal<boolean>(false);

  protected async copy(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.code());
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 1800);
    } catch {
      // ignore — clipboard not available
    }
  }
}
