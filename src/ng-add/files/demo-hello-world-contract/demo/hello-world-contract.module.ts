import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelloWorldContractComponent } from './hello-world-contract/hello-world-contract.component';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';

import {BlockchainModule, ContractShowModule, DialogModule, HomeModule, NotifierModule, WalletDisplayModule} from '../dapp-components'


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
  providers: []
})
export class HelloWorldContractModule { }
