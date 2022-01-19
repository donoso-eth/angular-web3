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
} from 'angularonchain';

@Component({
  selector: 'hello-world-contract',
  templateUrl: './hello-world-contract.component.html',
  styleUrls: ['./hello-world-contract.component.css'],
})
export class HelloWorldContractComponent implements OnInit {
  blocks: Array<BlockWithTransactions> = [];
  deployer_address;
  contract_address;
  myContract: ethers.Contract;
  greeting: string;
  greeting_input: string;

  deployer_balance: any;
  loading_contract: 'found' | 'error';
  newWallet: ethers.Wallet;
  contractBalance: IBALANCE;
  walletBalance: IBALANCE;
  blockchain_is_busy: boolean = true;
  contractHeader: ICONTRACT;
  constructor(
    private dialogService: DialogService,
    private notifierService:NotifierService,
    private onChainService: OnChainService
  ) {}

  async onChainStuff() {
    try {
    await this.onChainService.init();

    this.deployer_address =
      await this.onChainService.localProvider.Signer.getAddress();

    this.onChainService.localProvider.blockEventSubscription.subscribe(
      async (blockNr) => {
        this.onChainService.contractService.refreshBalance();
        this.onChainService.walletService.refreshWalletBalance();
        this.blockchain_is_busy = false;
        const block =
          await this.onChainService.localProvider.Provider.getBlockWithTransactions(
            blockNr
          );
       this.blocks = [block].concat(this.blocks);
      }
    );

      this.newWallet = await this.onChainService.walletService.wallet;
      this.myContract = this.onChainService.contractService.Contract;

      this.onChainService.contractService.contractBalanceSubscription.subscribe(
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

      this.onChainService.walletService.walletBalanceSubscription.subscribe(
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
        name: this.onChainService.contractService.metadata.name,
        address: this.onChainService.contractService.metadata.address,
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

  async addBlock(blockNr) {
    const block =
    await this.onChainService.localProvider.Provider.getBlockWithTransactions(
      blockNr
    );
    this.blocks = this.blocks.concat(block);

  }

  async displayGreeting() {
    this.greeting = await this.onChainService.contractService.Contract.greet();
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
      await this.onChainService.localProvider.doTransaction(tx);
    this.blockchain_is_busy = false;
    await this.notifierService.showNotificationTransaction(transaction_result);
  }

  async openTransaction() {
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
        await this.onChainService.walletService.doTransaction(tx);
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

    const transaction_result = await this.onChainService.contractService.runTransactionFunction(
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
