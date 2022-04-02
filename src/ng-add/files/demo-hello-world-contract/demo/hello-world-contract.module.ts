import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelloWorldContractComponent } from './hello-world-contract/hello-world-contract.component';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';

import {BlockchainModule, ContractShowModule, DialogModule, HomeModule, NotifierModule, WalletDisplayModule} from '../dapp-components'


import { ICONTRACT_METADATA } from 'angular-web3';

import HelloWorldContractMetadata from '../../assets/contracts/hello_world_contract_metadata.json';
export const contractMetadata = new InjectionToken<ICONTRACT_METADATA>('contractMetadata')

export const contractProvider= {provide: 'contractMetadata', useValue:HelloWorldContractMetadata };



@NgModule({
  declarations: [
    HelloWorldContractComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatTabsModule,
    MatButtonModule,
    BlockchainModule,
    WalletDisplayModule,
    ContractShowModule,
    HomeModule,
    DialogModule,
    NotifierModule
  ],
  exports: [
    HelloWorldContractComponent
  ],
  providers: [contractProvider]
})
export class HelloWorldContractModule { }
