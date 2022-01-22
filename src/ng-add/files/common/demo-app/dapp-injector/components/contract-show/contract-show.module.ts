import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractShowComponent } from './contract-show/contract-show.component';
import { MatIconModule } from '@angular/material/icon';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    ContractShowComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    ClipboardModule
  ],
  exports: [ContractShowComponent]
})
export class ContractShowModule { }
