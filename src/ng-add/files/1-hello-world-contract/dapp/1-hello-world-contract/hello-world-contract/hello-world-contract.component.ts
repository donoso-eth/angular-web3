import { Component, Inject, OnInit } from '@angular/core';

import { ethers } from 'ethers';

import { OnChainService } from '../on-chain.service';

import {
  DialogService,
  BlockWithTransactions,
  IBALANCE,
  ICONTRACT,
  convertWeiToEther,
  convertEtherToWei,
  displayEther,
  displayUsd,
  convertUSDtoEther,
  NotifierService,
  IABI_OBJECT,
} from 'angular-web3';

@Component({
  selector: 'hello-world-contract',
  templateUrl: './hello-world-contract.component.html',
  styleUrls: ['./hello-world-contract.component.css'],
})
export class HelloWorldContractComponent implements OnInit {
  blocks: Array<BlockWithTransactions> = [];
  contract_abi!: Array<IABI_OBJECT>;
  walletBalance!: IBALANCE;
  contractBalance!: IBALANCE;
  contractHeader!: ICONTRACT;
  deployer_address!:string;
  myContract!: ethers.Contract;
  greeting!: string;
  greeting_input!: string;
  provider!: ethers.providers.JsonRpcProvider;
  signer: any;
  deployer_balance: any;
  loading_contract: 'loading' | 'found' | 'error' = 'loading';
  blockchain_is_busy = true;

  newWallet!: ethers.Wallet;

  dollarExchange!: number;
  balanceDollar!: number;
  constructor(
    private dialogService: DialogService,
    private notifierService:NotifierService,
    private onChainService: OnChainService
  ) {}

  async onChainStuff() {
    try {
    await this.onChainService.init();

    this.deployer_address =
      await this.onChainService.myProvider.Signer.getAddress();

    this.onChainService.myProvider.blockEventSubscription.subscribe(
      async (blockNr) => {
        this.onChainService.helloWorldContract.refreshBalance();
        this.onChainService.newWallet.refreshWalletBalance();
        this.blockchain_is_busy = false;
        const block =
          await this.onChainService.myProvider.Provider.getBlockWithTransactions(
            blockNr
          );
       this.blocks = [block].concat(this.blocks);
      }
    );

      this.newWallet = await this.onChainService.newWallet.wallet;
      this.myContract = this.onChainService.helloWorldContract.Contract;

      this.onChainService.helloWorldContract.contractBalanceSubscription.subscribe(
        async (balance) => {
          const ehterbalance = convertWeiToEther(balance);
          const dollar =
            ehterbalance * (await this.onChainService.getDollarEther());
          this.contractBalance = {
            ether: displayEther(ehterbalance),
            usd: displayUsd(dollar),
          };
        }
      );

      this.onChainService.newWallet.walletBalanceSubscription.subscribe(
        async (balance) => {
          const ehterbalance = convertWeiToEther(balance);
          const dollar =
            ehterbalance * (await this.onChainService.getDollarEther());
          this.walletBalance = {
            ether: displayEther(ehterbalance),
            usd: displayUsd(dollar),
          };
        }
      );

      this.contractHeader = {
        name: this.onChainService.helloWorldContract.metadata.name,
        address: this.onChainService.helloWorldContract.metadata.address,
      };

      //  this.dappInjectorService.blockchain_busy.subscribe(loading=> {
      //    this.blockchain_is_busy = loading
      //  })

      await this.displayGreeting();
    } catch (error) {
      console.log(error);
      this.loading_contract = 'error';
    }
  }

  async addBlock(blockNr:number) {
    const block =
    await this.onChainService.myProvider.Provider.getBlockWithTransactions(
      blockNr
    );
    this.blocks = this.blocks.concat(block);

  }

  async displayGreeting() {
    this.greeting = await this.onChainService.helloWorldContract.Contract['greet']();
    this.deployer_balance = ethers.utils.formatUnits(
      await this.newWallet.getBalance(),
      18
    );
    this.loading_contract = 'found';
  }

  async doFaucet() {
    this.blockchain_is_busy = true;
    let amountInEther = '0.01';
    // Create a transaction object
    let tx = {
      to: this.newWallet.address,
      // Convert currency unit from ether to wei
      value: ethers.utils.parseEther(amountInEther),
    };
    // Send a transaction
    const transaction_result =
      await this.onChainService.myProvider.doTransaction(tx);
    this.blockchain_is_busy = false;
    await this.notifierService.showNotificationTransaction(transaction_result);
  }

  async openTransaction() {
    console.log( await this.onChainService.getDollarEther())
    this.blockchain_is_busy = true;
    const res = await this.dialogService.openDialog();

  

    if (res && res.type == 'transaction') {
      const usd = res.amount;
      const amountInEther = convertUSDtoEther(
        res.amount,
        await this.onChainService.getDollarEther()
      );
      const amountinWei = convertEtherToWei(amountInEther);

      let tx = {
        to: res.to,
        // Convert currency unit from ether to wei
        value: amountinWei,
      };

      const transaction_result =
        await this.onChainService.newWallet.doTransaction(tx);
      this.blockchain_is_busy = false;
      await this.notifierService.showNotificationTransaction(
        transaction_result
      );
    } else {
    this.blockchain_is_busy = false;
    }
  }

  async changeGreeting() {
    this.blockchain_is_busy = true;
    if (this.greeting_input == undefined) {
      alert('No Greeting found, be nice!!');
      return;
    }

    // const myFucntion = this.myContract.functions['setGreeting'];
    // const myResult = await this.dappInjectorService.dispatchContractFunction(
    //   myFucntion,
    //   [this.greeting_input],
    //   'payable'
    // );

    const transaction_result = await this.onChainService.helloWorldContract.runTransactionFunction(
      'setGreeting',
      [this.greeting_input]
    );
    this.blockchain_is_busy = false;
    await this.notifierService.showNotificationTransaction(transaction_result.msg);
    this.displayGreeting();
  }

  ngOnInit(): void {
    this.onChainStuff();
  }
}
