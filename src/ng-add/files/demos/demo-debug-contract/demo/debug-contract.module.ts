import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractInputComponent } from './contract-input/contract-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

import { DebugContractComponent } from './debug-contract/debug-contract.component';
import {MatTabsModule} from '@angular/material/tabs';
import { AddressShowModule, BlockchainModule, ContractShowModule, DialogModule, HomeModule, NotifierModule } from '../dapp-components';





import { ICONTRACT_METADATA } from 'angular-web3';

import DebugContractMetadata from '../../assets/contracts/debug_contract_metadata.json';

export const contractMetadata = new InjectionToken<ICONTRACT_METADATA>('contractMetadata')

export const contractProvider= {provide: 'contractMetadata', useValue:DebugContractMetadata };

//export const contractInterface= {provide: 'contractInterdace', useValue:DebugContract};


@NgModule({
  declarations: [DebugContractComponent,
    ContractInputComponent,
 
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatTabsModule,
    BlockchainModule,
    HomeModule,
    ContractShowModule,
    AddressShowModule,
    DialogModule,
    NotifierModule

  ],
  providers:[contractProvider],
  exports: [
    DebugContractComponent
  ]
})
export class DebugContractModule { }
