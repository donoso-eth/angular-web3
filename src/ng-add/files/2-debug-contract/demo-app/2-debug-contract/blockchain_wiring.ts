
import { InjectionToken } from '@angular/core';
import DebugContractMetadata from '../../../../assets/contracts/debug_contract_metadata.json';
import { ContractShowModule, AddressShowModule, BlockchainModule, DialogModule, NotifierModule } from 'angularonchain';
import { NetworkProviderService, ContractService, WalletService } from 'angularonchain';

export const localNodeProvider = new InjectionToken<NetworkProviderService>('localNodeProvider');
export const debugContract = new InjectionToken<ContractService>('debugContract')

export const blockchain_imports = [ContractShowModule,AddressShowModule,BlockchainModule,DialogModule,NotifierModule]
export const blockchain_providers = [ {provide: 'localNodeProvider', useValue: new NetworkProviderService([])},
{provide: 'debugContract', useValue: new ContractService(DebugContractMetadata)}, WalletService]