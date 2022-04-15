import { Component, Inject, OnInit } from '@angular/core';

import { Contract, ethers, Signer, utils } from 'ethers';

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
import { DialogService, NotifierService } from '../../dapp-components';
import { uniswap_abi } from 'src/app/dapp-injector/helpers/uniswap_abi';
import { FormControl, Validators } from '@angular/forms';
import { GraphQlService } from 'src/app/dapp-injector/services/graph-ql/graph-ql.service';

@Component({
  selector: 'the-graph-demo',
  templateUrl: './the-graph-demo.component.html',
  styleUrls: ['./the-graph-demo.component.scss'],
})
export class TheGraphDemoComponent extends DappBaseComponent implements OnInit {


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
  nameCtrl = new FormControl('', Validators.required)
  imageCtrl = new FormControl('', Validators.required)

  dollarExchange!: number;
  balanceDollar!: number;
  private _dollarExchange!: number;

  constructor(
    private dialogService: DialogService,
    private notifierService: NotifierService,
    private graphQl:GraphQlService,
    dapp: DappInjector,
    store: Store<Web3State>
  ) {
    super(dapp, store);
  }

  async onChainStuff() {
    try {
      // await this.dapp.init();

      this.deployer_address = this.dapp.signerAddress!;


    
        this.defaultContract.contract.on('NewGravatar', (args) => {
          let payload;
          if (typeof args == 'object') {
            payload = JSON.stringify(args);
          } else {
            payload = args.toString();
          }
          console.log(payload)
        });
 

        this.defaultContract.contract.on('UpdatedGravatar', (args,arg2,arg3,arg4) => {
          let payload;
          console.log(args,arg2,arg3,arg4)
          if (typeof args == 'object') {
            payload = JSON.stringify(args);
          } else {
            payload = args.toString();
          }
          console.log(payload)
        });
 


      this.contractHeader = {
        name: this.defaultContract.name,
        address: this.defaultContract.address,
        abi: this.defaultContract.abi,
        network: '',
      };
    } catch (error) {
      console.log(error);
      this.loading_contract = 'error';
    }
  }

  async updateGravatarName() {
    if (this.nameCtrl.invalid){
      alert("please input name")
      return
    }
    const name = this.nameCtrl.value;
    const result = await this.defaultContract.runFunction('updateGravatarName', [
      name,{ gasPrice: utils.parseUnits('100', 'gwei'), 
      gasLimit: 2000000 }
    ]);
    console.log(result);
  }

  async updateGravatarImage() {
    if (this.imageCtrl.invalid){
      alert("please input image")
      return
    }
    const image = this.imageCtrl.value;
    const result = await this.defaultContract.runFunction('updateGravatarImage', [
     image,{ gasPrice: utils.parseUnits('100', 'gwei'), 
     gasLimit: 2000000 }
    ]);
  
  }

  async createGravatar() {
    if (this.nameCtrl.invalid){
      alert("please input name")
      return
    }
    const name = this.imageCtrl.value;


    if (this.imageCtrl.invalid){
      alert("please input image")
      return
    }
    const image = this.imageCtrl.value;





    const result = await this.defaultContract.runFunction('createGravatar', [
      name,image
    ]);
    console.log(result);
  }

  async getGravatar() {
    const result = await this.defaultContract.runFunction('getGravatar', [
      this.dapp.signerAddress,
    ]);
    console.log(result);
  }

  async doFaucet() {
    this.blockchain_is_busy = true;
    let amountInEther = '0.1';
    // Create a transaction object

    let tx = {
      to: await this.dapp.signerAddress,
      // Convert currency unit from ether to wei
      value: ethers.utils.parseEther(amountInEther),
    };

    const deployer = await this.defaultProvider.getSigner();

    // Send a transaction
    const transaction_result = await this.dapp.doTransaction(tx, deployer);
    this.blockchain_is_busy = false;
    await this.notifierService.showNotificationTransaction(transaction_result);
  }

  async openTransaction() {
    //  console.log(await this.getDollarEther());
    this.blockchain_is_busy = true;
    const res = await this.dialogService.openDialog();

    if (res && res.type == 'transaction') {
      const usd = res.amount;
      //  const amountInEther = convertUSDtoEther(res.amount, await this.getDollarEther());
      const amountinWei = 0; //convertEtherToWei(amountInEther);

      let tx = {
        to: res.to,
        // Convert currency unit from ether to wei
        value: amountinWei,
      };

      const transaction_result = await this.dapp.doTransaction(tx);
      this.blockchain_is_busy = false;
      await this.notifierService.showNotificationTransaction(
        transaction_result
      );
    } else {
      this.blockchain_is_busy = false;
    }
  }


  async query(){
    this.graphQl.query()
  }

  override async hookChainIsLoading() {
    console.log('is loading');
  }




  ngOnInit(): void {}

  override async hookFailedtoConnectNetwork(): Promise<void> {
    console.log('Failed to Connect');
  }

  override async hookContractConnected(): Promise<void> {
    console.log('CONNECTED COMPONENT');
    this.onChainStuff();
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  override ngAfterViewInit(): void {
    super.ngAfterViewInit();
    console.log('AFTER View init Component');
  }
}
