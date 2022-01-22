
import { InjectionToken } from '@angular/core';
import MinimalContractMetadata from '../../../../assets/contracts/minimal_contract_metadata.json';
import { NetworkProviderService, ContractService, WalletService, HomeModule } from 'angularonchain';


export const localNodeProvider = new InjectionToken<NetworkProviderService>('localNodeProvider');
export const minimalContract = new InjectionToken<ContractService>('miminalContract')

export const blockchain_providers = [ {provide: 'localNodeProvider', useValue: new NetworkProviderService([])},
{provide: 'minimalContract', useValue: new ContractService(MinimalContractMetadata)}, WalletService]


export const blockchain_imports = [HomeModule]
