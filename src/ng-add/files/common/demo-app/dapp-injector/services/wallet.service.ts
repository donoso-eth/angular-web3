import { Injectable } from '@angular/core';
import { JsonRpcProvider } from '@ethersproject/providers';
import { Wallet } from 'ethers';
import { ReplaySubject } from 'rxjs';
import { ITRANSACTION_DETAILS, ITRANSACTION_RESULT } from '../models';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  _myWallet!: Wallet;
  public walletBalanceSubscription: ReplaySubject<any> = new ReplaySubject(1);
  constructor() {}

  get wallet() {
    if (this._myWallet == undefined) {
      throw new Error('Wallwt not yet initialized');
    }
    return this._myWallet;
  }
  async refreshWalletBalance() {
    const weiBalance = await this._myWallet.getBalance();
    this.walletBalanceSubscription.next(weiBalance);
  }

  async doTransaction(tx:any) {
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
      let tx_obj;
      let tx_result;
      tx_obj = await this._myWallet.sendTransaction(tx);
      tx_result = await tx_obj.wait();

      const result = tx_result;
      transaction_details.txhash = result.transactionHash;
      transaction_details.from = result.from;
      transaction_details.to = result.to;
      transaction_details.gas = (result.gasUsed).toString();
      transaction_details.bknr = result.blockNumber;

      tx_obj.value == undefined
        ? (transaction_details.value = '0')
        : (transaction_details.value = tx_obj.value.toString());
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
    return notification_message
     }

  async init(provider:JsonRpcProvider) {
    if (this._myWallet == undefined) {
      let wallet: Wallet;
      const currentPrivateKey = window.localStorage.getItem('metaPrivateKey');
      if (currentPrivateKey) {
        wallet = new Wallet(currentPrivateKey);
      } else {
        wallet = Wallet.createRandom();
        const privateKey = wallet._signingKey().privateKey;
        window.localStorage.setItem('metaPrivateKey', privateKey);
      }
      this._myWallet = await wallet.connect(provider);
    }
    return this._myWallet;
  }
}
