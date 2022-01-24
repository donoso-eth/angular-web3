import { Injectable, OnDestroy, Inject } from '@angular/core';
import {  providers, Wallet, Contract } from 'ethers';
import { ReplaySubject } from 'rxjs';
import { ICONTRACT, ITRANSACTION_DETAILS, ITRANSACTION_RESULT } from '../models/models';

@Injectable()
export  class AngularContract implements OnDestroy {
  private _contract!: Contract;
  private _provider!: providers.JsonRpcProvider;
  private _balance: any;

  public eventSubscriptionObject:{[key:string]: ReplaySubject<any>} = {};

  public contractBalanceSubscription: ReplaySubject<any>=
    new ReplaySubject(1);

  constructor(@Inject('metadata') public metadata: ICONTRACT) {}

  async init(provider:any, wallet:Wallet) {
    this._provider = provider;
    this._contract = await new Contract(
      this.metadata.address,
      this.metadata.abi,
      wallet
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

  async runTransactionFunction(functionName:string, args:any) {
 
    let notification_message:ITRANSACTION_RESULT = {
      success: false
    }

    let transaction_details:ITRANSACTION_DETAILS = {
      txhash: "",
      bknr: 0,
      from: "",
      gas: "",
      to: "",
      value: "",
    };

    try {
      const result_tx = await this._contract.functions[functionName].apply(this, args);
      const result = await result_tx.wait();
      transaction_details.txhash = result.transactionHash;
      transaction_details.from = result.from;
      transaction_details.to = result.to;
      transaction_details.gas = result.gasUsed;
      transaction_details.bknr = result.blockNumber;

      result_tx.value == undefined
        ? (transaction_details.value = '0')
        : (transaction_details.value = result_tx.value.toString());
        notification_message.success = true;
        notification_message.success_result = transaction_details;
   
    } catch (e:any) {
    
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
      notification_message.error_message = myMessage;
    }
  
    return   { msg:notification_message, payload:undefined};
  }

  async runContractFunction(functionName:string, args:any) {
    let notification_message:ITRANSACTION_RESULT = {
      success: false
    }

   
    try {
      const result = await this._contract.functions[functionName].apply(this, args);
      notification_message.success = true
       return   { msg:notification_message, payload:result};
    } catch (error:any) {
      notification_message.error_message = error.toString()
      return   { msg:notification_message};
    }
   
  }

 async  runFunction(functionName: string, args: any, state?: string) {
    if (state == undefined) {
      const myFunction_filter = this.Abi.filter(
        (fil:any) => fil.name == functionName
      );
      if (myFunction_filter.length !== 1) {
        throw new Error('Function not found');
      }
      state = myFunction_filter[0].stateMutability;
    }

    if (state == 'pure' || state == 'view') {
      return await this.runContractFunction(functionName, args);
    } else {
      return await this.runTransactionFunction(functionName, args);
    }

  }

  // #endregion XXXXXXX FUNCTIONS  XXXXXXXXXX

  ngOnDestroy(): void {
    this.contractBalanceSubscription.complete();
  }
}
