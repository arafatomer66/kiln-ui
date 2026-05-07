import { EnvironmentProviders, inject, makeEnvironmentProviders, provideEnvironmentInitializer } from '@angular/core';
import { KnTheme, KnThemeService } from './theme.service';

export interface KnConfig {
  theme?: KnTheme;
  locale?: 'en' | 'bn';
}

export function provideKilnUI(config: KnConfig = {}): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideEnvironmentInitializer(() => {
      const themeService = inject(KnThemeService);
      themeService.setTheme(config.theme ?? 'light');
    }),
  ]);
}
