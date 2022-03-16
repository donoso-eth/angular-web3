import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  AngularContract,
  convertEtherToWei,
  convertUSDtoEther,
  DappInjectorService,
  IABI_OBJECT,
  IBALANCE,
  ICONTRACT,
  NETWORK_STATUS,
  Web3Actions,
  web3Selectors,
  Web3State,
} from 'angular-web3';
import { ethers, providers, Signer } from 'ethers';
import { DialogService, NotifierService } from 'src/app/dapp-components';
import {
  netWorkByName,
  NETWORK_TYPE,
} from 'src/app/dapp-injector/constants/constants';

// MY INFURA_ID, SWAP IN YOURS FROM https://infura.io/dashboard/ethereum
export const INFURA_ID = '460f40a260564ac4a4f4b3fffb032dad';

@Component({
  selector: 'nft-contract',
  templateUrl: './nft-contract.component.html',
  styleUrls: ['./nft-contract.component.css'],
})
export class NftContractComponent implements AfterViewInit {
  public blockchain_status: NETWORK_STATUS = 'loading';
  contract_abi!: Array<IABI_OBJECT>;
  walletBalance!: IBALANCE;
  contractBalance!: IBALANCE;
  contractHeader!: ICONTRACT;
  deployer_address!: string;
  active = 1;
  greeting!: string;
  greeting_input!: string;
  provider!: ethers.providers.JsonRpcProvider;
  signer: any;
  deployer_balance: any;
  loading_contract: 'loading' | 'found' | 'error' = 'loading';
  newWallet!: ethers.Wallet;

  dollarExchange!: number;
  balanceDollar!: number;
  nftContract!: AngularContract;
  blockchain_is_busy: boolean = true;
  constructor(
    private dialogService: DialogService,
    private notifierService: NotifierService,
    private store: Store<Web3State>,
    public dappInjectorService: DappInjectorService
  ) {}

  async onChainStuff() {
    try {
      this.deployer_address = await (
        await this.dappInjectorService.config.defaultProvider!.getSigner()
      ).getAddress();
    } catch (error) {
      console.log(error);
      this.loading_contract = 'error';
    }
  }

  async openTransaction() {
    const res = await this.dialogService.openDialog();

    if (res && res.type == 'transaction') {
      const usd = res.amount;
      const amountInEther = convertUSDtoEther(
        res.amount,
        await this.dappInjectorService.getDollarEther()
      );
      const amountinWei = convertEtherToWei(amountInEther);

      let tx = {
        to: res.to,
        // Convert currency unit from ether to wei
        value: amountinWei,
      };
      this.store.dispatch(Web3Actions.chainBusy({ status: true }));
      const transaction_result = await this.dappInjectorService.doTransaction(
        tx
      );
      this.store.dispatch(Web3Actions.chainBusy({ status: false }));
      await this.notifierService.showNotificationTransaction(
        transaction_result
      );
    } else {
      this.store.dispatch(Web3Actions.chainBusy({ status: false }));
    }
  }

  async doFaucet() {
    this.store.dispatch(Web3Actions.chainBusy({ status: true }));
    if (this.dappInjectorService.config.connectedNetwork == 'localhost') {
      let amountInEther = '0.1';
      // Create a transaction object

      let tx = {
        to: await this.dappInjectorService.config.signer?.getAddress(),
        // Convert currency unit from ether to wei
        value: ethers.utils.parseEther(amountInEther),
      };

      const localSigner = (
        (await this.dappInjectorService.config
          .defaultProvider) as providers.JsonRpcProvider
      ).getSigner();

      const transaction_result = await this.dappInjectorService.doTransaction(
        tx,
        localSigner
      );

      this.store.dispatch(Web3Actions.chainBusy({ status: false }));
      await this.notifierService.showNotificationTransaction(
        transaction_result
      );
    } else {
      const href = netWorkByName(
        this.dappInjectorService.config.connectedNetwork as NETWORK_TYPE
      );
      if (href.faucet) {
        window.open(
          href.faucet,
          '_blank' // <- This is what makes it open in a new window.
        );
        this.store.dispatch(Web3Actions.chainBusy({ status: false }));
      } else {
        alert(
          `Sorry no faucet found for network ${this.dappInjectorService.config.connectedNetwork} `
        );
        this.store.dispatch(Web3Actions.chainBusy({ status: false }));
      }
    }
  }

  async doScan() {
    if (this.dappInjectorService.config.connectedNetwork == 'localhost') {
      alert(
        'No scan provider for localhost, please embed the blockchain component'
      );
    } else {
      const href = netWorkByName(
        this.dappInjectorService.config.connectedNetwork as NETWORK_TYPE
      );

      if (href.blockExplorer) {
        window.open(
          href.blockExplorer,
          '_blank' // <- This is what makes it open in a new window.
        );
      }
    }
  }

  web3modalAction(action: boolean) {
    this.dappInjectorService.launchWenmodal();
  }


  ngAfterViewInit(): void {
    this.store.pipe(web3Selectors.selectChainReady).subscribe(async (value) => {
      console.log(' should not be in contract debug');

      this.nftContract = this.dappInjectorService.config.defaultContract!;
      this.contract_abi = this.nftContract.abi;
      this.signer = this.dappInjectorService.config.signer as Signer;

      this.contractHeader = {
        name: this.nftContract.name,
        address: this.nftContract.address,
        abi: this.nftContract.abi,
        network: this.nftContract.network,
      };

      this.onChainStuff();
    });

    this.store.select(web3Selectors.chainStatus).subscribe(async (value) => {
      this.blockchain_status = value;
    });

    this.store
      .select(web3Selectors.isNetworkBusy)
      .subscribe((isBusy: boolean) => {
        console.log(isBusy);
        this.blockchain_is_busy = isBusy;
      });
  }
}
