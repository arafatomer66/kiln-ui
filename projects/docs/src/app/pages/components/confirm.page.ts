import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { KnButtonComponent, KnConfirmService } from 'kiln-ui';
import { ApiTableComponent, ApiRow } from '../../shared/api-table.component';
import { ExampleComponent } from '../../shared/example.component';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { CodeBlockComponent } from '../../shared/code-block.component';

@Component({
  selector: 'app-confirm-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [KnButtonComponent, PageHeaderComponent, ExampleComponent, ApiTableComponent, CodeBlockComponent],
  template: `
    <app-page-header eyebrow="PRO" title="Confirm Dialog" subtitle="Promise-based confirmation modal. confirm.danger() for destructive actions; confirm.warn() for cautions; confirm.info() for benign confirmations." />
    <h2>Import</h2>
    <app-code-block [code]="'import { KnConfirmService } from \\'kiln-ui\\';'" />
    <h2>Examples</h2>
    <app-example title="Danger (delete)" [code]="dangerCode">
      <kn-button tone="danger" (clicked)="onDelete()">Delete project</kn-button>
      @if (lastResult(); as r) {
        <p style="margin: 12px 0 0; font-family: var(--kn-font-mono); font-size: 12px; color: var(--kn-text-muted);">
          Last result: {{ r }}
        </p>
      }
    </app-example>
    <app-example title="Warn" [code]="warnCode">
      <kn-button (clicked)="onUnsaved()">Discard changes?</kn-button>
    </app-example>
    <app-example title="Info" [code]="infoCode">
      <kn-button (clicked)="onPublish()">Publish</kn-button>
    </app-example>
    <h2>Service API</h2>
    <app-api-table heading="Methods (return Promise<boolean>)" [rows]="methods" [showDefault]="false" />
  `,
  styles: [`:host { display: block; color: var(--kn-text); } h2 { font-family: var(--kn-font-display); font-size: var(--kn-fs-2xl); margin: var(--kn-sp-7) 0 var(--kn-sp-3); }`],
})
export class ConfirmPage {
  private readonly confirm = inject(KnConfirmService);
  protected readonly lastResult = signal<string>('');

  protected async onDelete(): Promise<void> {
    const ok = await this.confirm.danger({
      title: 'Delete project?',
      message: 'This permanently removes the project and all 47 of its tasks. This cannot be undone.',
      confirmLabel: 'Delete project',
    });
    this.lastResult.set(ok ? 'confirmed (would delete)' : 'cancelled');
  }

  protected async onUnsaved(): Promise<void> {
    const ok = await this.confirm.warn({
      title: 'Discard changes?',
      message: 'You have unsaved edits that will be lost.',
      confirmLabel: 'Discard',
    });
    this.lastResult.set(ok ? 'discarded' : 'kept');
  }

  protected async onPublish(): Promise<void> {
    const ok = await this.confirm.info({
      title: 'Publish article?',
      message: 'This will make the article visible to all readers immediately.',
      confirmLabel: 'Publish',
    });
    this.lastResult.set(ok ? 'published' : 'cancelled');
  }

  protected readonly dangerCode = `const ok = await confirm.danger({
  title: 'Delete project?',
  message: 'This permanently removes the project and all its tasks.',
  confirmLabel: 'Delete project',
});
if (ok) { /* do the destructive thing */ }`;

  protected readonly warnCode = `await confirm.warn({ title: 'Discard changes?', message: '...' });`;
  protected readonly infoCode = `await confirm.info({ title: 'Publish?', message: '...' });`;

  protected readonly methods: ApiRow[] = [
    { name: 'show(options, tone?)', type: '→ Promise<boolean>', description: 'Generic confirm — pass tone for color treatment.' },
    { name: 'info(options)', type: '→ Promise<boolean>', description: 'Neutral / informational confirm.' },
    { name: 'warn(options)', type: '→ Promise<boolean>', description: 'Cautionary confirm (e.g. discarding changes).' },
    { name: 'danger(options)', type: '→ Promise<boolean>', description: 'Destructive confirm. Default labels: "Delete" / "Cancel".' },
  ];
}
