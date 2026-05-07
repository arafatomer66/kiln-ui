import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KnAvatarComponent } from 'kiln-ui';
import { ApiTableComponent, ApiRow } from '../../shared/api-table.component';
import { ExampleComponent } from '../../shared/example.component';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { CodeBlockComponent } from '../../shared/code-block.component';

@Component({
  selector: 'app-avatar-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [KnAvatarComponent, PageHeaderComponent, ExampleComponent, ApiTableComponent, CodeBlockComponent],
  template: `
    <app-page-header eyebrow="FOUNDATION" title="Avatar" subtitle="Round or square user image with automatic initials fallback." />

    <h2>Import</h2>
    <app-code-block [code]="'import { KnAvatarComponent } from \\'@kiln/ui\\';'" />

    <h2>Examples</h2>

    <app-example title="Sizes" [code]="sizes">
      <kn-avatar size="sm" name="Omer Arafat" />
      <kn-avatar size="md" name="Omer Arafat" />
      <kn-avatar size="lg" name="Omer Arafat" />
      <kn-avatar size="xl" name="Omer Arafat" />
    </app-example>

    <app-example title="Initials" [code]="initials">
      <kn-avatar name="Aisha Rahman" />
      <kn-avatar name="Bashir" />
      <kn-avatar name="Chowdhury Hossain Khan" />
    </app-example>

    <app-example title="Square" [code]="square">
      <kn-avatar shape="square" name="Kiln UI" />
    </app-example>

    <h2>API</h2>
    <app-api-table heading="Inputs" [rows]="inputs" />
  `,
  styles: [`:host { display: block; color: var(--kn-text); } h2 { font-family: var(--kn-font-display); font-size: var(--kn-fs-2xl); margin: var(--kn-sp-7) 0 var(--kn-sp-3); }`],
})
export class AvatarPage {
  protected readonly sizes = `<kn-avatar size="sm" name="Omer Arafat" />
<kn-avatar size="md" name="Omer Arafat" />
<kn-avatar size="lg" name="Omer Arafat" />
<kn-avatar size="xl" name="Omer Arafat" />`;

  protected readonly initials = `<kn-avatar name="Aisha Rahman" />`;
  protected readonly square = `<kn-avatar shape="square" name="Kiln UI" />`;

  protected readonly inputs: ApiRow[] = [
    { name: 'src', type: 'string', default: `''`, description: 'Image URL. Falls back to initials if missing.' },
    { name: 'name', type: 'string', default: `''`, description: 'Used to compute initials and the alt text.' },
    { name: 'size', type: `'sm' | 'md' | 'lg' | 'xl'`, default: `'md'`, description: 'Avatar size.' },
    { name: 'shape', type: `'circle' | 'square'`, default: `'circle'`, description: 'Visual shape.' },
    { name: 'ariaLabel', type: 'string', default: `''`, description: 'Override accessible label.' },
  ];
}
