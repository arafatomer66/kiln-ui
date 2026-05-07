import { DOCUMENT } from '@angular/common';
import { DestroyRef, Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { KnCommand, KnCommandPaletteService, KnThemeService, KnToastService } from 'kiln-ui';

@Injectable({ providedIn: 'root' })
export class GlobalCmdkService {
  private readonly doc = inject(DOCUMENT);
  private readonly palette = inject(KnCommandPaletteService);
  private readonly router = inject(Router);
  private readonly theme = inject(KnThemeService);
  private readonly toast = inject(KnToastService);
  private listening = false;

  /** Call once at app start to attach the global ⌘K / Ctrl+K shortcut. */
  attach(destroyRef: DestroyRef): void {
    if (this.listening) return;
    this.listening = true;

    fromEvent<KeyboardEvent>(this.doc, 'keydown')
      .pipe(takeUntilDestroyed(destroyRef))
      .subscribe((event) => {
        const trigger = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k';
        if (!trigger) return;
        event.preventDefault();
        this.open();
      });
  }

  open(): void {
    this.palette.open({
      placeholder: 'Type a command, or jump to anywhere…',
      commands: this.commands(),
    });
  }

  private commands(): KnCommand[] {
    return [
      // Navigate
      { id: 'home',         group: 'Navigate', label: 'Home',                  icon: '◧', run: () => this.router.navigateByUrl('/') },
      { id: 'getting',      group: 'Navigate', label: 'Getting started',       icon: '→', keywords: ['install', 'setup', 'quickstart'], run: () => this.router.navigateByUrl('/getting-started') },
      { id: 'theming',      group: 'Navigate', label: 'Theming',               icon: '◐', keywords: ['tokens', 'css'], run: () => this.router.navigateByUrl('/theming') },
      { id: 'showcase',     group: 'Navigate', label: 'Admin showcase',        icon: '◇', keywords: ['demo', 'admin'], run: () => this.router.navigateByUrl('/showcase/admin') },
      { id: 'about',        group: 'Navigate', label: 'About',                 icon: '◯', run: () => this.router.navigateByUrl('/about') },

      // Components — quick jump
      { id: 'c-button',     group: 'Components', label: 'Button',              icon: '▣', run: () => this.router.navigateByUrl('/components/button') },
      { id: 'c-input',      group: 'Components', label: 'Input',               icon: '▢', run: () => this.router.navigateByUrl('/components/input') },
      { id: 'c-card',       group: 'Components', label: 'Card',                icon: '▦', run: () => this.router.navigateByUrl('/components/card') },
      { id: 'c-modal',      group: 'Components', label: 'Modal',               icon: '◫', run: () => this.router.navigateByUrl('/components/modal') },
      { id: 'c-table',      group: 'Components', label: 'Table',               icon: '⊞', run: () => this.router.navigateByUrl('/components/table') },
      { id: 'c-cmd',        group: 'Components', label: 'Command Palette',     icon: '⌘', run: () => this.router.navigateByUrl('/components/command-palette') },
      { id: 'c-otp',        group: 'Components', label: 'OTP Input',           icon: '#', run: () => this.router.navigateByUrl('/components/otp-input') },
      { id: 'c-phone',      group: 'Components', label: 'Phone Input',         icon: '☏', run: () => this.router.navigateByUrl('/components/phone-input') },

      // Actions
      { id: 'theme-toggle', group: 'Actions',  label: 'Toggle dark / light theme', icon: '☾', shortcut: '⌘ ⇧ T',
        run: () => { this.theme.toggle(); this.toast.info('Theme', `Switched to ${this.theme.theme()}.`); } },
      { id: 'github',       group: 'Actions',  label: 'Open GitHub repo',      icon: '↗',
        run: () => window.open('https://github.com/arafatomer66/kiln-ui', '_blank') },
      { id: 'issue',        group: 'Actions',  label: 'Report an issue',       icon: '!',
        run: () => window.open('https://github.com/arafatomer66/kiln-ui/issues/new', '_blank') },
    ];
  }
}
