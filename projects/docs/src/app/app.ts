import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { KnToastContainerComponent } from 'kiln-ui';
import { GlobalCmdkService } from './shared/global-cmdk.service';

@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, KnToastContainerComponent],
  template: `
    <router-outlet />
    <kn-toast-container position="top-right" />
  `,
  styles: [`
    :host { display: block; min-height: 100vh; }
  `],
})
export class App {
  constructor() {
    inject(GlobalCmdkService).attach(inject(DestroyRef));
  }
}
