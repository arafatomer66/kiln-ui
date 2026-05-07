import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  computed,
  inject,
  signal,
} from '@angular/core';

export interface KnCommand {
  readonly id: string;
  readonly label: string;
  readonly description?: string;
  readonly group?: string;
  readonly icon?: string;
  readonly shortcut?: string;
  readonly keywords?: string[];
  run?(): void;
}

interface CmdGroup {
  heading: string;
  items: KnCommand[];
}

@Component({
  selector: 'kn-command-palette',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="kn-cmd" role="dialog" aria-label="Command palette">
      <header class="kn-cmd__head">
        <span class="kn-cmd__icon" aria-hidden="true">⌕</span>
        <input
          #input
          class="kn-cmd__input"
          type="text"
          [placeholder]="data.placeholder ?? 'Type a command or search…'"
          [value]="search()"
          (input)="onInput($event)"
          (keydown)="onKeydown($event)"
          autofocus
          aria-label="Command search"
        />
        <kbd class="kn-cmd__kbd">esc</kbd>
      </header>

      <div class="kn-cmd__body">
        @if (groups().length === 0) {
          <div class="kn-cmd__empty">
            <span class="kn-cmd__empty-glyph" aria-hidden="true">❖</span>
            <p>No matches for "{{ search() }}".</p>
          </div>
        } @else {
          @for (group of groups(); track group.heading) {
            <div class="kn-cmd__group">
              <div class="kn-cmd__group-heading">{{ group.heading }}</div>
              @for (item of group.items; track item.id; let i = $index) {
                <button
                  type="button"
                  class="kn-cmd__item"
                  [class.is-active]="globalIndex(group, i) === activeIndex()"
                  (mouseenter)="activeIndex.set(globalIndex(group, i))"
                  (click)="commit(item)"
                >
                  @if (item.icon) {
                    <span class="kn-cmd__item-icon" aria-hidden="true">{{ item.icon }}</span>
                  }
                  <span class="kn-cmd__item-body">
                    <span class="kn-cmd__item-label">{{ item.label }}</span>
                    @if (item.description) {
                      <span class="kn-cmd__item-desc">{{ item.description }}</span>
                    }
                  </span>
                  @if (item.shortcut) {
                    <kbd class="kn-cmd__kbd">{{ item.shortcut }}</kbd>
                  }
                </button>
              }
            </div>
          }
        }
      </div>

      <footer class="kn-cmd__foot">
        <span><kbd class="kn-cmd__kbd kn-cmd__kbd--inline">↑</kbd> <kbd class="kn-cmd__kbd kn-cmd__kbd--inline">↓</kbd> navigate</span>
        <span><kbd class="kn-cmd__kbd kn-cmd__kbd--inline">↵</kbd> select</span>
        <span><kbd class="kn-cmd__kbd kn-cmd__kbd--inline">esc</kbd> close</span>
      </footer>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: var(--kn-font-sans); }

    .kn-cmd {
      background: var(--kn-bg);
      color: var(--kn-text);
      border: var(--kn-bw-2) solid var(--kn-border-strong);
      border-radius: var(--kn-r-sm);
      box-shadow: var(--kn-shadow-stamp-strong);
      overflow: hidden;
      animation: kn-cmd-in 200ms cubic-bezier(0.2, 0.7, 0.2, 1);
    }

    @keyframes kn-cmd-in {
      from { opacity: 0; transform: translateY(-8px) scale(0.98); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }

    .kn-cmd__head {
      display: flex;
      align-items: center;
      gap: var(--kn-sp-3);
      padding: var(--kn-sp-3) var(--kn-sp-4);
      border-bottom: var(--kn-bw-1) solid var(--kn-border);
    }

    .kn-cmd__icon { color: var(--kn-text-muted); font-size: 18px; }

    .kn-cmd__input {
      flex: 1;
      background: transparent;
      border: none;
      outline: none;
      color: var(--kn-text);
      font-size: var(--kn-fs-md);
      font-family: inherit;
      padding: 4px 0;
    }
    .kn-cmd__input::placeholder { color: var(--kn-text-muted); }

    .kn-cmd__body {
      max-height: 50vh;
      overflow-y: auto;
      padding: var(--kn-sp-2);
    }

    .kn-cmd__empty {
      text-align: center;
      padding: var(--kn-sp-9) var(--kn-sp-4);
      color: var(--kn-text-muted);
    }
    .kn-cmd__empty-glyph { display: block; font-size: 32px; color: var(--kn-jute-300); margin-bottom: var(--kn-sp-3); }

    .kn-cmd__group { margin-bottom: var(--kn-sp-3); }

    .kn-cmd__group-heading {
      font-family: var(--kn-font-mono);
      font-size: var(--kn-fs-xs);
      font-weight: var(--kn-fw-bold);
      letter-spacing: var(--kn-tracking-mono);
      text-transform: uppercase;
      color: var(--kn-text-muted);
      padding: var(--kn-sp-2) var(--kn-sp-3) var(--kn-sp-1);
    }

    .kn-cmd__item {
      all: unset;
      cursor: pointer;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      gap: var(--kn-sp-3);
      width: 100%;
      padding: var(--kn-sp-3);
      border-radius: var(--kn-r-xs);
      color: var(--kn-text);
      transition: background var(--kn-dur-fast) var(--kn-ease);
    }
    .kn-cmd__item.is-active { background: var(--kn-info-bg); }

    .kn-cmd__item-icon {
      width: 20px;
      text-align: center;
      color: var(--kn-text-muted);
      font-size: 14px;
      flex-shrink: 0;
    }
    .kn-cmd__item-body { flex: 1; min-width: 0; display: flex; flex-direction: column; }
    .kn-cmd__item-label { font-size: var(--kn-fs-base); font-weight: var(--kn-fw-medium); }
    .kn-cmd__item-desc {
      font-size: var(--kn-fs-xs);
      color: var(--kn-text-muted);
      margin-top: 2px;
    }

    .kn-cmd__foot {
      display: flex;
      gap: var(--kn-sp-4);
      padding: var(--kn-sp-2) var(--kn-sp-4);
      background: var(--kn-surface);
      border-top: var(--kn-bw-1) solid var(--kn-border);
      font-size: var(--kn-fs-xs);
      color: var(--kn-text-muted);
    }

    .kn-cmd__kbd {
      font-family: var(--kn-font-mono);
      font-size: 10px;
      font-weight: var(--kn-fw-bold);
      letter-spacing: var(--kn-tracking-mono);
      padding: 2px 6px;
      background: var(--kn-bg);
      border: var(--kn-bw-1) solid var(--kn-border);
      border-radius: var(--kn-r-xs);
      color: var(--kn-text-muted);
    }
    .kn-cmd__kbd--inline { padding: 1px 4px; font-size: 10px; }
  `],
})
export class KnCommandPaletteComponent implements AfterViewInit {
  protected readonly data = inject<{ commands: KnCommand[]; placeholder?: string }>(DIALOG_DATA);
  private readonly dialogRef = inject<DialogRef<KnCommand | undefined>>(DialogRef);

  protected readonly search = signal('');
  protected readonly activeIndex = signal(0);

  @ViewChild('input', { static: true }) private inputRef!: ElementRef<HTMLInputElement>;

  protected readonly filtered = computed<KnCommand[]>(() => {
    const term = this.search().toLowerCase().trim();
    if (!term) return this.data.commands;
    return this.data.commands.filter((c) => {
      if (c.label.toLowerCase().includes(term)) return true;
      if (c.description?.toLowerCase().includes(term)) return true;
      return c.keywords?.some((k) => k.toLowerCase().includes(term)) ?? false;
    });
  });

  protected readonly groups = computed<CmdGroup[]>(() => {
    const items = this.filtered();
    const map = new Map<string, KnCommand[]>();
    for (const item of items) {
      const heading = item.group ?? 'Commands';
      const list = map.get(heading) ?? [];
      list.push(item);
      map.set(heading, list);
    }
    return Array.from(map.entries()).map(([heading, items]) => ({ heading, items }));
  });

  protected readonly flatItems = computed<KnCommand[]>(() => this.groups().flatMap((g) => g.items));

  ngAfterViewInit(): void {
    queueMicrotask(() => this.inputRef.nativeElement.focus());
  }

  protected onInput(event: Event): void {
    this.search.set((event.target as HTMLInputElement).value);
    this.activeIndex.set(0);
  }

  protected onKeydown(event: KeyboardEvent): void {
    const items = this.flatItems();
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.activeIndex.update((i) => Math.min(i + 1, items.length - 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.activeIndex.update((i) => Math.max(i - 1, 0));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      const item = items[this.activeIndex()];
      if (item) this.commit(item);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      this.dialogRef.close();
    }
  }

  protected commit(item: KnCommand): void {
    item.run?.();
    this.dialogRef.close(item);
  }

  protected globalIndex(group: CmdGroup, indexInGroup: number): number {
    let count = 0;
    for (const g of this.groups()) {
      if (g.heading === group.heading) return count + indexInGroup;
      count += g.items.length;
    }
    return -1;
  }
}
