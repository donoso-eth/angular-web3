import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperFluidServiceService } from './super-fluid-service.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})

export class SuperFluidServiceModule {
  static forRoot(): ModuleWithProviders<SuperFluidServiceModule> {
    return {
      ngModule: SuperFluidServiceModule,
      providers: [SuperFluidServiceService],
    };
  }
}