import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ElementRef,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

import DebugContractMetadata from '../../../../../assets/contracts/debug_contract_metadata.json';
import { ContractInputComponent } from '../contract-input/contract-input.component';

import { ethers } from 'ethers';
import { DialogService } from 'src/app/dapp/dapp-injector/components/dialog/dialog.service';
import { DappInjectorService } from 'src/app/dapp/dapp-injector/dapp-injector.service';
import { IABI_OBJECT, IBALANCE, ICONTRACT, IINPUT_EVENT } from 'src/app/dapp/dapp-injector/shared/models';




@Component({
  selector: 'contract-debug',
  templateUrl: './contract-debug.component.html',
  styleUrls: ['./contract-debug.component.css'],
})
export class ContractDebugComponent implements AfterViewInit {
  contract_abi: Array<IABI_OBJECT>;
  walletBalance: IBALANCE;
  contractBalance: IBALANCE;
  contractHeader:ICONTRACT;
  deployer_address;

  myContract: ethers.Contract;
  greeting: string;
  greeting_input: string;
  provider: ethers.providers.JsonRpcProvider;
  signer: any;
  deployer_balance: any;
  loading_contract: 'loading' | 'found' | 'error' = 'loading';
  componentInstances: Array<ContractInputComponent> = [];
  stateInstances: Array<ContractInputComponent> = [];
  events = [];
  eventsAbiArray = [];

  blockchain_is_busy = true;

  newWallet: ethers.Wallet;

  dollarExchange: number;
  balanceDollar: number;
  constructor(
    private dialogService:DialogService,
    private cd: ChangeDetectorRef,
    private dappInjectorService: DappInjectorService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    this.contract_abi = DebugContractMetadata.abi;
    console.log(this.contract_abi)
  }

  @ViewChild('inputContainer', { read: ViewContainerRef })
  inputContainer: ViewContainerRef;

  @ViewChild('stateContainer', { read: ViewContainerRef })
  stateContainer: ViewContainerRef;

  @ViewChild('payableContainer', { read: ViewContainerRef })
  payableContainer: ViewContainerRef;

  add(abi: IABI_OBJECT): void {
    // create the compoxnent factory
    const dynamicComponentFactory =
      this.componentFactoryResolver.resolveComponentFactory(
        ContractInputComponent
      );

    let componentRef;
    // add the component to the view

    if (
      abi.stateMutability == 'view' &&
      abi.inputs.length == 0 &&
      abi.outputs.length == 1
    ) {
      componentRef = this.stateContainer.createComponent(
        dynamicComponentFactory
      );
      this.stateInstances.push(componentRef.instance);
    } else if (abi.stateMutability == 'payable') {
      componentRef = this.payableContainer.createComponent(
        dynamicComponentFactory
      );
    } else {
      componentRef = this.inputContainer.createComponent(
        dynamicComponentFactory
      );
    }
    componentRef.instance.initUi(abi);
    this.componentInstances.push(componentRef.instance);

    componentRef.instance.newEventFunction.subscribe(
      async (value: IINPUT_EVENT) => {
 

        const myFucntion = this.myContract.functions[value.function];
        const myResult = await this.dappInjectorService.dispatchContractFunction(
          myFucntion,
          value.args,
          value.state
        );
      
        if (value.function !== 'pure' && value.function !== 'view') {
       
          this.updateState();
        }

        if (value.outputs.length > 0) {
          componentRef.instance.refreshUi(myResult);
        }
      }
    );
  }

  async updateState() {
    for (const stateCompo of this.stateInstances) {
      const result =await  this.dappInjectorService.runContractFunction(this.myContract.functions[
        stateCompo.abi_input.name
      ],{})

      stateCompo.refreshUi(result);
    }
  }

  async onChainStuff() {

    this.dappInjectorService.metaContract = DebugContractMetadata

    await this.dappInjectorService.initDapp()

    try {
      // First we create a provider instance
      // If we want to create a specific clockchain provider, we must pass the url.
      //this.provider = new ethers.providers.JsonRpcProvider();

      // Once the provider instance is created, we can request the signer (in localhost node is the first account)
      // In the Blockchain the signer is passed through the hardhat config or metamask
     // this.signer = this.provider.getSigner();

     // const userWallet = await getWallet();

  
      this.newWallet = await this.dappInjectorService.getMyWallet()
   
  

      // Signer Address
      this.deployer_address = await (await this.dappInjectorService.getSigner()).getAddress()

      // Contract Address (created while deploying)
      this.contractHeader = { name: DebugContractMetadata.name, address: DebugContractMetadata.address};

      // Contract instance passing the address, the abi(contract interface) and the signer
      this.myContract = await this.dappInjectorService.getContract()

      // let lastBalance = ethers.constants.Zero;
      // this.provider.on('block', () => {
      //   this.provider.getBalance(this.newWallet.address).then((balance) => {
      //     if (!balance.eq(lastBalance)) {
      //       lastBalance = balance;

      //       // convert a currency unit from wei to ether
      //       const balanceInEth = ethers.utils.formatEther(balance);
      //       this.formatBalance(+balanceInEth);
      //     }
      //   });
      // });

      this.eventsAbiArray = this.contract_abi.filter(
        (fil) => fil.type == 'event'
      );

      this.eventsAbiArray.forEach((val) => {
      
        this.myContract.on(val.name, (args) => {
          console.log(args)
          let payload;
          if (typeof args == 'object') {
            payload = JSON.stringify(args);
          } else {
            payload = args.toString();
          }

          this.events.unshift({
            name: val.name,
            payload,
            timeStamp: new Date().toLocaleTimeString(),
          });
        });
      });

      this.dappInjectorService.contractBalance.subscribe(balance=> {
        this.contractBalance = balance
      })


      this.dappInjectorService.walletBalance.subscribe(wallet=> {
        this.walletBalance = wallet
      })
     

     this.dappInjectorService.blockchain_busy.subscribe(loading=> {
       this.blockchain_is_busy = loading
     })

      this.contract_abi
        .filter((fil) => fil.type !== 'constructor')
        .filter((fil) => fil.type !== 'event')
        .filter((fil) => fil.type !== 'receive')
        .forEach((abi) => {
          this.add(abi);
        });

      this.updateState();
    } catch (error) {
      this.loading_contract = 'error';
    }
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



  ngAfterViewInit(): void {
    this.onChainStuff();
  }
}
