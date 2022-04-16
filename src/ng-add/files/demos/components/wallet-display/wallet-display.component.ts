import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { createIcon } from '@download/blockies';
import { Store } from '@ngrx/store';
import {
  convertWeiToEther,
  DappInjector,
  displayEther,
  displayUsd,
  Web3Actions,
  web3Selectors,
  Web3State,
} from 'angular-web3';
import { Contract, Signer } from 'ethers';
import { firstValueFrom, takeUntil } from 'rxjs';

import {
  DappBaseComponent,
  netWorkByName,
  NETWORK_TYPE,
} from 'src/app/dapp-injector/constants';
import { uniswap_abi } from './uniswap_abi';

@Component({
  selector: 'wallet-display',
  templateUrl: './wallet-display.component.html',
  styleUrls: ['./wallet-display.component.css'],
})
export class WalletDisplayComponent extends DappBaseComponent {
  blockiesOptions: any;
  address_to_show!: string;
  balance!: { ether: any; usd: any };
  dollarExchange!: number;
  network!: string;
  users = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  localUserCtrl = new FormControl();
  ///// ---------  importing local priv_keys
  harhdat_local_privKeys: Array<{ key: string; address: string }> = [];

  constructor(
    private cd: ChangeDetectorRef,
    private renderer: Renderer2,
    dapp: DappInjector,
    store: Store<Web3State>
  ) {
    super(dapp, store);

    this.localUserCtrl.valueChanges
      .pipe(takeUntil(this.destroyHooks))
      .subscribe((val) => {
        this.dapp.localWallet(val);
      });

      this.dapp.provider!.on('block', async (log: any, event: any) => {
        const balance = await this.signer.getBalance();
        this.dollarExchange = await this.getDollarEther();
        this.convertWeitoDisplay(balance);

      });

  }

  async convertWeitoDisplay(balance: any) {
    const ehterbalance = convertWeiToEther(balance);

    const dollar = ehterbalance * this.dollarExchange;
    this.balance = {
      ether: displayEther(ehterbalance),
      usd: displayUsd(dollar),
    };
  }

  @ViewChild('wallet', { read: ElementRef }) private walletDiv!: ElementRef;
  @Output() doFaucetEvent = new EventEmitter();
  @Output() openTransactionEvent = new EventEmitter();

  openTransaction() {
    this.openTransactionEvent.emit();


  }

  doFaucet() {
    this.doFaucetEvent.emit();
    alert("no facuvet")
  }

  doDisconnect() {
    this.store.dispatch(Web3Actions.chainStatus({ status: 'disconnected' }));
  }

  async getDollarEther() {
    if (this.dollarExchange == undefined) {
      const uniswapUsdcAddress = '0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc';
      const uniswapAbi = uniswap_abi;

      const uniswapService = await this.dapp.createProvider([
        'https://eth-mainnet.gateway.pokt.network/v1/lb/611156b4a585a20035148406',
        `https://eth-mainnet.alchemyapi.io/v2/oKxs-03sij-U_N0iOlrSsZFr29-IqbuF`,
        'https://rpc.scaffoldeth.io:48544',
      ]);

      const getUniswapContract = async (address: string) =>
        await new Contract(address, uniswapAbi, uniswapService);
      const contract = await getUniswapContract(uniswapUsdcAddress);
      const reserves = await contract['getReserves']();

      this.dollarExchange =
        (Number(reserves._reserve0) / Number(reserves._reserve1)) * 1e12;
    }
    return this.dollarExchange;
  }

  async doScan() {
    if (this.network == 'localhost') {
      alert(
        'No scan provider for localhost, please embed the blockchain component'
      );
    } else {
      const href = netWorkByName(this.network as NETWORK_TYPE);

      if (href.blockExplorer) {
        window.open(
          href.blockExplorer + `/address/${this.address_to_show}`,
          '_blank' // <- This is what makes it open in a new window.
        );
      }
    }
  }

  override async hookContractConnected(): Promise<void> {
    this.address_to_show = await this.signer.getAddress();

    const balance = await this.signer.getBalance();
    this.dollarExchange = await this.getDollarEther();
    this.convertWeitoDisplay(balance);

    this.network = this.dapp.connectedNetwork!;

    this.blockiesOptions = {
      // All options are optional
      seed: this.address_to_show, // seed used to generate icon data, default: random
      color: '#dfe', // to manually specify the icon color, default: random
      bgcolor: '#aaa', // choose a different background color, default: random
      size: 8, // width/height of the icon in blocks, default: 8
      scale: 3, // width/height of each block in pixels, default: 4
      spotcolor: '#000', // each pixel has a 13% chance of being of a third color,
      // default: random. Set to -1 to disable it. These "spots" create structures
      // that look like eyes, mouths and noses.
    };
    // await this.myWallet.refreshWalletBalance()
  

    if (this.network == 'localhost') {
      this.harhdat_local_privKeys = (
        await import('../../../assets/contracts/local_accouts.json')
      ).default;
      const index = this.harhdat_local_privKeys
        .map((map) => map.address.toLowerCase())
        .indexOf(this.dapp.signerAddress!.toLowerCase());

      this.localUserCtrl.setValue(index + 1, { emitEvent: false });
    }
  }

  override ngAfterViewInit(): void {
    super.ngAfterViewInit();

    this.store.pipe(web3Selectors.selectWalletBalance).subscribe((balance) => {
      // this.convertWeitoDisplay(balance);
      this.cd.detectChanges();
    });

    this.store
      .select(web3Selectors.selectSignerNetwork)
      .subscribe(async (network) => {
        this.network = network;
      });

    const icon = createIcon(this.blockiesOptions);

    this.renderer.appendChild(this.walletDiv.nativeElement, icon);
  }
}
