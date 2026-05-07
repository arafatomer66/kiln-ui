import { Routes } from '@angular/router';
import { AdminShellComponent } from './admin.shell';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminShellComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'dashboard', loadComponent: () => import('./pages/dashboard.page').then((m) => m.DashboardPage) },
      { path: 'orders',    loadComponent: () => import('./pages/orders.page').then((m) => m.OrdersPage) },
      { path: 'customers', loadComponent: () => import('./pages/customers.page').then((m) => m.CustomersPage) },
      { path: 'products',  loadComponent: () => import('./pages/products.page').then((m) => m.ProductsPage) },
      { path: 'settings',  loadComponent: () => import('./pages/settings.page').then((m) => m.SettingsPage) },
    ],
  },
];
