import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  AngularContract,
  DappInjectorService,
  NETWORK_STATUS,
  web3Selectors,
  no_network,
  angular_web3,
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
export class MinimalContractComponent implements AfterViewInit {
  deployer_address!: string;
  myWallet_address!: string;
  contractHeader!: { name: string; address: string };
  blockchain_is_busy = false;
  blockchain_status!: NETWORK_STATUS;
  minimalContract!: AngularContract;
  netWork!: string;
  no_network = no_network;
  angular_web3 = angular_web3;
  connected_netWork!: string;
  contract_network!: string;
  provider_network!: string;

  constructor(
    private store: Store,
    private dappInjectorService: DappInjectorService
  ) {}

  async asyncStuff() {
    this.myWallet_address =
      (await this.dappInjectorService.config.signer?.getAddress()) as string;
    this.contractHeader = {
      name: this.minimalContract.name,
      address: this.minimalContract.address,
    };
    this.deployer_address = await (
      await (
        this.dappInjectorService.config
          .defaultProvider as providers.JsonRpcProvider
      ).getSigner()
    ).getAddress();
    this.connected_netWork = this.dappInjectorService.config.connectedNetwork;
    this.contract_network = this.minimalContract.network_deployed;
    this.provider_network = this.dappInjectorService.config.defaultNetwork;
  }

  connect() {
    this.dappInjectorService.launchWenmodal();
  }

  ngAfterViewInit(): void {
    this.store.select(web3Selectors.chainStatus).subscribe(async (value) => {
      this.blockchain_status = value;

      console.log(value);

      if (value == 'wallet-connected') {
        this.minimalContract = this.dappInjectorService.config.defaultContract!;
        console.log(this.minimalContract.network_deployed);
        this.asyncStuff();
      }
    });

    this.store
      .select(web3Selectors.isNetworkBusy)
      .subscribe((isBusy: boolean) => {
        console.log(isBusy);
        this.blockchain_is_busy = isBusy;
      });
  }
}
