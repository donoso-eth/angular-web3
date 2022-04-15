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

import { ContractInputComponent } from '../contract-input/contract-input.component';

import { Contract, ethers, Signer } from 'ethers';
import {
  AngularContract,
  BlockWithTransactions,
  convertEtherToWei,
  convertUSDtoEther,
  convertWeiToEther,
  DappInjector,

  displayEther,
  displayUsd,
  IABI_OBJECT,
  IBALANCE,
  ICONTRACT_METADATA,
  IINPUT_EVENT,
  web3Selectors,
  Web3State,
} from 'angular-web3';
import { Store } from '@ngrx/store';
import { DialogService, NotifierService } from 'src/app/dapp-components';
import { DappBaseComponent, netWorkByName } from 'src/app/dapp-injector/constants';
import { create } from "ipfs-http-client";
import { IDEFAULT_CONTRACT } from 'src/assets/contracts/interfaces';
import { doSignerTransaction } from 'src/app/dapp-injector/classes/transactor';
import { uniswap_abi } from '../uniswap_abi';

export const ipfs = create({ host: "ipfs.infura.io", port: 5001, protocol: "https" });

@Component({
  selector: 'debug-contract',
  templateUrl: './debug-contract.component.html',
  styleUrls: ['./debug-contract.component.css'],
})
export class DebugContractComponent  extends DappBaseComponent {
  blocks: Array<BlockWithTransactions> = [];
  contract_abi!: Array<IABI_OBJECT>;
  walletBalance!: IBALANCE;
  contractBalance!: IBALANCE;
  contractHeader!: ICONTRACT_METADATA;
  deployer_address!: string;

  greeting!: string;
  greeting_input!: string;
  provider!: ethers.providers.JsonRpcProvider;

  deployer_balance: any;
  loading_contract: 'loading' | 'found' | 'error' = 'loading';
  componentInstances: Array<ContractInputComponent> = [];
  stateInstances: Array<ContractInputComponent> = [];
  events: Array<any> = [];
  eventsAbiArray: Array<any> = [];


  newWallet!: ethers.Wallet;

  dollarExchange!: number;
  balanceDollar!: number;
  debugContract!: AngularContract<IDEFAULT_CONTRACT>
  constructor(
    private cd: ChangeDetectorRef,
    private dialogService: DialogService,
    private notifierService: NotifierService,
     dapp: DappInjector,
    store: Store<Web3State>,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    super(dapp,store)
  }

  @ViewChild('inputContainer', { read: ViewContainerRef })
  inputContainer!: ViewContainerRef;

  @ViewChild('stateContainer', { read: ViewContainerRef })
  stateContainer!: ViewContainerRef;

  @ViewChild('payableContainer', { read: ViewContainerRef })
  payableContainer!: ViewContainerRef;

  add(abi: IABI_OBJECT): void {
    this.cd.detectChanges();
    // create the compoxnent factory
    const dynamicComponentFactory =
      this.componentFactoryResolver.resolveComponentFactory(
        ContractInputComponent
      );


    let componentRef: any;
    // add the component to the view

    if (
      abi.stateMutability == 'view' &&
      abi.inputs!.length == 0 &&
      abi.outputs!.length == 1
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

        const tx =  (this.defaultContract.instance as Contract).functions[value.function].apply(
          this,
          value.args
        );

        const myResult =  await doSignerTransaction(tx)


   

    
        if (myResult.success == false) {
          await this.notifierService.showNotificationTransaction(myResult);
        }

        // if (myResult.success !== undefined) {
        //   await this.notifierService.showNotificationTransaction(myResult);
        // }

        if (value.function !== 'pure' && value.function !== 'view') {
          this.updateState();
        }

        if (value.outputs.length > 0) {
          if (myResult.success == true) {
            componentRef.instance.refreshUi(myResult.payload.toString());
          } else {
            await this.notifierService.showNotificationTransaction(
              myResult
            );
          }
        }
      }
    );
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


  async updateState() {

    for (const stateCompo of this.stateInstances) {
      const method = stateCompo.abi_input.name as string;
  
   
      const tx =  (this.defaultContract.instance as Contract).functions[method].apply(
        this,
       []
      );

      const result =  await doSignerTransaction(tx)


    
      // const outputArray = result.payload.map( (map:any)=> map.toString())

      if (result.success == true) {
        stateCompo.refreshUi(result.payload);
      } else {
        this.notifierService.showNotificationTransaction(result);
      }
    }
  }

  async refreshContractBalance() {
    const balance = await this.dapp.provider!.getBalance(this.contractHeader.address);
    const ehterbalance = convertWeiToEther(+balance.toString());
    const dollar =
      ehterbalance * (await this.getDollarEther());
    this.contractBalance = {
      ether: displayEther(ehterbalance),
      usd: displayUsd(dollar),
    };
  }

  async addBlock(blockNr: number) {
    const block = await this.dapp.provider!.getBlockWithTransactions(blockNr);
    this.blocks = this.blocks.concat(block);
  }

  async doFaucet() {
    this.blockchain_is_busy = true;
    let amountInEther = '0.1';
    // Create a transaction object

    let tx = this.dapp.signer!.sendTransaction({
      to: await this.dapp.signer?.getAddress(),
      // Convert currency unit from ether to wei
      value: ethers.utils.parseEther(amountInEther),
    });

    // Send a transaction
    const transaction_result = await doSignerTransaction(tx)  ;
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
        await this.getDollarEther()
      );
      const amountinWei = convertEtherToWei(amountInEther);

      let tx = this.dapp.signer?.sendTransaction({
        to: res.to,
        // Convert currency unit from ether to wei
        value: amountinWei,
      });

  
      const transaction_result = await  doSignerTransaction(tx!)

      this.blockchain_is_busy = false;
      await this.notifierService.showNotificationTransaction(
        transaction_result
      );
    } else {
      this.blockchain_is_busy = false;
    }
  }


  async onChainStuff() {
    try {
      this.deployer_address = await (
        await this.dapp.provider!.getSigner()
      ).getAddress();


      this.componentInstances = [];
      this.stateInstances = [];
      this.events = [];
      this.eventsAbiArray = [];
   

      this.dapp.provider!.on(
        'block',
        async (log: any, event: any) => {
          this.refreshContractBalance();

          const block = await this.dapp.provider!.getBlockWithTransactions(log);
          this.blocks = [block].concat(this.blocks);
        }
      );

        

      this.contractHeader = {
        name: this.dapp.contractMetadata.name,
        address: this.defaultContract.address,
        abi:this.dapp.contractMetadata.abi,
        network: netWorkByName('localhost').name
      };

      this.eventsAbiArray = this.contract_abi.filter(
        (fil) => fil.type == 'event'
      );

      this.eventsAbiArray.forEach((val) => {
        this.defaultContract.instance.on(val.name, (args:any) => {
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

    
      this.cd.detectChanges();
      this.inputContainer.clear();
      this.stateContainer.clear();

      this.contract_abi
        .filter((fil) => fil.type !== 'constructor')
        .filter((fil) => fil.type !== 'event')
        .filter((fil) => fil.type !== 'receive')
        .forEach((abi) => {
          this.add(abi);
        });



        this.dollarExchange = await this.getDollarEther()

      this.updateState();
    } catch (error) {
      console.log(error);
      this.loading_contract = 'error';
    }
  }



  override async  hookContractConnected(): Promise<void> {
      this.contract_abi = this.defaultContract.abi;
      this.onChainStuff()
  }




}
