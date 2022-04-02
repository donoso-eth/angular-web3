import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LitProtocolService } from './lit-protocol-service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class LitProtocolModule {
  static forRoot(): ModuleWithProviders<LitProtocolModule> {
    return {
      ngModule: LitProtocolModule,
      providers: [LitProtocolService],
    };
 }
}
