import { Injectable } from '@angular/core';
import { BigNumber, providers } from 'ethers';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NetworkProviderService {
  private _provider: providers.JsonRpcProvider;

  private _signer: providers.JsonRpcSigner;

  public blockEventSubscription: ReplaySubject<any> = new ReplaySubject(1);

  constructor(public url_array: Array<string>) {}

  async init() {
    if(this.url_array.length == 0){
      this._provider = new providers.JsonRpcProvider()
    } else {
    const p_race = await Promise.race(
      this.url_array.map((map) => new providers.JsonRpcProvider(map))
    );
    this._provider = await p_race;
    }
   
    this._signer = this._provider.getSigner();
    return this._provider;
  }

  get Provider() {
    if (this._provider == undefined) {
      throw new Error('Provider not yet initialyzed');
    }
    return this._provider;
  }

  get Signer() {
    if (this._signer == undefined) {
      throw new Error('Provider not yet initialized');
    }
    return this._signer;
  }

  
  async doTransaction(tx) {
 
    let notification_message = {
      type: "transaction",
      txhash: "",
      bknr: 0,
      from: "",
      gas: "",
      to: "",
      value: "",
      class: [],
      message: "",
    };
    try {

       let tx_obj = await this._signer.sendTransaction(tx);
       let tx_result = await tx_obj.wait();

      const result = tx_result;
      notification_message.txhash = result.transactionHash;
      notification_message.from = result.from;
      notification_message.to = result.to;
      notification_message.gas = result.gasUsed.toString();
      notification_message.bknr = result.blockNumber;

      tx_obj.value == undefined
        ? (notification_message.value = "0")
        : (notification_message.value = tx_obj.value.toString());
      notification_message.class = ["green-snackbar"];
    } catch (e) {
      notification_message.type = "error";
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
      notification_message.class = ["red-snackbar"];
    
    }

    return notification_message
     }


  initBlockSubscription() {
    this._provider.on('block', async (log, event) => {
      this.blockEventSubscription.next(log);
    });
  }

  ngOnDestroy(): void {
    this.blockEventSubscription.complete();
  }
}
