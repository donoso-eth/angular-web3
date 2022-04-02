import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IpfsService } from './ipfs-service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class IpfsModule {
  static forRoot(): ModuleWithProviders<IpfsModule> {
  return {
    ngModule: IpfsModule,
    providers: [IpfsService],
  };
} }
