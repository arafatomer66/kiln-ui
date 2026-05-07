import { Rule } from '@angular-devkit/schematics';
export interface KilnAddSchema {
    project?: string;
    theme?: 'light' | 'dark';
    fonts?: boolean;
    skipPackageJson?: boolean;
}
export declare function ngAdd(options: KilnAddSchema): Rule;
