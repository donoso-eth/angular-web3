import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractInputComponent } from './contract-input/contract-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

import { DebugContractComponent } from './debug-contract/debug-contract.component';
import {MatTabsModule} from '@angular/material/tabs';
import { blockchain_imports, blockchain_providers } from './blockchain_wiring';
import {OnChainService } from './on-chain.service';

@NgModule({
  declarations: [DebugContractComponent,
    ContractInputComponent,
 
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatTabsModule,
    blockchain_imports

  ],
  providers:[...blockchain_providers,OnChainService],
  exports: [
    DebugContractComponent
  ]
})
export class DebugContractModule { }
