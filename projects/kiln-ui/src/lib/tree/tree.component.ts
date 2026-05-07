import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';

export interface KnTreeNode {
  readonly id: string;
  readonly label: string;
  readonly icon?: string;
  readonly description?: string;
  readonly children?: KnTreeNode[];
  readonly expandable?: boolean;
}

@Component({
  selector: 'kn-tree-node',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div
      class="kn-tree__row"
      [class.is-selected]="selectedId() === node().id"
      [style.padding-left.px]="depth() * 18"
      (click)="select($event)"
    >
      @if (hasChildren()) {
        <button
          type="button"
          class="kn-tree__caret"
          [attr.aria-label]="(expanded() ? 'Collapse ' : 'Expand ') + node().label"
          [attr.aria-expanded]="expanded()"
          (click)="toggle($event)"
        >{{ expanded() ? '▾' : '▸' }}</button>
      } @else {
        <span class="kn-tree__caret kn-tree__caret--leaf" aria-hidden="true">·</span>
      }

      @if (node().icon) {
        <span class="kn-tree__icon" aria-hidden="true">{{ node().icon }}</span>
      }

      <span class="kn-tree__label">{{ node().label }}</span>

      @if (node().description) {
        <span class="kn-tree__desc">{{ node().description }}</span>
      }
    </div>

    @if (hasChildren() && expanded()) {
      @for (child of node().children!; track child.id) {
        <kn-tree-node
          [node]="child"
          [depth]="depth() + 1"
          [selectedId]="selectedId()"
          [defaultExpanded]="defaultExpanded()"
          (selected)="selected.emit($event)"
        />
      }
    }
  `,
  styles: [`
    :host { display: block; }

    .kn-tree__row {
      display: flex;
      align-items: center;
      gap: var(--kn-sp-2);
      padding: 4px var(--kn-sp-3);
      cursor: pointer;
      color: var(--kn-text);
      border-radius: var(--kn-r-xs);
      transition: background var(--kn-dur-fast) var(--kn-ease);
      font-size: var(--kn-fs-base);
    }
    .kn-tree__row:hover { background: var(--kn-surface); }
    .kn-tree__row.is-selected {
      background: var(--kn-info-bg);
      color: var(--kn-brand);
      font-weight: var(--kn-fw-semibold);
    }

    .kn-tree__caret {
      all: unset;
      cursor: pointer;
      width: 16px;
      text-align: center;
      color: var(--kn-text-muted);
      font-size: 11px;
      flex-shrink: 0;
    }
    .kn-tree__caret--leaf { cursor: default; opacity: 0.4; }

    .kn-tree__icon {
      width: 18px;
      text-align: center;
      color: var(--kn-text-muted);
      font-size: 13px;
      flex-shrink: 0;
    }

    .kn-tree__label { flex-shrink: 0; }
    .kn-tree__desc {
      font-size: var(--kn-fs-sm);
      color: var(--kn-text-muted);
      margin-left: var(--kn-sp-2);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  `],
})
export class KnTreeNodeComponent {
  readonly node = input.required<KnTreeNode>();
  readonly depth = input<number>(0);
  readonly selectedId = input<string | null>(null);
  readonly defaultExpanded = input<boolean>(false);

  readonly selected = output<KnTreeNode>();

  protected readonly expanded = signal<boolean>(false);

  protected readonly hasChildren = computed(() => {
    const children = this.node().children;
    return !!(children && children.length > 0);
  });

  constructor() {
    // initialize after node is set via effect-like pattern
    setTimeout(() => this.expanded.set(this.defaultExpanded()), 0);
  }

  protected toggle(event: MouseEvent): void {
    event.stopPropagation();
    this.expanded.update((v) => !v);
  }

  protected select(event: MouseEvent): void {
    if (this.hasChildren()) {
      this.expanded.update((v) => !v);
    }
    this.selected.emit(this.node());
  }
}

@Component({
  selector: 'kn-tree',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [KnTreeNodeComponent],
  template: `
    <div class="kn-tree" role="tree">
      @for (node of nodes(); track node.id) {
        <kn-tree-node
          [node]="node"
          [depth]="0"
          [selectedId]="selectedId()"
          [defaultExpanded]="defaultExpanded()"
          (selected)="onSelect($event)"
        />
      }
    </div>
  `,
  styles: [`
    :host { display: block; font-family: var(--kn-font-sans); }

    .kn-tree {
      padding: var(--kn-sp-2);
      background: var(--kn-bg);
      border: var(--kn-bw-1) solid var(--kn-border);
      border-radius: var(--kn-r-sm);
    }
  `],
})
export class KnTreeComponent {
  readonly nodes = input<KnTreeNode[]>([]);
  readonly defaultExpanded = input<boolean>(false);

  readonly nodeSelected = output<KnTreeNode>();

  readonly selectedId = signal<string | null>(null);

  protected onSelect(node: KnTreeNode): void {
    this.selectedId.set(node.id);
    this.nodeSelected.emit(node);
  }
}
