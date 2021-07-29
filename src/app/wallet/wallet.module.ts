import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletDashboardComponent } from './wallet-dashboard/wallet-dashboard.component';
import { RouterModule } from '@angular/router';
import { WalletRouting } from './wallet-routing.module';
import { WalletNavbarComponent } from './components/wallet-navbar/wallet-navbar.component';
import { BalanceComponent } from './components/balance/balance.component';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    WalletDashboardComponent,
    WalletNavbarComponent,
    BalanceComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(WalletRouting),
    NgxMaskModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class WalletModule { }
