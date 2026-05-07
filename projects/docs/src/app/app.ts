import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KnToastContainerComponent } from 'kiln-ui';
import { ShellComponent } from './layout/shell.component';

@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ShellComponent, KnToastContainerComponent],
  template: `
    <app-shell />
    <kn-toast-container position="top-right" />
  `,
  styles: [`
    :host { display: block; }
  `],
})
export class App {}
