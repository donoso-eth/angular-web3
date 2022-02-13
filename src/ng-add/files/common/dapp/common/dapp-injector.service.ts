import { Inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Contract, Signer, Wallet } from 'ethers';
import { providers } from 'ethers';
import { ISTARTUP_CONFIG, startUpConfig } from '../dapp-demos/1-hello-world-contract/blockchain_wiring';
import { uniswap_abi } from './helpers/uniswap_abi';
import { ICONTRACT, ITRANSACTION_DETAILS, ITRANSACTION_RESULT } from './models';
import { Web3Actions } from './store';

@Injectable({
  providedIn: 'root',
})
export class DappInjectorService {
  private _dollarExchange!: number;
;
  config!: ISTARTUP_CONFIG;
  constructor(
    @Inject('contractMetadata') public contractMetadata: ICONTRACT,
    private store: Store
  ) {
    this.initChain();
  }

  async createProvider(url_array: string[]) {
    let provider;
    if (url_array.length == 0) {
      provider = new providers.JsonRpcProvider();
    } else {
      const p_race = await Promise.race(
        url_array.map((map) => new providers.JsonRpcProvider(map))
      );
      provider = await p_race;
    }

    //this._signer = this._provider.getSigner();
    return provider;
  }

  async getDollarEther() {
    if (this._dollarExchange == undefined) {
      const uniswapUsdcAddress = '0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc';
      const uniswapAbi = uniswap_abi;

      const uniswapService = await this.createProvider([
        'https://eth-mainnet.gateway.pokt.network/v1/lb/611156b4a585a20035148406',
        `https://eth-mainnet.alchemyapi.io/v2/oKxs-03sij-U_N0iOlrSsZFr29-IqbuF`,
        'https://rpc.scaffoldeth.io:48544',
      ]);

   

      const getUniswapContract = async (address: string) =>
        await new Contract(address, uniswapAbi, uniswapService);
      const contract = await getUniswapContract(uniswapUsdcAddress);
      const reserves = await contract['getReserves']();

      this._dollarExchange =
        (Number(reserves._reserve0) / Number(reserves._reserve1)) * 1e12;
    }
    return this._dollarExchange;
  }


  async runfunction(payload:{contractKey:string, method:string, args:any})  {

    ///// Check if method is available within abi
    const abi_record_array = this.config.contracts[payload.contractKey].abi
    .filter(fil=> fil.name == payload.method)

    if (abi_record_array.length !== 1){
      throw new Error("Methid not found");
    }

    const methodAbi = abi_record_array[0]
    const stateMutability = methodAbi.stateMutability;

    try {

    switch (stateMutability) {
      case 'view' || 'pure':
        console.log('i am viewing')
        const resultFunction = await  this.config.contracts[payload.contractKey]
        .contract[payload.method].apply(this,payload.args)
         return resultFunction
    
      default:
        console.log('i am gasing')
        const result_tx = await this.config.contracts[payload.contractKey]
        .contract[payload.method].apply(this, payload.args);
        const resultTransaction = await result_tx.wait();
        return resultTransaction
  
    }

      
  } catch (error:any) {
    console.log(typeof(error))
    Object.keys(error['error']).forEach(key=> 
      console.log(`${key}:${error[key]}`))
    
      console.log(JSON.parse(error['error']['body']))
  }


  
  }

  async doTransaction(tx:any,faucet?:boolean) {
 
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
       if (faucet == true) {
        const localSigner = await this.config.providers['main'].getSigner()
        tx_obj = await localSigner.sendTransaction(tx);
       } else {
       tx_obj = await this.config.signer!.sendTransaction(tx);
       }


       let tx_result = await tx_obj.wait();
       const balance:any =await  this.config.signer?.getBalance()
       this.store.dispatch(Web3Actions.updateWalletBalance({walletBalance:balance}))


      const result = tx_result;
      transaction_details.txhash = result.transactionHash;
      transaction_details.from = result.from;
      transaction_details.to = result.to;
      transaction_details.gas = result.gasUsed.toString();
      transaction_details.bknr = result.blockNumber;
     
      tx_obj.value == undefined
        ? (transaction_details.value = "0")
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



  async dispatchInit(dispatchObject:{signer:Signer, provider:any}) {
    this.config.signer = dispatchObject.signer;
    this.config.providers['main'] = dispatchObject.provider;
    const contract = await new Contract(
      this.contractMetadata.address,
      this.contractMetadata.abi,
      this.config.signer
    );

    this.config.contracts['myContract'] = {
      contract,
      name: 'mycontract',
      address: this.contractMetadata.address,
      abi: this.contractMetadata.abi,
    };

    await this.getDollarEther()
    this.store.dispatch(Web3Actions.setDollarExhange({exchange:this._dollarExchange}))


   this.store.dispatch(Web3Actions.chainLoad({ status: false }));
   this.store.dispatch(Web3Actions.chainBusy({ status: false }));

 

  }


  async initChain() {
    this.config = startUpConfig;

    if (this.config.wallet == 'metamask') {
      console.log('Check if 🦊 injected provider');
      let ethereum = (window as any).ethereum;
      if (!!(window as any).ethereum) {
        const metamaskProvider = new providers.Web3Provider(ethereum, 'any');

        const addresses = await  metamaskProvider.listAccounts();
        console.log(addresses);
        if (addresses.length > 0) {
          const providerNetwork =  metamaskProvider && (await  metamaskProvider.getNetwork());
          const metamaskSigner = await  metamaskProvider.getSigner();
        
          this.dispatchInit({signer:metamaskSigner, provider: metamaskProvider})

        } else {
        }
      } else {
      }
    } else {

      const hardhatProvider = await  this.createProvider([])

      let wallet: Wallet;
      
      switch (this.config.wallet) {
        case 'burner':

          const currentPrivateKey = window.localStorage.getItem('metaPrivateKey');
          if (currentPrivateKey) {
            wallet = new Wallet(currentPrivateKey);
          } else {
            wallet = Wallet.createRandom();
            const privateKey = wallet._signingKey().privateKey;
            window.localStorage.setItem('metaPrivateKey', privateKey);
          }
          break;
      
        default:
          let privKey = '' //environment.privKey
          wallet = new Wallet(privKey);
          break;
      }

      ////// local wallet
      const hardhatSigner = await wallet.connect(hardhatProvider);
      this.dispatchInit({signer:hardhatSigner, provider: hardhatProvider})
    
    }

  }
}
