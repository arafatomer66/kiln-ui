import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type KnPageStateKind =
  | 'not-found'      // 404
  | 'unauthorized'   // 401
  | 'forbidden'      // 403
  | 'server-error'   // 500
  | 'maintenance'
  | 'no-permission'
  | 'offline'
  | 'empty'
  | 'custom';

interface PageStateConfig {
  glyph: string;
  title: string;
  description: string;
}

const PRESETS: Record<Exclude<KnPageStateKind, 'custom'>, PageStateConfig> = {
  'not-found':     { glyph: '404', title: 'Page not found',         description: "The page you're looking for doesn't exist or has been moved." },
  'unauthorized':  { glyph: '401', title: 'Sign in required',       description: 'You need to be signed in to view this page.' },
  'forbidden':     { glyph: '403', title: 'Forbidden',              description: 'You don\'t have permission to view this resource.' },
  'server-error':  { glyph: '500', title: 'Something went wrong',   description: 'We hit an unexpected error. Please try again in a moment.' },
  'maintenance':   { glyph: '⚙',  title: 'Under maintenance',      description: "We're making things better. We'll be back shortly." },
  'no-permission': { glyph: '🔒', title: 'Access restricted',      description: 'This area is restricted to certain roles in your workspace.' },
  'offline':       { glyph: '⚡', title: "You're offline",          description: 'Check your connection and try again.' },
  'empty':         { glyph: '❖',  title: 'Nothing here yet',        description: 'Once data exists, it will appear here.' },
};

@Component({
  selector: 'kn-page-state',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="kn-ps">
      <div class="kn-ps__motif" aria-hidden="true">
        <span class="kn-ps__corner kn-ps__corner--tl">❖</span>
        <span class="kn-ps__corner kn-ps__corner--tr">❖</span>
        <span class="kn-ps__corner kn-ps__corner--bl">❖</span>
        <span class="kn-ps__corner kn-ps__corner--br">❖</span>
        <div class="kn-ps__glyph">{{ glyph() }}</div>
      </div>

      <h1 class="kn-ps__title">{{ resolvedTitle() }}</h1>
      <p class="kn-ps__desc">{{ resolvedDescription() }}</p>

      <div class="kn-ps__actions">
        <ng-content />
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: var(--kn-font-sans); }

    .kn-ps {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: var(--kn-sp-12) var(--kn-sp-6);
      color: var(--kn-text);
    }

    .kn-ps__motif {
      position: relative;
      width: 160px;
      height: 160px;
      margin-bottom: var(--kn-sp-6);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border: var(--kn-bw-2) solid var(--kn-border-strong);
      border-radius: var(--kn-r-sm);
      background: var(--kn-surface);
      box-shadow: var(--kn-shadow-stamp);
    }

    .kn-ps__corner {
      position: absolute;
      width: 16px;
      height: 16px;
      color: var(--kn-brand);
      font-size: 18px;
      line-height: 1;
    }
    .kn-ps__corner--tl { top: -8px; left: -8px; }
    .kn-ps__corner--tr { top: -8px; right: -8px; }
    .kn-ps__corner--bl { bottom: -8px; left: -8px; }
    .kn-ps__corner--br { bottom: -8px; right: -8px; }

    .kn-ps__glyph {
      font-family: var(--kn-font-display);
      font-size: 64px;
      font-weight: var(--kn-fw-bold);
      color: var(--kn-brand);
      letter-spacing: var(--kn-tracking-tight);
    }

    .kn-ps__title {
      font-family: var(--kn-font-display);
      font-size: var(--kn-fs-3xl);
      font-weight: var(--kn-fw-bold);
      letter-spacing: var(--kn-tracking-tight);
      margin: 0 0 var(--kn-sp-3);
    }

    .kn-ps__desc {
      max-width: 480px;
      color: var(--kn-text-muted);
      font-size: var(--kn-fs-md);
      line-height: var(--kn-lh-relaxed);
      margin: 0 0 var(--kn-sp-7);
    }

    .kn-ps__actions {
      display: flex;
      gap: var(--kn-sp-3);
      flex-wrap: wrap;
      justify-content: center;
    }
  `],
})
export class KnPageStateComponent {
  readonly kind = input<KnPageStateKind>('not-found');
  readonly title = input<string>('');
  readonly description = input<string>('');
  readonly glyphOverride = input<string>('', { alias: 'glyph' });

  readonly preset = computed<PageStateConfig | null>(() => {
    const k = this.kind();
    if (k === 'custom') return null;
    return PRESETS[k];
  });

  readonly glyph = computed(() => this.glyphOverride() || this.preset()?.glyph || '❖');
  readonly resolvedTitle = computed(() => this.title() || this.preset()?.title || 'Something is missing');
  readonly resolvedDescription = computed(() => this.description() || this.preset()?.description || '');
}
