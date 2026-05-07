import { Rule, SchematicContext, SchematicsException, Tree, chain } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';

export interface KilnAddSchema {
  project?: string;
  theme?: 'light' | 'dark';
  fonts?: boolean;
  skipPackageJson?: boolean;
}

const CDK_PEER = '@angular/cdk';
const TOAST_TAG_OPEN = '<kn-toast-container position="top-right" />';

export function ngAdd(options: KilnAddSchema): Rule {
  return chain([
    addCdkPeerDep(options),
    wireAppConfig(options),
    wireGlobalStyles(options),
    wireToastContainer(options),
    runNpmInstall(options),
  ]);
}

function addCdkPeerDep(options: KilnAddSchema): Rule {
  return (tree: Tree, ctx: SchematicContext) => {
    if (options.skipPackageJson) return tree;

    const path = '/package.json';
    if (!tree.exists(path)) {
      ctx.logger.warn('No package.json found at workspace root; skipping @angular/cdk install.');
      return tree;
    }

    const buf = tree.read(path);
    if (!buf) return tree;
    const pkg = JSON.parse(buf.toString('utf-8')) as Record<string, any>;

    pkg.dependencies = pkg.dependencies ?? {};
    if (!pkg.dependencies[CDK_PEER]) {
      // Best-effort match the user's Angular core version
      const ngCore = (pkg.dependencies['@angular/core'] as string | undefined) ?? '*';
      pkg.dependencies[CDK_PEER] = ngCore.startsWith('^') || ngCore.startsWith('~') ? ngCore : `^${ngCore}`;
      ctx.logger.info(`✓ Added ${CDK_PEER} ${pkg.dependencies[CDK_PEER]} to package.json.`);
    } else {
      ctx.logger.info(`✓ ${CDK_PEER} already in package.json.`);
    }

    tree.overwrite(path, JSON.stringify(pkg, null, 2));
    return tree;
  };
}

function wireAppConfig(options: KilnAddSchema): Rule {
  return (tree: Tree, ctx: SchematicContext) => {
    const candidates = [
      `/projects/${options.project}/src/app/app.config.ts`,
      '/src/app/app.config.ts',
    ].filter((p): p is string => !!p);

    const path = candidates.find((p) => tree.exists(p));
    if (!path) {
      ctx.logger.warn(
        'Could not find app.config.ts. Add `provideKilnUI()` manually:\n' +
          "  import { provideKilnUI } from 'kiln-ui';\n" +
          "  providers: [provideKilnUI({ theme: 'light' })]"
      );
      return tree;
    }

    let content = tree.read(path)!.toString('utf-8');

    if (content.includes("from 'kiln-ui'") && content.includes('provideKilnUI')) {
      ctx.logger.info('✓ provideKilnUI() already present in app.config.ts.');
      return tree;
    }

    const theme = options.theme ?? 'light';
    const importLine = `import { provideKilnUI } from 'kiln-ui';\n`;
    const providerLine = `provideKilnUI({ theme: '${theme}' })`;

    // Insert import after the last import statement
    const lastImportMatch = [...content.matchAll(/^import .+;$/gm)].pop();
    if (lastImportMatch) {
      const idx = lastImportMatch.index! + lastImportMatch[0].length;
      content = content.slice(0, idx) + '\n' + importLine.trimEnd() + content.slice(idx);
    } else {
      content = importLine + content;
    }

    // Insert provider into the providers array
    const providersMatch = content.match(/providers\s*:\s*\[/);
    if (providersMatch) {
      const insertAt = providersMatch.index! + providersMatch[0].length;
      content =
        content.slice(0, insertAt) +
        `\n    ${providerLine},` +
        content.slice(insertAt);
    } else {
      ctx.logger.warn('Found app.config.ts but could not locate providers array. Add manually:\n  ' + providerLine);
      return tree;
    }

    tree.overwrite(path, content);
    ctx.logger.info(`✓ Added provideKilnUI({ theme: '${theme}' }) to ${path}.`);
    return tree;
  };
}

function wireGlobalStyles(options: KilnAddSchema): Rule {
  return (tree: Tree, ctx: SchematicContext) => {
    const candidates = [
      `/projects/${options.project}/src/styles.scss`,
      `/projects/${options.project}/src/styles.css`,
      '/src/styles.scss',
      '/src/styles.css',
    ].filter((p): p is string => !!p);

    const path = candidates.find((p) => tree.exists(p));
    if (!path) {
      ctx.logger.warn(
        "Could not find a global styles.scss or styles.css. Add manually:\n" +
          "  @use 'kiln-ui/styles/all' as *;\n" +
          (options.fonts !== false ? "  @use 'kiln-ui/styles/fonts.css';\n" : '')
      );
      return tree;
    }

    const isScss = path.endsWith('.scss');
    let content = tree.read(path)!.toString('utf-8');

    if (content.includes('kiln-ui/styles/all')) {
      ctx.logger.info(`✓ Kiln UI styles already imported in ${path}.`);
      return tree;
    }

    const block = isScss
      ? `@use 'kiln-ui/styles/all' as *;\n${options.fonts !== false ? "@use 'kiln-ui/styles/fonts.css';\n" : ''}`
      : `@import 'kiln-ui/styles/all.scss';\n${options.fonts !== false ? "@import 'kiln-ui/styles/fonts.css';\n" : ''}`;

    content = block + '\n' + content;
    tree.overwrite(path, content);
    ctx.logger.info(`✓ Imported Kiln UI styles into ${path}.`);
    return tree;
  };
}

function wireToastContainer(options: KilnAddSchema): Rule {
  return (tree: Tree, ctx: SchematicContext) => {
    const candidates = [
      `/projects/${options.project}/src/app/app.ts`,
      `/projects/${options.project}/src/app/app.component.ts`,
      '/src/app/app.ts',
      '/src/app/app.component.ts',
    ].filter((p): p is string => !!p);

    const path = candidates.find((p) => tree.exists(p));
    if (!path) {
      ctx.logger.warn('Could not find app.ts/app.component.ts to wire <kn-toast-container>.');
      return tree;
    }

    let content = tree.read(path)!.toString('utf-8');

    if (content.includes('KnToastContainerComponent') || content.includes('kn-toast-container')) {
      ctx.logger.info('✓ <kn-toast-container> already wired.');
      return tree;
    }

    // Best-effort: append a hint comment so the user can wire it manually.
    // (Modifying inline templates safely is brittle; we leave a clear next-step.)
    ctx.logger.info(
      '\n  Optional next step: render the global toast container in your root component template:\n' +
        "    import { KnToastContainerComponent } from 'kiln-ui';\n" +
        '    @Component({ imports: [..., KnToastContainerComponent], template: `\n' +
        '      <router-outlet />\n' +
        '      ' + TOAST_TAG_OPEN + '\n' +
        '    `})\n'
    );
    return tree;
  };
}

function runNpmInstall(options: KilnAddSchema): Rule {
  return (_: Tree, ctx: SchematicContext) => {
    if (options.skipPackageJson) return;
    ctx.addTask(new NodePackageInstallTask());
    ctx.logger.info('\n✓ Kiln UI installed. Running npm install for @angular/cdk…');
    ctx.logger.info('\nNext: visit https://arafatomer66.github.io/kiln-ui for component docs.\n');
  };
}

function _unused() { return [TOAST_TAG_OPEN]; }
