import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DappInjectorService } from './dapp-injector.service.ts.template';
import { ISTARTUP_CONFIG } from './models';

export const startUpConfig:ISTARTUP_CONFIG = {
  defaultNetwork: 'localhost',
  defaultProvider:null,
  connectedNetwork:'',
  wallet: 'burner',
  defaultContract:null,
  blockSubscription: false,
  providers:{},
  contracts:{},

}

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
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
