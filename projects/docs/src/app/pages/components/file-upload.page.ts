import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KnFileUploadComponent, KnFileItem } from 'kiln-ui';
import { ApiTableComponent, ApiRow } from '../../shared/api-table.component';
import { ExampleComponent } from '../../shared/example.component';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { CodeBlockComponent } from '../../shared/code-block.component';

@Component({
  selector: 'app-file-upload-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [KnFileUploadComponent, PageHeaderComponent, ExampleComponent, ApiTableComponent, CodeBlockComponent],
  template: `
    <app-page-header
      eyebrow="ADVANCED"
      title="File Upload"
      subtitle="Drag-and-drop file uploader with multi-file support, per-file progress, and size validation."
    />

    <h2>Import</h2>
    <app-code-block [code]="'import { KnFileUploadComponent } from \\'@kiln/ui\\';'" />

    <h2>Examples</h2>

    <app-example title="Multi-file with simulated progress" [code]="basic">
      <div style="width: 100%; max-width: 480px;">
        <kn-file-upload
          #upload
          label="Drop files here or click to browse"
          hint="Up to 10 files · 25MB each"
          (filesAdded)="simulateUpload($event, upload)"
        />
      </div>
    </app-example>

    <app-example title="Single file, images only" [code]="single">
      <div style="width: 100%; max-width: 480px;">
        <kn-file-upload
          label="Upload avatar"
          hint="JPG or PNG, up to 5MB"
          [multiple]="false"
          accept="image/jpeg,image/png"
          [maxSize]="5 * 1024 * 1024"
        />
      </div>
    </app-example>

    <h2>API</h2>
    <app-api-table heading="Inputs" [rows]="inputs" />
    <app-api-table heading="Outputs" [rows]="outputs" [showDefault]="false" />
    <app-api-table heading="Methods" [rows]="methods" [showDefault]="false" />
  `,
  styles: [`:host { display: block; color: var(--kn-text); } h2 { font-family: var(--kn-font-display); font-size: var(--kn-fs-2xl); margin: var(--kn-sp-7) 0 var(--kn-sp-3); }`],
})
export class FileUploadPage {
  protected readonly basic = `<kn-file-upload
  #upload
  (filesAdded)="onFiles($event)"
/>

onFiles(items: KnFileItem[]) {
  for (const item of items) {
    // your real upload pipeline:
    // axios.post(...).onUploadProgress(p => {
    //   this.upload.updateProgress(item.id, Math.round(p.loaded / p.total * 100));
    // });
  }
}`;

  protected readonly single = `<kn-file-upload
  label="Upload avatar"
  [multiple]="false"
  accept="image/jpeg,image/png"
  [maxSize]="5 * 1024 * 1024"
/>`;

  protected simulateUpload(items: KnFileItem[], component: KnFileUploadComponent): void {
    for (const item of items) {
      if (item.status === 'error') continue;
      let p = 0;
      const tick = setInterval(() => {
        p = Math.min(p + 8 + Math.random() * 12, 100);
        component.updateProgress(item.id, Math.round(p));
        if (p >= 100) clearInterval(tick);
      }, 180);
    }
  }

  protected readonly inputs: ApiRow[] = [
    { name: 'label', type: 'string', default: `'Drop files here or click to browse'`, description: 'Main drop-zone label.' },
    { name: 'hint', type: 'string', default: `'Up to 10 files · 25MB each'`, description: 'Helper line below the label.' },
    { name: 'accept', type: 'string', default: `''`, description: 'Native accept attribute (MIME types).' },
    { name: 'multiple', type: 'boolean', default: 'true', description: 'Allow multiple files.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the drop zone.' },
    { name: 'maxSize', type: 'number', default: '26214400', description: 'Per-file size limit in bytes (default 25 MB).' },
    { name: 'maxFiles', type: 'number', default: '10', description: 'Total files allowed.' },
  ];

  protected readonly outputs: ApiRow[] = [
    { name: 'filesAdded', type: 'EventEmitter<KnFileItem[]>', description: 'Fires when one or more files are added.' },
    { name: 'fileRemoved', type: 'EventEmitter<KnFileItem>', description: 'Fires when an item is removed.' },
  ];

  protected readonly methods: ApiRow[] = [
    { name: 'updateProgress(id, progress)', type: '→ void', description: 'Update a file\'s progress (0-100). Auto-marks complete at 100.' },
    { name: 'markError(id, message)', type: '→ void', description: 'Mark a file as failed with a message.' },
  ];
}
