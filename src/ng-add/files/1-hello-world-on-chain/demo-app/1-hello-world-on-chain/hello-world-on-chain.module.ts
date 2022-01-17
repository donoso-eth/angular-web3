import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelloWorldOnChainComponent } from './hello-world-on-chain/hello-world-on-chain.component';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { HelloWorldOnChainService } from './hello-world-service.service';
import { blockchain_imports, blockchain_providers } from './blockchain_wiring';



@NgModule({
  declarations: [
    HelloWorldOnChainComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatTabsModule,
    MatButtonModule,
    ...blockchain_imports
  ],
  exports: [
    HelloWorldOnChainComponent
  ],
  providers: [  ...blockchain_providers, HelloWorldOnChainService ]
})
export class HelloWorldOnChainModule { }
