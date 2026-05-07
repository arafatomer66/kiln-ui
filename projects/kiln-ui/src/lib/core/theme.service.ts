import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';

export type KnTheme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class KnThemeService {
  private readonly doc = inject(DOCUMENT);
  readonly theme = signal<KnTheme>('light');

  setTheme(theme: KnTheme): void {
    this.theme.set(theme);
    this.doc.documentElement.setAttribute('data-kn-theme', theme);
  }

  toggle(): void {
    this.setTheme(this.theme() === 'light' ? 'dark' : 'light');
  }
}
