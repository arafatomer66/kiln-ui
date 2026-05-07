import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export interface ApiRow {
  readonly name: string;
  readonly type: string;
  readonly default?: string;
  readonly description: string;
}

@Component({
  selector: 'app-api-table',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="api-table">
      <h4 class="api-table__heading">{{ heading() }}</h4>
      @if (rows().length) {
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              @if (showDefault()) { <th>Default</th> }
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            @for (row of rows(); track row.name) {
              <tr>
                <td><code>{{ row.name }}</code></td>
                <td><code>{{ row.type }}</code></td>
                @if (showDefault()) { <td><code>{{ row.default ?? '—' }}</code></td> }
                <td>{{ row.description }}</td>
              </tr>
            }
          </tbody>
        </table>
      } @else {
        <p class="api-table__empty">No {{ heading().toLowerCase() }}.</p>
      }
    </div>
  `,
  styles: [`
    :host { display: block; margin: var(--kn-sp-5) 0; }

    .api-table__heading {
      font-family: var(--kn-font-display);
      font-size: var(--kn-fs-lg);
      font-weight: var(--kn-fw-bold);
      margin: 0 0 var(--kn-sp-3);
      color: var(--kn-text);
    }

    table {
      width: 100%;
      border-collapse: collapse;
      border: var(--kn-bw-2) solid var(--kn-border-strong);
      border-radius: var(--kn-r-sm);
      overflow: hidden;
      box-shadow: var(--kn-shadow-stamp);
    }

    th, td {
      padding: var(--kn-sp-3) var(--kn-sp-4);
      text-align: left;
      border-bottom: var(--kn-bw-1) solid var(--kn-border);
      font-size: var(--kn-fs-sm);
      vertical-align: top;
    }

    th {
      font-family: var(--kn-font-mono);
      font-size: var(--kn-fs-xs);
      font-weight: var(--kn-fw-bold);
      letter-spacing: var(--kn-tracking-mono);
      text-transform: uppercase;
      background: var(--kn-surface);
      color: var(--kn-text-muted);
    }

    tbody tr:last-child td { border-bottom: none; }

    code {
      background: var(--kn-surface);
      padding: 1px 6px;
      border-radius: var(--kn-r-xs);
      font-size: var(--kn-fs-sm);
    }

    .api-table__empty { color: var(--kn-text-muted); font-style: italic; font-size: var(--kn-fs-sm); }
  `],
})
export class ApiTableComponent {
  readonly heading = input<string>('Inputs');
  readonly rows = input<ApiRow[]>([]);
  readonly showDefault = input<boolean>(true);
}
