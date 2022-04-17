import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperFluidDemoComponent } from './super-fluid-demo/super-fluid-demo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';

import {BlockchainModule, ContractShowModule, DialogModule, HomeModule, NotifierModule, WalletDisplayModule} from '../dapp-components'


import { ICONTRACT_METADATA } from 'angular-web3';

import SuperFluidMetadata from '../../assets/contracts/super_app_metadata.json';
import { StreamComponent } from './stream/stream.component';
import { IdaComponent } from './ida/ida.component';
import { SuperAppComponent } from './super-app/super-app.component';
import { SuperFluidServiceModule } from '../dapp-injector/services/super-fluid/super-fluid-service.module';
export const contractMetadata = new InjectionToken<ICONTRACT_METADATA>('contractMetadata')

export const contractProvider= {provide: 'contractMetadata', useValue:SuperFluidMetadata };



@NgModule({
  declarations: [
    SuperFluidDemoComponent,
    StreamComponent,
    IdaComponent,
    SuperAppComponent
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
    NotifierModule,

    SuperFluidServiceModule

  ],
  exports: [
    SuperFluidDemoComponent
  ],
  providers: [contractProvider]
})
export class SuperFluidDemoModule { }
