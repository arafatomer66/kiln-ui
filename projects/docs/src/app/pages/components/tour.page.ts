import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { KnButtonComponent, KnCardComponent, KnTourService } from 'kiln-ui';
import { ApiTableComponent, ApiRow } from '../../shared/api-table.component';
import { ExampleComponent } from '../../shared/example.component';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { CodeBlockComponent } from '../../shared/code-block.component';

@Component({
  selector: 'app-tour-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [KnButtonComponent, KnCardComponent, PageHeaderComponent, ExampleComponent, ApiTableComponent, CodeBlockComponent],
  template: `
    <app-page-header eyebrow="PRO" title="Tour" subtitle="Coachmark overlay that walks new users through key UI elements. Cuts a hole in the backdrop around the target and pins a tooltip card next to it." />
    <h2>Import</h2>
    <app-code-block [code]="'import { KnTourService, KnTourStep } from \\'kiln-ui\\';'" />
    <h2>Examples</h2>
    <app-example title="Tour 3 elements on this page" [code]="usage">
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <kn-button id="tour-target-1" variant="solid" (clicked)="start()">Start tour</kn-button>
        <kn-card id="tour-target-2" variant="soft" padding="md">
          <strong>Card with motifs</strong>
          <p style="margin: 4px 0 0; color: var(--kn-text-muted); font-size: 14px;">The tour will land here at step 2.</p>
        </kn-card>
        <kn-button id="tour-target-3" variant="outline">Final step lands here</kn-button>
      </div>
    </app-example>
    <h2>Service API</h2>
    <app-api-table heading="Methods" [rows]="methods" [showDefault]="false" />
    <h2>KnTourStep shape</h2>
    <app-code-block [code]="shape" />
  `,
  styles: [`:host { display: block; color: var(--kn-text); } h2 { font-family: var(--kn-font-display); font-size: var(--kn-fs-2xl); margin: var(--kn-sp-7) 0 var(--kn-sp-3); }`],
})
export class TourPage {
  private readonly tour = inject(KnTourService);

  protected start(): void {
    this.tour.start([
      {
        target: '#tour-target-1',
        title: 'Welcome to Kiln UI',
        description: 'Tours like this one are great for onboarding new users without forcing them to read a manual.',
      },
      {
        target: '#tour-target-2',
        title: 'Cards have built-in motifs',
        description: "Notice the corner glyphs on every card — they're inherent to the Kiln design language.",
      },
      {
        target: '#tour-target-3',
        title: 'Click "Done" when finished',
        description: 'Or press Skip at any time. The tour also ends automatically on the last step.',
      },
    ]);
  }

  protected readonly usage = `tour.start([
  { target: '#nav-search',      title: 'Search anywhere',
    description: 'Press ⌘K to open the command palette.' },
  { target: '#nav-notifications', title: 'Notifications',
    description: 'Click the bell to see what\\'s new.' },
  { target: '#nav-user',        title: 'Your account',
    description: 'Profile, settings, and sign-out live here.' },
]);`;

  protected readonly shape = `interface KnTourStep {
  target: string;     // CSS selector
  title: string;
  description: string;
  placement?: 'top' | 'right' | 'bottom' | 'left' | 'auto';
}`;

  protected readonly methods: ApiRow[] = [
    { name: 'start(steps)', type: '→ void', description: 'Start a tour with the given step list.' },
    { name: 'stop()', type: '→ void', description: 'Cancel the tour at any time.' },
  ];
}
