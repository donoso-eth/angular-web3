import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { WalletDisplayModule } from '../wallet-display/wallet-display.module';

import { DappLoadingModule } from '../loading/loading.module';




@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    WalletDisplayModule,
    DappLoadingModule
  ],
  exports: [
    HomeComponent,


  ]
})
export class HomeModule { }
