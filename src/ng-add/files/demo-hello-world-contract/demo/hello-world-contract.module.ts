import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelloWorldContractComponent } from './hello-world-contract/hello-world-contract.component';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';

import { blockchain_imports, blockchain_providers } from './blockchain_wiring';
import { WalletdisplaytModule } from 'angular-web3';



@NgModule({
  declarations: [
    HelloWorldContractComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatTabsModule,
    MatButtonModule,
    ...blockchain_imports,
    
    
    WalletdisplaytModule
  ],
  exports: [
    HelloWorldContractComponent
  ],
  providers: []
})
export class HelloWorldContractModule { }
