import { Routes } from '@angular/router';
import { ShellComponent } from './layout/shell.component';

export const routes: Routes = [
  {
    path: 'showcase/admin',
    loadChildren: () => import('./showcase/admin/admin.routes').then((m) => m.ADMIN_ROUTES),
  },
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home.component').then((m) => m.HomeComponent),
        pathMatch: 'full',
      },
      {
        path: 'getting-started',
        loadComponent: () => import('./pages/getting-started.component').then((m) => m.GettingStartedComponent),
      },
      {
        path: 'theming',
        loadComponent: () => import('./pages/theming.component').then((m) => m.ThemingComponent),
      },
      {
        path: 'about',
        loadComponent: () => import('./pages/about.component').then((m) => m.AboutComponent),
      },
      {
        path: 'components',
        children: [
          { path: '', pathMatch: 'full', redirectTo: 'button' },
          { path: 'button',      loadComponent: () => import('./pages/components/button.page').then((m) => m.ButtonPage) },
          { path: 'input',       loadComponent: () => import('./pages/components/input.page').then((m) => m.InputPage) },
          { path: 'textarea',    loadComponent: () => import('./pages/components/textarea.page').then((m) => m.TextareaPage) },
          { path: 'checkbox',    loadComponent: () => import('./pages/components/checkbox.page').then((m) => m.CheckboxPage) },
          { path: 'radio',       loadComponent: () => import('./pages/components/radio.page').then((m) => m.RadioPage) },
          { path: 'switch',      loadComponent: () => import('./pages/components/switch.page').then((m) => m.SwitchPage) },
          { path: 'badge',       loadComponent: () => import('./pages/components/badge.page').then((m) => m.BadgePage) },
          { path: 'chip',        loadComponent: () => import('./pages/components/chip.page').then((m) => m.ChipPage) },
          { path: 'avatar',      loadComponent: () => import('./pages/components/avatar.page').then((m) => m.AvatarPage) },
          { path: 'spinner',     loadComponent: () => import('./pages/components/spinner.page').then((m) => m.SpinnerPage) },
          { path: 'progress',    loadComponent: () => import('./pages/components/progress.page').then((m) => m.ProgressPage) },
          { path: 'divider',     loadComponent: () => import('./pages/components/divider.page').then((m) => m.DividerPage) },
          { path: 'card',        loadComponent: () => import('./pages/components/card.page').then((m) => m.CardPage) },
          { path: 'alert',       loadComponent: () => import('./pages/components/alert.page').then((m) => m.AlertPage) },
          { path: 'tooltip',     loadComponent: () => import('./pages/components/tooltip.page').then((m) => m.TooltipPage) },
          { path: 'dropdown',    loadComponent: () => import('./pages/components/dropdown.page').then((m) => m.DropdownPage) },
          { path: 'menu',        loadComponent: () => import('./pages/components/menu.page').then((m) => m.MenuPage) },
          { path: 'select',      loadComponent: () => import('./pages/components/select.page').then((m) => m.SelectPage) },
          { path: 'modal',       loadComponent: () => import('./pages/components/modal.page').then((m) => m.ModalPage) },
          { path: 'drawer',      loadComponent: () => import('./pages/components/drawer.page').then((m) => m.DrawerPage) },
          { path: 'toast',       loadComponent: () => import('./pages/components/toast.page').then((m) => m.ToastPage) },
          { path: 'tabs',        loadComponent: () => import('./pages/components/tabs.page').then((m) => m.TabsPage) },
          { path: 'accordion',   loadComponent: () => import('./pages/components/accordion.page').then((m) => m.AccordionPage) },
          { path: 'stepper',     loadComponent: () => import('./pages/components/stepper.page').then((m) => m.StepperPage) },
          { path: 'pagination',  loadComponent: () => import('./pages/components/pagination.page').then((m) => m.PaginationPage) },
          { path: 'date-picker', loadComponent: () => import('./pages/components/date-picker.page').then((m) => m.DatePickerPage) },
          { path: 'table',       loadComponent: () => import('./pages/components/table.page').then((m) => m.TablePage) },
          { path: 'skeleton',          loadComponent: () => import('./pages/components/skeleton.page').then((m) => m.SkeletonPage) },
          { path: 'empty-state',       loadComponent: () => import('./pages/components/empty-state.page').then((m) => m.EmptyStatePage) },
          { path: 'otp-input',         loadComponent: () => import('./pages/components/otp-input.page').then((m) => m.OtpInputPage) },
          { path: 'phone-input',       loadComponent: () => import('./pages/components/phone-input.page').then((m) => m.PhoneInputPage) },
          { path: 'combobox',          loadComponent: () => import('./pages/components/combobox.page').then((m) => m.ComboboxPage) },
          { path: 'file-upload',       loadComponent: () => import('./pages/components/file-upload.page').then((m) => m.FileUploadPage) },
          { path: 'date-range-picker', loadComponent: () => import('./pages/components/date-range-picker.page').then((m) => m.DateRangePickerPage) },
          { path: 'command-palette',   loadComponent: () => import('./pages/components/command-palette.page').then((m) => m.CommandPalettePage) },
        ],
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
