import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { KnButtonComponent, KnLoadingBarService } from 'kiln-ui';
import { ApiTableComponent, ApiRow } from '../../shared/api-table.component';
import { ExampleComponent } from '../../shared/example.component';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { CodeBlockComponent } from '../../shared/code-block.component';

@Component({
  selector: 'app-loading-bar-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [KnButtonComponent, PageHeaderComponent, ExampleComponent, ApiTableComponent, CodeBlockComponent],
  template: `
    <app-page-header eyebrow="PRO" title="Loading Bar" subtitle="GitHub/YouTube-style top-of-page progress bar. Service-driven; render once at app root." />
    <h2>Setup</h2>
    <p>Render the bar once in your root component template:</p>
    <app-code-block [code]="setup" />
    <h2>Examples</h2>
    <app-example title="Trigger from anywhere" [code]="usage">
      <kn-button (clicked)="run()">Simulate slow nav</kn-button>
    </app-example>
    <h2>Service API</h2>
    <app-api-table heading="Methods" [rows]="methods" [showDefault]="false" />
  `,
  styles: [`:host { display: block; color: var(--kn-text); } h2 { font-family: var(--kn-font-display); font-size: var(--kn-fs-2xl); margin: var(--kn-sp-7) 0 var(--kn-sp-3); } p { color: var(--kn-text-muted); }`],
})
export class LoadingBarPage {
  private readonly bar = inject(KnLoadingBarService);

  protected run(): void {
    this.bar.start();
    setTimeout(() => this.bar.complete(), 1500);
  }

  protected readonly setup = `// app.ts
@Component({
  imports: [KnLoadingBarComponent, RouterOutlet],
  template: \`
    <kn-loading-bar />
    <router-outlet />
  \`,
})
export class App {}

// In a feature:
const bar = inject(KnLoadingBarService);
bar.start();
// ...your async work...
bar.complete();`;

  protected readonly usage = `bar.start();         // begins climb
bar.set(60);         // jump to specific %
bar.complete();      // finishes (animates to 100, fades)
bar.cancel();        // abort silently`;

  protected readonly methods: ApiRow[] = [
    { name: 'start()', type: '→ void', description: 'Begin progress (climbs organically toward 90%).' },
    { name: 'set(progress)', type: '→ void', description: 'Jump to a specific percentage (0-100).' },
    { name: 'complete()', type: '→ void', description: 'Finish — animates to 100% and fades.' },
    { name: 'cancel()', type: '→ void', description: 'Abort without animating to 100%.' },
  ];
}
