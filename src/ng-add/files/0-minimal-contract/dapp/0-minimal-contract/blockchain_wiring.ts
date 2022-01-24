
import { InjectionToken } from '@angular/core';
import { ICONTRACT } from 'angularonchain';
import MinimalContractMetadata from '../../../assets/contracts/minimal_contract_metadata.json';


export const minimalContractMetadata = new InjectionToken<ICONTRACT>('minimalContractMetadata')

export const blockchain_providers = [{provide: 'minimalContractMetadata', useValue: MinimalContractMetadata}]



