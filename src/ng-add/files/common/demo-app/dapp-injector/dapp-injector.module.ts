import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DappInjectorService } from './dapp-injector.service';
import { AddressShowModule } from './components/address-show/address-show.module';
import { ContractShowModule } from './components/contract-show/contract-show.module';
import { DialogModule } from './components/dialog/dialog.module';
import { AddressShowComponent } from './components/address-show/address-show/address-show.component';
import { ContractShowComponent } from './components/contract-show/contract-show/contract-show.component';
import { BlockchainModule } from './components/blockchain/blockchain.module';
import { NotifierModule } from './components/notifier/notifier.module';
import { BlockchainComponent } from './components/blockchain/blockchain/blockchain.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AddressShowModule,
    ContractShowModule,
    BlockchainModule,
    NotifierModule,
    DialogModule,
    MatSnackBarModule,
    
  ],
  exports: [AddressShowComponent,ContractShowComponent,BlockchainComponent]
})
export class DappInjectorModule {
  static forRoot(): ModuleWithProviders<DappInjectorModule> {
    return {
      ngModule: DappInjectorModule,
      providers: [
        {provide: DappInjectorService}
      ]
    };
  }
 }
