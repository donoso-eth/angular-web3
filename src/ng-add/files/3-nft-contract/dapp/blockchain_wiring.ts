
import { InjectionToken } from '@angular/core';


import SimpleNftContractMetadata from  '../../../assets/contracts/simple_nft_contract_metadata.json';




export const blockchain_providers = [ {provide: 'simpleNftContractMetadata', useValue: SimpleNftContractMetadata},
]

////// Common Components Wirings
import { HomeModule, ContractShowModule, AddressShowModule, BlockchainModule, DialogModule, NotifierModule } from 'angular-web3';
export const blockchain_imports = [HomeModule, ContractShowModule,AddressShowModule,BlockchainModule,DialogModule,NotifierModule]
