import { Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { WalletDashboardComponent } from './wallet-dashboard/wallet-dashboard.component';

export const WalletRouting: Routes = [
  {
    path: '',
    component: WalletDashboardComponent
  }, {
    path: 'category',
    component: CategoriesComponent
  }  
];