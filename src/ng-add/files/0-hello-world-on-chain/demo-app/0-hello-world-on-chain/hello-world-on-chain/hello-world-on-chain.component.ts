import { Component, OnInit } from '@angular/core';

import { ethers } from 'ethers';
import { DialogService } from 'src/app/dapp/dapp-injector/components/dialog/dialog.service';
import { DappInjectorService } from 'src/app/dapp/dapp-injector/dapp-injector.service';
import { IBALANCE } from 'src/app/dapp/dapp-injector/shared/models';

import HelloWorlOnChintMetadata from '../../../../../assets/contracts/hello_world_on_chain_metadata.json';

@Component({
  selector: 'hello-world-on-chain',
  templateUrl: './hello-world-on-chain.component.html',
  styleUrls: ['./hello-world-on-chain.component.css']

})
export class HelloWorldOnChainComponent implements OnInit {
  deployer_address;
  contract_address;
  myContract: ethers.Contract;
  greeting: string;
  greeting_input: string;
  provider: ethers.providers.JsonRpcProvider;
  signer: any;
  deployer_balance: any;
  loading_contract:  'found' | 'error';
  newWallet: ethers.Wallet;
  contractHeader: { name: any; address: any };
  contractBalance: IBALANCE;
  walletBalance: IBALANCE;
  blockchain_is_busy: boolean = true;
  constructor(
    private dialogService:DialogService,
    private dappInjectorService: DappInjectorService) {}

  async onChainStuff() {
    try {
      this.dappInjectorService.metaContract = HelloWorlOnChintMetadata;

      await this.dappInjectorService.initDapp();

      this.newWallet = await this.dappInjectorService.getMyWallet();

      // Signer Address
      this.deployer_address = await (
        await this.dappInjectorService.getSigner()
      ).getAddress();

      // Contract Address (created while deploying)
      // Contract Address (created while deploying)
      this.contractHeader = {
        name: HelloWorlOnChintMetadata.name,
        address: HelloWorlOnChintMetadata.address,
      };

      // Contract instance passing the address, the abi(contract interface) and the signer
      this.myContract = await this.dappInjectorService.getContract();

      this.dappInjectorService.contractBalance.subscribe(balance=> {
        this.contractBalance = balance
      })


      this.dappInjectorService.walletBalance.subscribe(wallet=> {
        this.walletBalance = wallet
      })
     

     this.dappInjectorService.blockchain_busy.subscribe(loading=> {
       this.blockchain_is_busy = loading
     })

      await this.displayGreeting();
    } catch (error) {
      console.log(error)
      this.loading_contract = 'error';
    }
  }

  async displayGreeting() {
    this.greeting = await this.myContract.greet();
    this.deployer_balance = ethers.utils.formatUnits(
      await this.newWallet.getBalance(),
      18
    );
    this.loading_contract = 'found';
  }

  
  async doFaucet() {
   
    let amountInEther = '0.01';
    // Create a transaction object
    let tx = {
      to: this.newWallet.address,
      // Convert currency unit from ether to wei
      value: ethers.utils.parseEther(amountInEther),
    };
    // Send a transaction
    await this.dappInjectorService.doTransaction(tx,'signer')
  
  }

  async openTransaction(){
    const res = await  this.dialogService.openDialog()
    if (res.type == 'transaction'){
      const usd = res.amount
      const amountInEther = this.dappInjectorService.convertUSDtoEther(res.amount)
      const amountinWei = (this.dappInjectorService.convertEtherToWei(amountInEther))
  
      let tx = {
        to: res.to,
        // Convert currency unit from ether to wei
        value: amountinWei
      };

       await this.dappInjectorService.doTransaction(tx,'wallet')
       
    }
  }

  async changeGreeting() {
    if (this.greeting_input == undefined) {
      alert('No Greeting found, be nice!!');
      return;
    }


   
    const myFucntion = this.myContract.functions['setGreeting'];
    const myResult = await this.dappInjectorService.dispatchContractFunction(
      myFucntion,
      [this.greeting_input],
      'payable'
    );

    this.displayGreeting();
  }

  ngOnInit(): void {
    this.onChainStuff();
  }
}
