
import { InjectionToken } from '@angular/core';
import HelloWorldContractMetadata from '../../../assets/contracts/hello_world_contract_metadata.json';
import { ContractShowModule, AddressShowModule, BlockchainModule, DialogModule, NotifierModule, HomeModule } from 'angullar-web3';
import {ICONTRACT } from 'angullar-web3';


export const helloWorldContractMetadata = new InjectionToken<ICONTRACT>('helloWorldContractMetadata')

export const blockchain_providers = [ {provide:'helloWorldContractMetadata', useValue:HelloWorldContractMetadata}]


export const blockchain_imports = [HomeModule,ContractShowModule,AddressShowModule,BlockchainModule,DialogModule,NotifierModule]
