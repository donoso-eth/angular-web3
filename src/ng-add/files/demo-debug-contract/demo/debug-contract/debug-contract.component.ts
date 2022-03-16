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

import { ethers, Signer } from 'ethers';
import {
  AngularContract,
  BlockWithTransactions,
  convertEtherToWei,
  convertUSDtoEther,
  convertWeiToEther,
  DappInjectorService,

  displayEther,
  displayUsd,
  IABI_OBJECT,
  IBALANCE,
  ICONTRACT,
  IINPUT_EVENT,
  web3Selectors,
  Web3State,
} from 'angular-web3';
import { Store } from '@ngrx/store';
import { DialogService, NotifierService } from 'src/app/dapp-components';
import { netWorkByName } from 'src/app/dapp-injector/constants';

@Component({
  selector: 'debug-contract',
  templateUrl: './debug-contract.component.html',
  styleUrls: ['./debug-contract.component.css'],
})
export class DebugContractComponent implements AfterViewInit {
  blocks: Array<BlockWithTransactions> = [];
  contract_abi!: Array<IABI_OBJECT>;
  walletBalance!: IBALANCE;
  contractBalance!: IBALANCE;
  contractHeader!: ICONTRACT;
  deployer_address!: string;

  greeting!: string;
  greeting_input!: string;
  provider!: ethers.providers.JsonRpcProvider;
  signer: any;
  deployer_balance: any;
  loading_contract: 'loading' | 'found' | 'error' = 'loading';
  componentInstances: Array<ContractInputComponent> = [];
  stateInstances: Array<ContractInputComponent> = [];
  events: Array<any> = [];
  eventsAbiArray: Array<any> = [];

  blockchain_is_busy = true;

  newWallet!: ethers.Wallet;

  dollarExchange!: number;
  balanceDollar!: number;
  debugContract!: AngularContract
  constructor(
    private cd: ChangeDetectorRef,
    private dialogService: DialogService,
    private notifierService: NotifierService,
    private dappInjectorService: DappInjectorService,
    private store: Store<Web3State>,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

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
        const myResult = await this.dappInjectorService.runfunction({
          method: value.function,
          contractKey: 'myContract',
          args: value.args,
        });

        if (myResult.msg.success == false) {
          await this.notifierService.showNotificationTransaction(myResult.msg);
        }

        if (myResult.msg.success_result !== undefined) {
          await this.notifierService.showNotificationTransaction(myResult.msg);
        }

        if (value.function !== 'pure' && value.function !== 'view') {
          this.updateState();
        }

        if (value.outputs.length > 0) {
          if (myResult.msg.success == true) {
            console.log(myResult.payload)
            componentRef.instance.refreshUi(myResult.payload.toString());
          } else {
            await this.notifierService.showNotificationTransaction(
              myResult.msg
            );
          }
        }
      }
    );
  }

  async updateState() {
    console.log(this.stateInstances)
    for (const stateCompo of this.stateInstances) {
      const method = stateCompo.abi_input.name as string;
      console.log(method)
      const result = await this.dappInjectorService.runfunction({
        method,
        contractKey: 'myContract',
        args: [],
      });

      console.log(result.payload);
      // const outputArray = result.payload.map( (map:any)=> map.toString())

      if (result.msg.success == true) {
        stateCompo.refreshUi(result.payload);
      } else {
        this.notifierService.showNotificationTransaction(result.msg);
      }
    }
  }

  async refreshContractBalance() {
    const balance = await this.dappInjectorService.config.providers[
      'main'
    ].getBalance(this.contractHeader.address);
    const ehterbalance = convertWeiToEther(balance);
    const dollar =
      ehterbalance * (await this.dappInjectorService.getDollarEther());
    this.contractBalance = {
      ether: displayEther(ehterbalance),
      usd: displayUsd(dollar),
    };
  }
  async onChainStuff() {
    try {
      this.deployer_address = await (
        await this.dappInjectorService.config.defaultProvider!.getSigner()
      ).getAddress();

      this.dappInjectorService.config.defaultProvider!.on(
        'block',
        async (log: any, event: any) => {
          this.refreshContractBalance();

          const block = await this.dappInjectorService.config.providers[
            'main'
          ].getBlockWithTransactions(log);
          this.blocks = [block].concat(this.blocks);
        }
      );

      this.contractHeader = {
        name: this.debugContract.name,
        address: this.debugContract.address,
        abi:this.debugContract.abi,
        network: netWorkByName('localhost')
      };

      this.eventsAbiArray = this.contract_abi.filter(
        (fil) => fil.type == 'event'
      );

      this.eventsAbiArray.forEach((val) => {
        this.debugContract.contract.on(val.name, (args) => {
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

      this.contract_abi
        .filter((fil) => fil.type !== 'constructor')
        .filter((fil) => fil.type !== 'event')
        .filter((fil) => fil.type !== 'receive')
        .forEach((abi) => {
          this.add(abi);
        });

      this.updateState();
    } catch (error) {
      console.log(error);
      this.loading_contract = 'error';
    }
  }

  async addBlock(blockNr: number) {
    const block = await this.dappInjectorService.config.providers[
      'main'
    ].getBlockWithTransactions(blockNr);
    this.blocks = this.blocks.concat(block);
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
    const transaction_result = await this.dappInjectorService.doTransaction(
      tx,
      true
    );
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

      const transaction_result = await this.dappInjectorService.doTransaction(
        tx
      );
      this.blockchain_is_busy = false;
      await this.notifierService.showNotificationTransaction(
        transaction_result
      );
    } else {
      this.blockchain_is_busy = false;
    }
  }

  ngAfterViewInit(): void {
    this.store.pipe(web3Selectors.selectChainReady).subscribe(async (value) => {
      console.log(value);
      this.debugContract = this.dappInjectorService.config.defaultContract!;
      this.contract_abi = this.debugContract.abi;
      console.log(this.contract_abi);
      this.signer = this.dappInjectorService.config.signer as Signer;
      this.onChainStuff();
    });

    this.store
      .select(web3Selectors.isNetworkBusy)
      .subscribe((isBusy: boolean) => {
        console.log(isBusy);
        this.blockchain_is_busy = isBusy;
      });
  }
}
