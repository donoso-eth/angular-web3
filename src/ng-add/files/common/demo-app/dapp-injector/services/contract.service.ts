import { Injectable, OnDestroy } from '@angular/core';
import { BigNumber, Contract, providers } from 'ethers';
import { ReplaySubject } from 'rxjs';
import { ICONTRACT } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class ContractService implements OnDestroy {
  private _contract: Contract;
  private _provider: providers.JsonRpcProvider;
  private _balance: any;

  public eventSubscriptionObject:{[key:string]: ReplaySubject<any>} = {};

  public contractBalanceSubscription: ReplaySubject<any>=
    new ReplaySubject(1);

  constructor(public metadata: ICONTRACT) {}

  async init(provider: any) {
    this._provider = provider;
    this._contract = await new Contract(
      this.metadata.address,
      this.metadata.abi,
      provider
    );
    return this._contract;
  }

  get Abi() {
    return this.metadata.abi;
  }

  get Adress() {
    return this.metadata.address;
  }

  get Contract() {
    if (this._contract == undefined) {
      throw new Error('Contract not yet initialized');
    }
    return this._contract;
  }

  async refreshBalance() {
    this._balance = await this._provider.getBalance(this.Adress);
    this.contractBalanceSubscription.next(this._balance);
    return this._balance;
  }

  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  // #region XXXXXXXXXXXX FUNCTIONS AND TRANSACTIONS XXXXXXXXXX
  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

  async runTransactionFunction(functionName, args) {
    let notification_message = {
      type: 'transaction',
      txhash: '',
      bknr: '',
      from: '',
      gas: 0,
      to: '',
      value: '',
      class: [],
      message: '',
    };

    try {
      const result_tx = await this._contract.functions[functionName].apply(this, args);
      const result = await result_tx.wait();
      notification_message.txhash = result.transactionHash;
      notification_message.from = result.from;
      notification_message.to = result.to;
      notification_message.gas = result.gasUsed;
      notification_message.bknr = result.blockNumber;

      result_tx.value == undefined
        ? (notification_message.value = '0')
        : (notification_message.value = result_tx.value.toString());
      notification_message.class = ['green-snackbar'];
    } catch (e) {
      notification_message.type = 'error';
      // console.log(e);
      // Accounts for Metamask and default signer on all networks
      let myMessage =
        e.data && e.data.message
          ? e.data.message
          : e.error && JSON.parse(JSON.stringify(e.error)).body
          ? JSON.parse(JSON.parse(JSON.stringify(e.error)).body).error.message
          : e.data
          ? e.data
          : JSON.stringify(e);
      if (!e.error && e.message) {
        myMessage = e.message;
      }

      try {
        let obj = JSON.parse(myMessage);
        if (obj && obj.body) {
          let errorObj = JSON.parse(obj.body);
          if (errorObj && errorObj.error && errorObj.error.message) {
            myMessage = errorObj.error.message;
          }
        }
      } catch (e) {
        //ignore
      }
      notification_message.message = myMessage;
      notification_message.class = ['red-snackbar'];
    }
    return notification_message;
  }

  async runContractFunction(functionName, args) {
    const result = await this._contract.functions[functionName].apply(this, args);
    return result;
  }

 async  runFunction(functionName: string, args: any, state?: string) {
    if (state == undefined) {
      const myFunction_filter = this.Abi.filter(
        (fil) => fil.name == functionName
      );
      if (myFunction_filter.length !== 1) {
        throw new Error('Function not found');
      }
      state = myFunction_filter[0].stateMutability;
    }

    if (state == 'pure' || state == 'view') {
      return await this.runContractFunction(functionName, args);
    } else {
      await this.runTransactionFunction(functionName, args);
    }

  }

  // #endregion XXXXXXX FUNCTIONS  XXXXXXXXXX

  ngOnDestroy(): void {
    this.contractBalanceSubscription.complete();
  }
}
