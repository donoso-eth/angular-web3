import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';


import { ContractInputComponent } from '../contract-input/contract-input.component';

import { ContractFactory, ethers } from 'ethers';


import { BlockWithTransactions, IABI_OBJECT, IBALANCE, ICONTRACT, IINPUT_EVENT } from  '../../../models';
import { NotifierService } from '../../notifier/notifier.service';
import { DialogService } from '../../dialog/dialog.service';
import { AngularContract } from 'src/app/dapp-injector/classes/contract';


@Component({
  selector: 'debug-component',
  templateUrl: './debug.component.html',
  styleUrls: ['./debug.component.css'],
})
export class DebugComponent implements AfterViewInit {
  blocks: Array<BlockWithTransactions> = [];
  contract_abi!: Array<IABI_OBJECT>;
  walletBalance!: IBALANCE;
  contractBalance!: IBALANCE;
  contractHeader!: ICONTRACT;
  deployer_address!:string;

  greeting!: string;
  greeting_input!: string;
  provider!: ethers.providers.JsonRpcProvider;
  signer: any;
  deployer_balance: any;
  loading_contract: 'loading' | 'found' | 'error' = 'loading';
  componentInstances: Array<ContractInputComponent> = [];
  stateInstances: Array<ContractInputComponent> = [];
  events:Array<any> = [];
  eventsAbiArray:Array<any> = [];

  blockchain_is_busy = true;

  newWallet!: ethers.Wallet;

  dollarExchange!: number;
  balanceDollar!: number;
  constructor(
    private cd:ChangeDetectorRef,
    private dialogService: DialogService,
    private notifierService: NotifierService,

    private componentFactoryResolver: ComponentFactoryResolver
  ) {

 
  }
  @Input() public debugContract!: AngularContract;

  @ViewChild('inputContainer', { read: ViewContainerRef })
  inputContainer!: ViewContainerRef;

  @ViewChild('stateContainer', { read: ViewContainerRef })
  stateContainer!: ViewContainerRef;

  @ViewChild('payableContainer', { read: ViewContainerRef })
  payableContainer!: ViewContainerRef;

  add(abi: IABI_OBJECT): void {
    this.cd.detectChanges()
    // create the compoxnent factory
    const dynamicComponentFactory =
      this.componentFactoryResolver.resolveComponentFactory(
        ContractInputComponent
      );

    let componentRef:any;
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
        const myResult = await this.debugContract.runFunction(
          value.function,
          value.args,
          value.state
        );
   
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
            componentRef.instance.refreshUi(myResult.payload);
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
    for (const stateCompo of this.stateInstances) {
      const result =
        await this.debugContract.runContractFunction(
          stateCompo.abi_input.name as string,
          {}
        );

      if (result.msg.success == true) {
        stateCompo.refreshUi(result.payload);
      } else {
        this.notifierService.showNotificationTransaction(result.msg);
      }
    }
  }

  async onChainStuff() {
    try {
   

      console.log(this.contract_abi)



      this.eventsAbiArray = this.contract_abi.filter(
        (fil:any) => fil.type == 'event'
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
        .filter((fil:any) => fil.type !== 'constructor')
        .filter((fil:any) => fil.type !== 'event')
        .filter((fil:any) => fil.type !== 'receive')
        .forEach((abi:any) => {
          this.add(abi);
        });

      this.updateState();
    } catch (error) {
      console.log(error)
      this.loading_contract = 'error';
    }
  }

ngOnchanges(): void {
  this.contract_abi = this.debugContract.abi 
  console.log(this.contract_abi);
}


  ngAfterViewInit(): void {
    this.contract_abi = this.debugContract.abi 
    this.onChainStuff();
  }
}
