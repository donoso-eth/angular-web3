import { Component, Inject, OnInit } from '@angular/core';

import { Contract, ethers, Signer } from 'ethers';

import { DappInjectorService } from '../../../dapp-injector/dapp-injector.service';

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
  Web3State,
  web3Selectors,
  IMETA_CONTRACT,
} from 'angular-web3';
import { Store } from '@ngrx/store';
import { first, firstValueFrom } from 'rxjs';

@Component({
  selector: 'hello-world-contract',
  templateUrl: './hello-world-contract.component.html',
  styleUrls: ['./hello-world-contract.component.css'],
})
export class HelloWorldContractComponent implements OnInit {
  blocks: Array<BlockWithTransactions> = [];

  walletBalance!: IBALANCE;
  contractBalance!: IBALANCE;
  contractHeader!: ICONTRACT;
  deployer_address!: string;
  //  myContract!: ethers.Contract;
  greeting!: string;
  greeting_input!: string;
  provider!: ethers.providers.JsonRpcProvider;
  //  signer: any;
  deployer_balance: any;
  loading_contract: 'loading' | 'found' | 'error' = 'loading';
  blockchain_is_busy = true;

  // newWallet!: ethers.Wallet;

  dollarExchange!: number;
  balanceDollar!: number;
  myContract!: IMETA_CONTRACT;
  signer!: Signer ;
  constructor(
    private dialogService: DialogService,
    private notifierService: NotifierService,
    private dappInjectorService: DappInjectorService,
    private store: Store<Web3State>
  ) {}

  async onChainStuff() {
    try {
      // await this.dappInjectorService.init();

      this.deployer_address =
        await (await this.dappInjectorService.config.providers['main'].getSigner()).getAddress();

        this.dappInjectorService.config.providers['main'].on('block', async (log:any, event:any) => {
  
          this.refreshContractBalance();
         
          const block =
            await  this.dappInjectorService.config.providers['main'].getBlockWithTransactions(
              log
            );
          this.blocks = [block].concat(this.blocks);
        }
      );

      // this.newWallet = await this.dappInjectorService.newWallet.wallet;

      // this.dappInjectorService.helloWorldContract.contractBalanceSubscription.subscribe(
      //   async (balance) => {
      //     const ehterbalance = convertWeiToEther(balance);
      //     const dollar =
      //       ehterbalance * (await this.dappInjectorService.getDollarEther());
      //     this.contractBalance = {
      //       ether: displayEther(ehterbalance),
      //       usd: displayUsd(dollar),
      //     };
      //   }
      // );

      // this.dappInjectorService.newWallet.walletBalanceSubscription.subscribe(
      //   async (balance) => {
      //     const ehterbalance = convertWeiToEther(balance);
      //     const dollar =
      //       ehterbalance * (await this.dappInjectorService.getDollarEther());
      //     this.walletBalance = {
      //       ether: displayEther(ehterbalance),
      //       usd: displayUsd(dollar),
      //     };
      //   }
      // );

      this.contractHeader = {
        name: this.myContract.name,
        address: this.myContract.address,
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

  async refreshContractBalance(){
   const balance = await this.dappInjectorService.config.providers['main'].getBalance(this.contractHeader.address)
             const ehterbalance = convertWeiToEther(balance);
          const dollar =
            ehterbalance * (await this.dappInjectorService.getDollarEther());
          this.contractBalance = {
            ether: displayEther(ehterbalance),
            usd: displayUsd(dollar),
          };
  }

  async addBlock(blockNr: number) {
    const block =
       await  this.dappInjectorService.config.providers['main'].getBlockWithTransactions(
        blockNr
      );
    this.blocks = this.blocks.concat(block);
  }

  async displayGreeting() {
    this.greeting = await this.dappInjectorService.runfunction({
      contractKey: 'myContract',
      method: 'greet',
      args: [],
    });
    console.log(this.greeting);
    // this.deployer_balance = ethers.utils.formatUnits(
    //   await this.newWallet.getBalance(),
    //   18
    // );
    this.loading_contract = 'found';
  }

  async doFaucet() {
    this.blockchain_is_busy = true;
    let amountInEther = '0.1';
    // Create a transaction object



    let tx = {
      to: await this.dappInjectorService.config.signer?.getAddress(),
      // Convert currency unit from ether to wei
      value: ethers.utils.parseEther(amountInEther),
    };


    // Send a transaction
    const transaction_result =
      await this.dappInjectorService.doTransaction(tx,true);
    this.blockchain_is_busy = false;
    await this.notifierService.showNotificationTransaction(transaction_result);
  }

  async openTransaction() {
    console.log(await this.dappInjectorService.getDollarEther());
    this.blockchain_is_busy = true;
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

      const transaction_result =
        await this.dappInjectorService.doTransaction(tx);
      this.blockchain_is_busy = false;
      await this.notifierService.showNotificationTransaction(
        transaction_result
      );
    } else {
      this.blockchain_is_busy = false;
    }
  }

  async changeGreeting() {
  
    if (this.greeting_input == undefined) {
      alert('No Greeting found, be nice!!');
      return;
    }

    const transaction_result = await this.dappInjectorService.runfunction({
      contractKey: 'myContract',
      method: 'setGreeting',
      args: [this.greeting_input],
    });

    // const myFucntion = this.myContract.functions['setGreeting'];
    // const myResult = await this.dappInjectorService.dispatchContractFunction(
    //   myFucntion,
    //   [this.greeting_input],
    //   'payable'
    // );

    
    // const transaction_result =
    //   await this.dappInjectorService.helloWorldContract.runTransactionFunction(
    //     'setGreeting',
    //     [this.greeting_input]
    //   );
   // this.blockchain_is_busy = false;
    await this.notifierService.showNotificationTransaction(
      transaction_result.msg
    );
    this.displayGreeting();
  }

  ngOnInit(): void {
    this.store.pipe(web3Selectors.selectChainReady).subscribe(async (value) => {
      console.log(value);
      this.myContract = this.dappInjectorService.config.contracts['myContract'];
      this.signer = this.dappInjectorService.config.signer as Signer
      this.onChainStuff();
    });

    this.store
      .select(web3Selectors.isNetworkBusy)
      .subscribe((isBusy:boolean) =>  {
        console.log(isBusy)
        this.blockchain_is_busy = isBusy});
  }
}
