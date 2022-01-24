
import { InjectionToken } from '@angular/core';
import HelloWorldContractMetadata from '../../../assets/contracts/hello_world_contract_metadata.json';
import { ContractShowModule, AddressShowModule, BlockchainModule, DialogModule, NotifierModule, HomeModule } from 'angularonchain';
import {ICONTRACT } from 'angularonchain';


export const helloWorldContractMetadata = new InjectionToken<ICONTRACT>('helloWorldContractMetadata')

export const blockchain_providers = [ {provide:'helloWorldContractMetadata', useValue:HelloWorldContractMetadata}]


export const blockchain_imports = [HomeModule,ContractShowModule,AddressShowModule,BlockchainModule,DialogModule,NotifierModule]
