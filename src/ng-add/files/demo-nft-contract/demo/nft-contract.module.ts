import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NftContractComponent } from './nft-contract/nft-contract.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { blockchain_imports, blockchain_providers } from './blockchain_wiring';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IpfsModule } from './ipfs/ipfs.module';



@NgModule({
  declarations: [
    NftContractComponent,

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
    IpfsModule,
    blockchain_imports
  ],
  providers:[...blockchain_providers] ,
  exports: [
    NftContractComponent
  ]
})
export class NftContractModule { }
