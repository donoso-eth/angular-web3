import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelloWorldContractComponent } from './hello-world-contract/hello-world-contract.component';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { OnChainService } from './on-chain.service';
import { blockchain_imports, blockchain_providers } from './blockchain_wiring';



@NgModule({
  declarations: [
    HelloWorldContractComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatTabsModule,
    MatButtonModule,
    ...blockchain_imports
  ],
  exports: [
    HelloWorldContractComponent
  ],
  providers: [  ...blockchain_providers, OnChainService ]
})
export class HelloWorldContractModule { }
