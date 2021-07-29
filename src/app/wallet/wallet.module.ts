import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletDashboardComponent } from './wallet-dashboard/wallet-dashboard.component';
import { RouterModule } from '@angular/router';
import { WalletRouting } from './wallet-routing.module';
import { WalletNavbarComponent } from './components/wallet-navbar/wallet-navbar.component';



@NgModule({
  declarations: [
    WalletDashboardComponent,
    WalletNavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(WalletRouting),
  ]
})
export class WalletModule { }
