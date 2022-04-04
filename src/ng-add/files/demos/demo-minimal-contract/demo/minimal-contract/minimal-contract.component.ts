import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  AngularContract,
  DappInjectorService,
  NETWORK_STATUS,
  web3Selectors,
  no_network,
  angular_web3,
  DappBaseComponent,
} from 'angular-web3';
import { providers } from 'ethers';

@Component({
  selector: 'minimal-contract',
  templateUrl: './minimal-contract.component.html',
  styles: [
    `
      .blockchain_is_busy {
        animation: spinHorizontal 2s infinite linear;
        filter: hue-rotate(220deg);
      }
      @keyframes spinHorizontal {
        0% {
          transform: rotate(0deg);
        }
        50% {
          transform: rotate(360deg);
        }
        100% {
          transform: rotate(0deg);
        }
      }
    `,
  ],
})
export class MinimalContractComponent extends DappBaseComponent implements AfterViewInit {
  deployer_address!: string;
  myWallet_address!: string;
  contractHeader!: { name: string; address: string };

  minimalContract!: AngularContract;
  netWork!: string;
  no_network = no_network;
  angular_web3 = angular_web3;
  connected_netWork!: string;
  contract_network!: string;
  provider_network!: string;

  constructor(
    store: Store,
    dapp: DappInjectorService
  ) { super(dapp,store)}

  async asyncStuff() {
    this.myWallet_address =
      (await this.dapp.DAPP_STATE.signer?.getAddress()) as string;
    this.contractHeader = {
      name: this.minimalContract.name,
      address: this.minimalContract.address,
    };
    this.deployer_address = await (
      await (
        this.dapp.DAPP_STATE
          .defaultProvider as providers.JsonRpcProvider
      ).getSigner()
    ).getAddress();
    this.connected_netWork! = this.dapp.DAPP_STATE.connectedNetwork as string
    this.contract_network = this.minimalContract.network_deployed;
    this.provider_network  = this.dapp.dappConfig.defaultNetwork;
  }

  override async hookContractConnected(): Promise<void> {
    this.minimalContract = this.dapp.defaultContract as AngularContract;
    this.asyncStuff()
  }

  connect() {
    this.dapp.launchWebModal();
  }

}
