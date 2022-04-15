import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { MatIconModule } from '@angular/material/icon';


import { ClipboardModule } from '@angular/cdk/clipboard';
import { WalletDisplayComponent } from './wallet-display.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    WalletDisplayComponent
  ],
  imports: [
    CommonModule,
    ClipboardModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatOptionModule

  ],
  providers:[],
  exports: [WalletDisplayComponent
  ]
})
export class WalletDisplayModule { }
