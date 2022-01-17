import { Injectable } from '@angular/core';
import { Wallet } from 'ethers';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  _myWallet: Wallet;
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

  async doTransaction(tx) {
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
      let tx_obj;
      let tx_result;
      tx_obj = await this._myWallet.sendTransaction(tx);
      tx_result = await tx_obj.wait();

      const result = tx_result;
      notification_message.txhash = result.transactionHash;
      notification_message.from = result.from;
      notification_message.to = result.to;
      notification_message.gas = result.gasUsed;
      notification_message.bknr = result.blockNumber;

      tx_result.value == undefined
        ? (notification_message.value = '0')
        : (notification_message.value = tx_result.value.toString());
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
    return notification_message
     }

  async init(provider) {
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
