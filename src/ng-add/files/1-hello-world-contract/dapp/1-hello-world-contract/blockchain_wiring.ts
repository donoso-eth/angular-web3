
import { InjectionToken } from '@angular/core';
import HelloWorldContractMetadata from '../../../assets/contracts/hello_world_contract_metadata.json';
import { ContractShowModule, AddressShowModule, BlockchainModule, DialogModule, NotifierModule, HomeModule, IABI_OBJECT } from 'angular-web3';
import {ICONTRACT } from 'angular-web3';
import { Contract, Signer } from 'ethers';

export interface ISTARTUP_CONFIG {
    defaultNetwork: string,
    wallet: 'metamask' | 'privKey' | 'burner',
    blockSubscription:boolean,
    providers: {[key:string]: any},
    signer?: Signer 
    contracts:{[key:string]: {name: string, address:string, contract:Contract, abi:Array<IABI_OBJECT>}}
}



export const startUpConfig:ISTARTUP_CONFIG = {
    defaultNetwork: 'localhost',
    wallet: 'burner',
    blockSubscription: false,
    providers:{},
    contracts:{},

}


export const contractMetadata = new InjectionToken<ICONTRACT>('contractMetadata')

export const blockchain_providers = [ {provide:'contractMetadata', useValue:HelloWorldContractMetadata}]

export const blockchain_imports = [HomeModule,ContractShowModule,AddressShowModule,BlockchainModule,DialogModule,NotifierModule]
