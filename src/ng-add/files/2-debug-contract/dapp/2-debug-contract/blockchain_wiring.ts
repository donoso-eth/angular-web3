
import { InjectionToken } from '@angular/core';
import DebugContractMetadata from '../../../assets/contracts/debug_contract_metadata.json';
import { ContractShowModule, AddressShowModule, BlockchainModule, DialogModule, NotifierModule, HomeModule } from 'angular-web3';
import {ICONTRACT } from 'angular-web3';


export const debugContractMetadata = new InjectionToken<ICONTRACT>('debugContractMetadata')


export const blockchain_providers = [ {provide:'debugContractMetadata', useValue:DebugContractMetadata}]


export const blockchain_imports = [HomeModule,ContractShowModule,AddressShowModule,BlockchainModule,DialogModule,NotifierModule]
