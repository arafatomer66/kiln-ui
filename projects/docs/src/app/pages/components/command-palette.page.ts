import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { KnButtonComponent, KnCommand, KnCommandPaletteService, KnToastService } from 'kiln-ui';
import { ApiTableComponent, ApiRow } from '../../shared/api-table.component';
import { ExampleComponent } from '../../shared/example.component';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { CodeBlockComponent } from '../../shared/code-block.component';

@Component({
  selector: 'app-command-palette-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [KnButtonComponent, PageHeaderComponent, ExampleComponent, ApiTableComponent, CodeBlockComponent],
  template: `
    <app-page-header
      eyebrow="ADVANCED"
      title="Command Palette"
      subtitle="A fuzzy-searchable command launcher (think ⌘K) for power users. Group commands, attach shortcuts, run actions on select."
    />

    <h2>Import</h2>
    <app-code-block [code]="importCode" />

    <h2>Examples</h2>

    <app-example title="Open the palette" [code]="usage">
      <kn-button variant="solid" (clicked)="openPalette()">⌘ Open command palette</kn-button>
    </app-example>

    <h2>Service API</h2>
    <app-api-table heading="open() options" [rows]="options" />

    <h2>Command shape</h2>
    <app-code-block [code]="shape" />

    <h2>Tips</h2>
    <ul>
      <li>Wire a global <code>document.addEventListener('keydown', ...)</code> to open on <kbd>⌘K</kbd> / <kbd>Ctrl+K</kbd>.</li>
      <li>Use the <code>group</code> field to create section headings (Navigate, Actions, Settings…).</li>
      <li>Add <code>keywords</code> for fuzzy-match terms that aren't visible in the label.</li>
      <li>Implement <code>run()</code> on each command to execute the action; the palette closes after invoke.</li>
    </ul>
  `,
  styles: [`:host { display: block; color: var(--kn-text); } h2 { font-family: var(--kn-font-display); font-size: var(--kn-fs-2xl); margin: var(--kn-sp-7) 0 var(--kn-sp-3); } li { color: var(--kn-text-muted); line-height: var(--kn-lh-relaxed); } code, kbd { background: var(--kn-surface); padding: 1px 6px; border-radius: var(--kn-r-xs); font-size: var(--kn-fs-sm); font-family: var(--kn-font-mono); } ul { padding-left: var(--kn-sp-5); }`],
})
export class CommandPalettePage {
  private readonly palette = inject(KnCommandPaletteService);
  private readonly toast = inject(KnToastService);
  private readonly router = inject(Router);

  protected openPalette(): void {
    this.palette.open({
      placeholder: 'Type a command…',
      commands: this.commands(),
    });
  }

  private commands(): KnCommand[] {
    return [
      { id: 'home',      group: 'Navigate', label: 'Home',         icon: '◧', shortcut: '⌘ H', run: () => this.router.navigateByUrl('/') },
      { id: 'getting',   group: 'Navigate', label: 'Getting started', icon: '→', run: () => this.router.navigateByUrl('/getting-started') },
      { id: 'theming',   group: 'Navigate', label: 'Theming',      icon: '◐', run: () => this.router.navigateByUrl('/theming') },
      { id: 'showcase',  group: 'Navigate', label: 'Admin showcase', icon: '◇', keywords: ['admin', 'demo'], run: () => this.router.navigateByUrl('/showcase/admin') },

      { id: 'order',     group: 'Actions',  label: 'Create new order',  icon: '⊕', shortcut: '⌘ N', run: () => this.toast.success('New order', 'Would open the new-order dialog.') },
      { id: 'export',    group: 'Actions',  label: 'Export CSV',        icon: '↓', run: () => this.toast.info('Exporting…', 'Your CSV is being prepared.') },
      { id: 'invite',    group: 'Actions',  label: 'Invite teammate',   icon: '+', keywords: ['team', 'add'], run: () => this.toast.info('Invite', 'Would open the invite drawer.') },

      { id: 'theme',     group: 'Settings', label: 'Toggle theme',      icon: '☾', shortcut: '⌘ ⇧ T', run: () => this.toast.info('Theme', 'Toggle handler not wired in this demo.') },
      { id: 'profile',   group: 'Settings', label: 'Open profile',      icon: '◐', run: () => this.toast.info('Profile', 'Would navigate to profile.') },
      { id: 'signout',   group: 'Settings', label: 'Sign out',          icon: '⏻', run: () => this.toast.warn('Signed out', 'See you soon.') },
    ];
  }

  protected readonly importCode = `import { KnCommandPaletteService, KnCommand } from '@kiln/ui';`;

  protected readonly usage = `private readonly palette = inject(KnCommandPaletteService);

openPalette() {
  this.palette.open({
    placeholder: 'Type a command…',
    commands: [
      { id: 'home', group: 'Navigate', label: 'Home', icon: '◧', shortcut: '⌘ H',
        run: () => this.router.navigateByUrl('/') },
      { id: 'new', group: 'Actions', label: 'Create new order', icon: '⊕',
        shortcut: '⌘ N', run: () => this.openNewOrder() },
      // …
    ],
  });
}`;

  protected readonly shape = `interface KnCommand {
  id: string;
  label: string;
  description?: string;
  group?: string;
  icon?: string;
  shortcut?: string;
  keywords?: string[];
  run?(): void;
}`;

  protected readonly options: ApiRow[] = [
    { name: 'commands', type: 'KnCommand[]', default: '[]', description: 'The list of commands to surface.' },
    { name: 'placeholder', type: 'string', default: `'Type a command or search…'`, description: 'Search input placeholder.' },
  ];
}
