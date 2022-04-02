import { NgModule,InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MinimalContractComponent } from './minimal-contract/minimal-contract.component';

import { ICONTRACT_METADATA } from 'angular-web3';

import MinimalContractMetadata from '../../assets/contracts/minimal_contract_metadata.json';
export const contractMetadata = new InjectionToken<ICONTRACT_METADATA>('contractMetadata')

export const contractProvider= {provide: 'contractMetadata', useValue:MinimalContractMetadata };



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
