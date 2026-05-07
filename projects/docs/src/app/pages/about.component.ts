import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KnDividerComponent } from 'kiln-ui';
import { PageHeaderComponent } from '../shared/page-header.component';

@Component({
  selector: 'app-about',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageHeaderComponent, KnDividerComponent],
  template: `
    <app-page-header
      eyebrow="ABOUT"
      title="A library with roots."
      subtitle="Why Kiln UI exists, where the design language comes from, and who's behind it."
    />

    <h2>Why Kiln UI?</h2>
    <p>
      Most component libraries feel placeless — generic Material clones styled in
      grey-and-blue. Kiln UI is an experiment in building tooling with a sense of place:
      a design language rooted in <strong>Bangladeshi visual heritage</strong>, but
      engineered with the modern Angular patterns developers expect today.
    </p>

    <p>
      Three motifs anchor the system:
    </p>

    <ul>
      <li><strong>Jute</strong> — the warm neutrals that define the page surface, drawn from the country's iconic export.</li>
      <li><strong>Nokshi kantha</strong> — geometric corner glyphs and alpana dividers, the embroidered patterns of stitched quilts.</li>
      <li><strong>Dual-script type</strong> — Latin and Bangla pairings (Inter × Hind Siliguri, Fraunces × Tiro Bangla) with matched x-heights.</li>
    </ul>

    <kn-divider variant="alpana" />

    <h2>The author</h2>
    <p>
      Built by <strong>Omer Arafat</strong> in Dhaka, Bangladesh.
      Founder at <a href="https://github.com/arafatomer66/sharedeal-app" target="_blank" rel="noreferrer">ShareDeal</a> — a community-powered group buying platform —
      and a long-time builder of Angular and Flutter products for emerging-market consumers.
    </p>

    <p>
      Get in touch:
    </p>

    <ul>
      <li>GitHub: <a href="https://github.com/arafatomer66" target="_blank" rel="noreferrer">@arafatomer66</a></li>
      <li>Email: <a href="mailto:sharedealnow@gmail.com">sharedealnow&#64;gmail.com</a></li>
    </ul>

    <kn-divider />

    <h2>License &amp; contributing</h2>
    <p>
      Kiln UI is MIT licensed. Issues, feature requests, and pull requests are warmly welcomed —
      see <a href="https://github.com/arafatomer66/kiln-ui/blob/main/CONTRIBUTING.md" target="_blank" rel="noreferrer">CONTRIBUTING.md</a> on GitHub.
    </p>

    <p class="thanks">
      Thanks for stopping by. <span class="bn">যত্নে গড়ো।</span>
    </p>
  `,
  styles: [`
    :host { display: block; color: var(--kn-text); }
    h2 { font-family: var(--kn-font-display); font-size: var(--kn-fs-2xl); margin: var(--kn-sp-7) 0 var(--kn-sp-3); }
    p, li { line-height: var(--kn-lh-relaxed); color: var(--kn-text-muted); }
    strong { color: var(--kn-text); }
    ul { padding-left: var(--kn-sp-5); }
    .thanks { font-family: var(--kn-font-display); font-size: var(--kn-fs-lg); color: var(--kn-text); margin-top: var(--kn-sp-7); }
    .bn { font-style: italic; color: var(--kn-brand); }
  `],
})
export class AboutComponent {}
