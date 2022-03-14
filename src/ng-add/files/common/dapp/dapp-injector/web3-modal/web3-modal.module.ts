import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Web3ModalComponent } from './web3-modal.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    Web3ModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    Web3ModalComponent
  ]
})
export class Web3ModalModule { }
