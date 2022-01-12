import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelloWorldOnChainComponent } from './hello-world-on-chain/hello-world-on-chain.component';
import { FormsModule } from '@angular/forms';
import { DappInjectorModule } from '../../dapp-injector/dapp-injector.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    HelloWorldOnChainComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DappInjectorModule,
    MatTabsModule,
    MatButtonModule
  ],
  exports: [
    HelloWorldOnChainComponent
  ]
})
export class HelloWorldOnChainModule { }
