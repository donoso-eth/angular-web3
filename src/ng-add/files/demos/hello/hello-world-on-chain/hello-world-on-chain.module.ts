import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelloWorldOnChainComponent } from './hello-world-on-chain/hello-world-on-chain.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HelloWorldOnChainComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    HelloWorldOnChainComponent
  ]
})
export class HelloWorldOnChainModule { }
