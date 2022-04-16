import { Component, Inject, OnInit } from '@angular/core';

import { Contract, ethers, Signer } from 'ethers';

import {
  BlockWithTransactions,
  IBALANCE,

  convertWeiToEther,
  convertEtherToWei,
  displayEther,
  displayUsd,
  convertUSDtoEther,
  Web3State,
  web3Selectors,

  AngularContract,
  DappBaseComponent,
  DappInjector,
} from 'angular-web3';
import { Store } from '@ngrx/store';
import { first, firstValueFrom } from 'rxjs';
import { DialogService, NotifierService } from 'src/app/dapp-components';

import { doSignerTransaction } from 'src/app/dapp-injector/classes/transactor';
import { uniswap_abi } from '../uniswap_abi';

@Component({
  selector: 'hello-world-contract',
  templateUrl: './hello-world-contract.component.html',
  styleUrls: ['./hello-world-contract.component.css'],
})
export class HelloWorldContractComponent extends DappBaseComponent implements OnInit {
  blocks: Array<BlockWithTransactions> = [];

  walletBalance!: IBALANCE;
  contractBalance!: IBALANCE;
  contractHeader!: any;
  deployer_address!: string;
  //  myContract!: ethers.Contract;
  greeting!: string;
  greeting_input!: string;
  provider!: ethers.providers.JsonRpcProvider;
  //  signer: any;
  deployer_balance: any;
  loading_contract: 'loading' | 'found' | 'error' = 'loading';

  // newWallet!: ethers.Wallet;

  dollarExchange!: number;
  balanceDollar!: number;
  private _dollarExchange!: number;

  constructor(
    private dialogService: DialogService,
    private notifierService: NotifierService,
    dapp: DappInjector,
    store: Store<Web3State>
  ) {
    super(dapp, store);
  }

  async onChainStuff() {
    try {
      // await this.dapp.init();

      this.deployer_address = this.dapp.signerAddress!;

      this.dapp.provider!.on('block', async (log: any, event: any) => {
        this.refreshContractBalance();

        const block = await this.dapp.provider!.getBlockWithTransactions(log);
        this.blocks = [block].concat(this.blocks);
      });

      this.contractHeader = {
        name: this.defaultContract.name,
        address: this.defaultContract.address,
        abi: this.defaultContract.abi,
        network: this.defaultContract.network_deployed,
      };

      await this.displayGreeting();
    } catch (error) {
      console.log(error);
      this.loading_contract = 'error';
    }
  }

  async getDollarEther() {
    if (this._dollarExchange == undefined) {
      const uniswapUsdcAddress = '0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc';
      const uniswapAbi = uniswap_abi;

      const uniswapService = await this.dapp.createProvider([
        'https://eth-mainnet.gateway.pokt.network/v1/lb/611156b4a585a20035148406',
        `https://eth-mainnet.alchemyapi.io/v2/oKxs-03sij-U_N0iOlrSsZFr29-IqbuF`,
        'https://rpc.scaffoldeth.io:48544',
      ]);

      const getUniswapContract = async (address: string) => await new Contract(address, uniswapAbi, uniswapService);
      const contract = await getUniswapContract(uniswapUsdcAddress);
      const reserves = (await contract['getReserves']()) as { _reserve0: number; _reserve1: number };

      this._dollarExchange = (Number(reserves._reserve0) / Number(reserves._reserve1)) * 1e12;
    }
    return this._dollarExchange;
  }

  async refreshContractBalance() {
    const balance = await this.dapp.provider!.getBalance(this.contractHeader.address);
    const ehterbalance = convertWeiToEther(+balance);
    const dollar = ehterbalance * (await this.getDollarEther());
    this.contractBalance = {
      ether: displayEther(ehterbalance),
      usd: displayUsd(dollar),
    };
  }

  async addBlock(blockNr: number) {
    const block = await this.dapp.provider!.getBlockWithTransactions(blockNr);
    this.blocks = this.blocks.concat(block);
  }

  async displayGreeting() {

    let result =  await this.defaultContract.instance.greet()

   
    this.greeting = result;

    this.loading_contract = 'found';
  }



  async openTransaction() {
    console.log(await this.getDollarEther());
  
    const res = await this.dialogService.openDialog();
    this.blockchain_is_busy = true;
    if (res && res.type == 'transaction') {
      const usd = res.amount;
      const amountInEther = convertUSDtoEther(res.amount, await this.getDollarEther());
      const amountinWei = convertEtherToWei(amountInEther);

      let tx = this.dapp.signer?.sendTransaction({
        to: res.to,
        // Convert currency unit from ether to wei
        value: amountinWei,
      });

      const transaction_result = await doSignerTransaction(tx!)  
      this.blockchain_is_busy = false;
      //await this.notifierService.showNotificationTransaction(transaction_result);
    } else {
      this.blockchain_is_busy = false;
    }
  }

  async changeGreeting() {
    if (this.greeting_input == undefined) {
      alert('No Greeting found, be nice!!');
      return;
    }
    this.blockchain_is_busy = true;
    // const transaction_result = await this.dapp.runfunction({
    //   contractKey: 'myContract',
    //   method: 'setGreeting',
    //   args: [this.greeting_input],
    // });

    // const myFucntion = this.myContract.functions['setGreeting'];
    // const myResult = await this.dapp.dispatchContractFunction(
    //   myFucntion,
    //   [this.greeting_input],
    //   'payable'
    // );

    let tx = this.defaultContract.instance.setGreeting(this.greeting_input)

    let transaction_result = await doSignerTransaction(tx)

    // const transaction_result =
    //   await this.dapp.defaultContract.runTransactionFunction(
    //     'setGreeting',
    //     [this.greeting_input]
    //   );
     this.blockchain_is_busy = false;
    // await this.notifierService.showNotificationTransaction(
    //   transaction_result.msg
    // );
    this.displayGreeting();
  }

  override async hookChainIsLoading() {
    console.log('is loading')
  }

  ngOnInit(): void {}

  override async hookFailedtoConnectNetwork(): Promise<void> {
    console.log('Failed to Connect');
  }

  override async hookContractConnected(): Promise<void> {
    console.log('CONNECTED COMPONENT')
    this.onChainStuff();
    console.log(this.blockchain_status)
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  override ngAfterViewInit(): void {
    super.ngAfterViewInit();
    console.log('AFTER View init Component')
  }
}
