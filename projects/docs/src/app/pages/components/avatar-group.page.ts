import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KnAvatarGroupComponent } from 'kiln-ui';
import { ApiTableComponent, ApiRow } from '../../shared/api-table.component';
import { ExampleComponent } from '../../shared/example.component';
import { PageHeaderComponent } from '../../shared/page-header.component';
import { CodeBlockComponent } from '../../shared/code-block.component';

@Component({
  selector: 'app-avatar-group-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [KnAvatarGroupComponent, PageHeaderComponent, ExampleComponent, ApiTableComponent, CodeBlockComponent],
  template: `
    <app-page-header eyebrow="PRO" title="Avatar Group" subtitle="Stacked avatars with overflow indicator. The 'who is on this' pattern for collaboration UIs." />
    <h2>Import</h2>
    <app-code-block [code]="'import { KnAvatarGroupComponent } from \\'kiln-ui\\';'" />
    <h2>Examples</h2>
    <app-example title="Stacked avatars with overflow" [code]="basic">
      <kn-avatar-group [avatars]="team" [max]="4" />
    </app-example>
    <app-example title="Sizes" [code]="sizes">
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <kn-avatar-group [avatars]="team" size="sm" />
        <kn-avatar-group [avatars]="team" size="md" />
        <kn-avatar-group [avatars]="team" size="lg" />
      </div>
    </app-example>
    <h2>API</h2>
    <app-api-table heading="Inputs" [rows]="inputs" />
  `,
  styles: [`:host { display: block; color: var(--kn-text); } h2 { font-family: var(--kn-font-display); font-size: var(--kn-fs-2xl); margin: var(--kn-sp-7) 0 var(--kn-sp-3); }`],
})
export class AvatarGroupPage {
  protected readonly team = [
    { name: 'Aisha Rahman' }, { name: 'Bashir Hossain' }, { name: 'Chowdhury Khan' },
    { name: 'Dipika Sen' },   { name: 'Emon Kabir' },     { name: 'Farhana Akter' },
    { name: 'Gourab Roy' },
  ];
  protected readonly basic = `<kn-avatar-group [avatars]="team" [max]="4" />`;
  protected readonly sizes = `<kn-avatar-group [avatars]="team" size="sm" />`;
  protected readonly inputs: ApiRow[] = [
    { name: 'avatars', type: 'KnAvatarRef[]', default: '[]', description: 'List of avatars (each has name and optional src).' },
    { name: 'max', type: 'number', default: '4', description: 'Show this many; the rest become a "+N" indicator.' },
    { name: 'size', type: `'sm' | 'md' | 'lg' | 'xl'`, default: `'md'`, description: 'Avatar size.' },
    { name: 'ariaLabel', type: 'string', default: `''`, description: 'Group label for screen readers.' },
  ];
}
