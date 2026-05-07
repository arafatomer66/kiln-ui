import { ChangeDetectionStrategy, Component, ViewChild, signal } from '@angular/core';
import { KnPullToRefreshComponent } from 'kiln-ui';
import { ApiTableComponent, ApiRow } from '../../shared/api-table.component';
import { ExampleComponent } from '../../shared/example.component';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { CodeBlockComponent } from '../../shared/code-block.component';

@Component({
  selector: 'app-pull-to-refresh-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [KnPullToRefreshComponent, PageHeaderComponent, ExampleComponent, ApiTableComponent, CodeBlockComponent],
  template: `
    <app-page-header eyebrow="PRO" title="Pull to Refresh" subtitle="Touch gesture wrapper for mobile lists. Detects downward pulls when scrolled to top, fires (refreshTriggered), and you call complete() when done." />
    <h2>Import</h2>
    <app-code-block [code]="'import { KnPullToRefreshComponent } from \\'kiln-ui\\';'" />
    <h2>Examples</h2>
    <app-example title="List with pull-to-refresh (mobile only)" [code]="usage">
      <div style="width: 100%; max-width: 360px; height: 240px; border: 2px solid var(--kn-border-strong); border-radius: 4px; overflow: auto;">
        <kn-pull-to-refresh #ptr (refreshTriggered)="onRefresh(ptr)">
          <ul style="list-style: none; padding: 16px; margin: 0; display: flex; flex-direction: column; gap: 8px;">
            @for (n of items(); track n) {
              <li style="padding: 12px; background: var(--kn-surface); border-radius: 4px;">Item {{ n }}</li>
            }
          </ul>
        </kn-pull-to-refresh>
      </div>
      <p style="font-size: 12px; color: var(--kn-text-muted); margin-top: 8px;">On a touch device: pull down at the top of the list. On desktop, this gesture isn't triggered.</p>
    </app-example>
    <h2>API</h2>
    <app-api-table heading="Inputs" [rows]="inputs" />
    <app-api-table heading="Outputs" [rows]="outputs" [showDefault]="false" />
    <app-api-table heading="Methods" [rows]="methods" [showDefault]="false" />
  `,
  styles: [`:host { display: block; color: var(--kn-text); } h2 { font-family: var(--kn-font-display); font-size: var(--kn-fs-2xl); margin: var(--kn-sp-7) 0 var(--kn-sp-3); }`],
})
export class PullToRefreshPage {
  protected readonly items = signal([1, 2, 3, 4, 5, 6, 7, 8]);

  protected onRefresh(ptr: KnPullToRefreshComponent): void {
    setTimeout(() => {
      this.items.update((list) => [list[0] - 1, ...list]);
      ptr.complete();
    }, 1200);
  }

  protected readonly usage = `<kn-pull-to-refresh #ptr (refreshTriggered)="onRefresh(ptr)">
  <ul>
    @for (item of items(); track item.id) {
      <li>{{ item.title }}</li>
    }
  </ul>
</kn-pull-to-refresh>

onRefresh(ptr: KnPullToRefreshComponent) {
  this.api.fetchLatest().subscribe(items => {
    this.items.set(items);
    ptr.complete();
  });
}`;

  protected readonly inputs: ApiRow[] = [
    { name: 'threshold', type: 'number', default: '64', description: 'Pixels to pull before triggering refresh.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the gesture entirely.' },
  ];
  protected readonly outputs: ApiRow[] = [
    { name: 'refreshTriggered', type: 'EventEmitter<void>', description: 'Fires when the user releases past the threshold.' },
  ];
  protected readonly methods: ApiRow[] = [
    { name: 'complete()', type: '→ void', description: 'Call when your async refresh is done — collapses the indicator.' },
  ];
}
