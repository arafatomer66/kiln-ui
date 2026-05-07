import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  input,
  output,
  signal,
} from '@angular/core';

export interface KnFileItem {
  readonly id: string;
  readonly file: File;
  readonly name: string;
  readonly size: number;
  readonly type: string;
  progress: number;        // 0–100
  status: 'pending' | 'uploading' | 'complete' | 'error';
  errorMessage?: string;
}

let nextItemId = 0;

@Component({
  selector: 'kn-file-upload',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="kn-fu"
      [attr.data-active]="active() ? 'true' : null"
      [attr.data-disabled]="disabled() ? 'true' : null"
      (click)="trigger()"
      (keydown.enter)="trigger()"
      (keydown.space)="trigger()"
      (dragover)="onDragOver($event)"
      (dragleave)="onDragLeave($event)"
      (drop)="onDrop($event)"
      role="button"
      tabindex="0"
      [attr.aria-label]="ariaLabel()"
    >
      <input
        #input
        class="kn-fu__input"
        type="file"
        [accept]="accept()"
        [multiple]="multiple()"
        [disabled]="disabled()"
        (change)="onChange($event)"
      />

      <div class="kn-fu__icon" aria-hidden="true">↑</div>
      <div class="kn-fu__label">{{ label() }}</div>
      <div class="kn-fu__hint">
        {{ active() ? 'Drop to upload' : hint() }}
      </div>
    </div>

    @if (items().length > 0) {
      <ul class="kn-fu__list">
        @for (item of items(); track item.id) {
          <li class="kn-fu__item" [attr.data-status]="item.status">
            <div class="kn-fu__item-icon" aria-hidden="true">
              {{ iconFor(item.type) }}
            </div>
            <div class="kn-fu__item-body">
              <div class="kn-fu__item-name">{{ item.name }}</div>
              <div class="kn-fu__item-meta">
                {{ formatSize(item.size) }}
                @if (item.status === 'uploading') {
                  · {{ item.progress }}%
                } @else if (item.status === 'complete') {
                  · Done
                } @else if (item.status === 'error' && item.errorMessage) {
                  · {{ item.errorMessage }}
                }
              </div>
              @if (item.status === 'uploading') {
                <div class="kn-fu__bar"><div class="kn-fu__bar-fill" [style.width.%]="item.progress"></div></div>
              }
            </div>
            <button type="button" class="kn-fu__remove" aria-label="Remove" (click)="remove(item, $event)">×</button>
          </li>
        }
      </ul>
    }
  `,
  styles: [`
    :host { display: block; font-family: var(--kn-font-sans); }

    .kn-fu {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--kn-sp-2);
      padding: var(--kn-sp-7) var(--kn-sp-4);
      background: var(--kn-surface);
      border: var(--kn-bw-2) dashed var(--kn-border-strong);
      border-radius: var(--kn-r-sm);
      cursor: pointer;
      transition: background var(--kn-dur-fast) var(--kn-ease), border-color var(--kn-dur-fast) var(--kn-ease);
      text-align: center;
      color: var(--kn-text);
    }

    .kn-fu:hover { background: var(--kn-surface-alt); }
    .kn-fu:focus-visible { box-shadow: var(--kn-ring); outline: none; }

    .kn-fu[data-active='true'] {
      background: var(--kn-info-bg);
      border-color: var(--kn-brand);
      border-style: solid;
    }

    .kn-fu[data-disabled='true'] {
      opacity: 0.6;
      cursor: not-allowed;
      pointer-events: none;
    }

    .kn-fu__input { display: none; }

    .kn-fu__icon {
      width: 36px;
      height: 36px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: var(--kn-bg);
      border: var(--kn-bw-2) solid var(--kn-border-strong);
      border-radius: 50%;
      color: var(--kn-brand);
      font-size: 18px;
      font-weight: var(--kn-fw-bold);
    }

    .kn-fu__label {
      font-size: var(--kn-fs-md);
      font-weight: var(--kn-fw-semibold);
    }

    .kn-fu__hint {
      font-size: var(--kn-fs-sm);
      color: var(--kn-text-muted);
    }

    .kn-fu__list {
      list-style: none;
      margin: var(--kn-sp-3) 0 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: var(--kn-sp-2);
    }

    .kn-fu__item {
      display: flex;
      align-items: center;
      gap: var(--kn-sp-3);
      padding: var(--kn-sp-3);
      background: var(--kn-bg);
      border: var(--kn-bw-1) solid var(--kn-border);
      border-radius: var(--kn-r-sm);
    }

    .kn-fu__item[data-status='complete'] { border-color: var(--kn-success); }
    .kn-fu__item[data-status='error']    { border-color: var(--kn-danger); }

    .kn-fu__item-icon {
      font-family: var(--kn-font-mono);
      font-size: var(--kn-fs-xs);
      font-weight: var(--kn-fw-bold);
      letter-spacing: var(--kn-tracking-mono);
      width: 36px;
      height: 36px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: var(--kn-surface);
      border-radius: var(--kn-r-xs);
      color: var(--kn-text-muted);
      flex-shrink: 0;
    }

    .kn-fu__item-body { flex: 1; min-width: 0; }
    .kn-fu__item-name { font-size: var(--kn-fs-base); font-weight: var(--kn-fw-semibold); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .kn-fu__item-meta { font-size: var(--kn-fs-xs); color: var(--kn-text-muted); margin-top: 2px; }

    .kn-fu__bar {
      margin-top: var(--kn-sp-2);
      height: 4px;
      background: var(--kn-surface-alt);
      border-radius: var(--kn-r-pill);
      overflow: hidden;
    }
    .kn-fu__bar-fill {
      height: 100%;
      background: var(--kn-brand);
      transition: width 200ms ease;
    }

    .kn-fu__remove {
      all: unset;
      cursor: pointer;
      width: 28px;
      height: 28px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: var(--kn-text-muted);
      font-size: 18px;
      border-radius: var(--kn-r-xs);
    }
    .kn-fu__remove:hover { color: var(--kn-text); background: var(--kn-surface); }
    .kn-fu__remove:focus-visible { box-shadow: var(--kn-ring); }
  `],
})
export class KnFileUploadComponent {
  readonly label = input<string>('Drop files here or click to browse');
  readonly hint = input<string>('Up to 10 files · 25MB each');
  readonly accept = input<string>('');
  readonly multiple = input<boolean>(true);
  readonly disabled = input<boolean>(false);
  readonly maxSize = input<number>(25 * 1024 * 1024);
  readonly maxFiles = input<number>(10);
  readonly ariaLabel = input<string>('File upload');

  readonly filesAdded = output<KnFileItem[]>();
  readonly fileRemoved = output<KnFileItem>();

  readonly items = signal<KnFileItem[]>([]);
  readonly active = signal<boolean>(false);

  @ViewChild('input', { static: true }) private inputRef!: ElementRef<HTMLInputElement>;

  protected trigger(): void {
    if (this.disabled()) return;
    this.inputRef.nativeElement.click();
  }

  protected onChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) this.addFiles(input.files);
    input.value = '';
  }

  protected onDragOver(event: DragEvent): void {
    if (this.disabled()) return;
    event.preventDefault();
    this.active.set(true);
  }

  protected onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.active.set(false);
  }

  protected onDrop(event: DragEvent): void {
    event.preventDefault();
    this.active.set(false);
    if (this.disabled()) return;
    if (event.dataTransfer?.files) this.addFiles(event.dataTransfer.files);
  }

  protected remove(item: KnFileItem, event: MouseEvent): void {
    event.stopPropagation();
    this.items.update((list) => list.filter((i) => i.id !== item.id));
    this.fileRemoved.emit(item);
  }

  private addFiles(list: FileList): void {
    const remaining = this.maxFiles() - this.items().length;
    const incoming = Array.from(list).slice(0, Math.max(0, remaining));
    const added: KnFileItem[] = [];

    for (const file of incoming) {
      const item: KnFileItem = {
        id: `kn-fu-${++nextItemId}`,
        file,
        name: file.name,
        size: file.size,
        type: file.type || 'application/octet-stream',
        progress: 0,
        status: 'pending',
      };
      if (file.size > this.maxSize()) {
        item.status = 'error';
        item.errorMessage = `Exceeds ${this.formatSize(this.maxSize())}`;
      }
      added.push(item);
    }

    this.items.update((current) => [...current, ...added]);
    if (added.length > 0) this.filesAdded.emit(added);
  }

  protected formatSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  }

  protected iconFor(type: string): string {
    if (type.startsWith('image/')) return 'IMG';
    if (type.startsWith('video/')) return 'VID';
    if (type.startsWith('audio/')) return 'AUD';
    if (type.includes('pdf')) return 'PDF';
    if (type.includes('zip') || type.includes('compressed')) return 'ZIP';
    return 'DOC';
  }

  /** Public API: callers can update progress on a file */
  updateProgress(id: string, progress: number): void {
    this.items.update((list) =>
      list.map((i) => (i.id === id ? { ...i, progress, status: progress >= 100 ? 'complete' : 'uploading' } : i))
    );
  }

  markError(id: string, message: string): void {
    this.items.update((list) =>
      list.map((i) => (i.id === id ? { ...i, status: 'error', errorMessage: message } : i))
    );
  }
}
