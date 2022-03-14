import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MinimalContractComponent } from './minimal-contract/minimal-contract.component';



@NgModule({
  declarations: [
    MinimalContractComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    MinimalContractComponent,
  ],
  providers:[ ]
})
export class MinimalContractModule { }
