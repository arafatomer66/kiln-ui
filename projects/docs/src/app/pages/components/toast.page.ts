import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { KnButtonComponent, KnToastService } from 'kiln-ui';
import { ApiTableComponent, ApiRow } from '../../shared/api-table.component';
import { ExampleComponent } from '../../shared/example.component';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { CodeBlockComponent } from '../../shared/code-block.component';

@Component({
  selector: 'app-toast-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [KnButtonComponent, PageHeaderComponent, ExampleComponent, ApiTableComponent, CodeBlockComponent],
  template: `
    <app-page-header eyebrow="OVERLAY" title="Toast" subtitle="Transient notifications stacked in a corner. Driven by KnToastService — render the container once at app root." />

    <h2>Import</h2>
    <app-code-block [code]="importCode" />

    <h2>Setup</h2>
    <p>Render the container once in your app's root template:</p>
    <app-code-block [code]="setup" />

    <h2>Examples</h2>

    <app-example title="Tones" [code]="tones">
      <kn-button (clicked)="info()">Info</kn-button>
      <kn-button tone="accent" (clicked)="success()">Success</kn-button>
      <kn-button tone="accent" (clicked)="warn()">Warn</kn-button>
      <kn-button tone="danger" (clicked)="danger()">Danger</kn-button>
    </app-example>

    <h2>Service API</h2>
    <app-api-table heading="Methods" [rows]="methods" [showDefault]="false" />
  `,
  styles: [`:host { display: block; color: var(--kn-text); } h2 { font-family: var(--kn-font-display); font-size: var(--kn-fs-2xl); margin: var(--kn-sp-7) 0 var(--kn-sp-3); } p { color: var(--kn-text-muted); }`],
})
export class ToastPage {
  private readonly toast = inject(KnToastService);

  protected info(): void { this.toast.info('Heads up', 'Click anywhere to dismiss this toast.'); }
  protected success(): void { this.toast.success('Saved', 'Project synced to cloud.'); }
  protected warn(): void { this.toast.warn('Slow connection', 'Retrying in 5s…'); }
  protected danger(): void { this.toast.danger('Failed', 'Could not reach the server.'); }

  protected readonly importCode = `import { KnToastService, KnToastContainerComponent } from '@kiln/ui';`;

  protected readonly setup = `// app.ts
@Component({
  imports: [KnToastContainerComponent, RouterOutlet],
  template: \`
    <router-outlet />
    <kn-toast-container position="top-right" />
  \`,
})
export class App {}

// In a feature component:
const toast = inject(KnToastService);
toast.success('Saved', 'All changes synced.');`;

  protected readonly tones = `toast.success('Saved', 'All synced.');
toast.warn('Slow connection');
toast.danger('Failed', 'Could not reach the server.');`;

  protected readonly methods: ApiRow[] = [
    { name: 'show(toast)', type: 'KnToast → number', description: 'Generic show method.' },
    { name: 'info(title, message?, duration?)', type: '→ number', description: 'Show an info toast.' },
    { name: 'success(title, message?, duration?)', type: '→ number', description: 'Show a success toast.' },
    { name: 'warn(title, message?, duration?)', type: '→ number', description: 'Show a warning toast.' },
    { name: 'danger(title, message?, duration?)', type: '→ number', description: 'Show a danger toast.' },
    { name: 'dismiss(id)', type: '→ void', description: 'Dismiss a single toast.' },
    { name: 'clear()', type: '→ void', description: 'Dismiss all toasts.' },
  ];
}
