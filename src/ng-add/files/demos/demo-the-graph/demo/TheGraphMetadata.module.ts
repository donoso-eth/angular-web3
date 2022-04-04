import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TheGraphDemoComponent } from './the-graph-demo/the-graph-demo.component';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';

import {BlockchainModule, ContractShowModule, DialogModule, HomeModule, NotifierModule, WalletDisplayModule} from '../dapp-components'


import { ICONTRACT_METADATA } from 'angular-web3';

import TheGraphMetadata from '../../assets/contracts/gravity_contract_metadata.json';
export const contractMetadata = new InjectionToken<ICONTRACT_METADATA>('contractMetadata')

export const contractProvider= {provide: 'contractMetadata', useValue:TheGraphMetadata };



@NgModule({
  declarations: [
    TheGraphDemoComponent
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
    TheGraphDemoComponent
  ],
  providers: [contractProvider]
})
export class TheGraphDemoModule { }
