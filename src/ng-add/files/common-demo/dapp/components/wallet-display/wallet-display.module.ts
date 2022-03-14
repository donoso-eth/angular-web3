import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { MatIconModule } from '@angular/material/icon';


import { ClipboardModule } from '@angular/cdk/clipboard';
import { WalletDisplayComponent } from './wallet-display.component';

@NgModule({
  declarations: [
    WalletDisplayComponent
  ],
  imports: [
    CommonModule,
    ClipboardModule


  ],
  providers:[],
  exports: [WalletDisplayComponent
  ]
})
export class WalletDisplayModule { }
