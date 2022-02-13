import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DappInjectorService } from './dapp-injector.service';



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
