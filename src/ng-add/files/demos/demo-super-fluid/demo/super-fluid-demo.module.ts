import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperFluidDemoComponent } from './super-fluid-demo/super-fluid-demo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';

import {BlockchainModule, ContractShowModule, DialogModule, HomeModule, NotifierModule, WalletDisplayModule} from '../dapp-components'


import { ICONTRACT_METADATA } from 'angular-web3';

import SuperFluidMetadata from '../../assets/contracts/super_app_metadata.json';
export const contractMetadata = new InjectionToken<ICONTRACT_METADATA>('contractMetadata')

export const contractProvider= {provide: 'contractMetadata', useValue:SuperFluidMetadata };



@NgModule({
  declarations: [
    SuperFluidDemoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
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
    SuperFluidDemoComponent
  ],
  providers: [contractProvider]
})
export class SuperFluidDemoModule { }
