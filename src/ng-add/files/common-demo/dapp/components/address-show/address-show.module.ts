import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressShowComponent } from './address-show/address-show.component';
import { ClipboardModule } from '@angular/cdk/clipboard';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    AddressShowComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    ClipboardModule
  ],
  exports: [
    AddressShowComponent
  ]
})
export class AddressShowModule { }
