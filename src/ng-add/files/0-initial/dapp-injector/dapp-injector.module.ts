import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DappInjector } from './dapp-injector.service';
import { IDAPP_CONFIG } from './models';

export const DappConfigService = new InjectionToken<IDAPP_CONFIG>('DappConfig');

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class DappInjectorModule {
  static forRoot(dappConfig: IDAPP_CONFIG): ModuleWithProviders<DappInjectorModule> {
    return {
      ngModule: DappInjectorModule,
      providers: [DappInjector, { provide: DappConfigService, useValue: dappConfig }],
    };
  }
}
