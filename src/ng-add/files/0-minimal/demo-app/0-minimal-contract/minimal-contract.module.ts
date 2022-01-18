import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MinimalContractComponent } from './minimal-contract.component';
import { blockchain_providers } from './blockchain_wiring';
import { OnChainService } from './on-chain.service';



@NgModule({
  declarations: [
    MinimalContractComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MinimalContractComponent,
  ],
  providers:[ ...blockchain_providers,OnChainService]
})
export class MinimalContractModule { }
