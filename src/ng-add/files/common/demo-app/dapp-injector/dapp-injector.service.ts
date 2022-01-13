import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { Subject } from 'rxjs';

import { NotifierService } from './components/notifier/notifier.service';
import { uniswap_abi } from './shared/data/uniswap_abi';
import { BlockWithTransactions, IBALANCE } from './shared/models';

@Injectable({
  providedIn: 'root',
})
export class DappInjectorService {
  private _provider: ethers.providers.JsonRpcProvider;
  private _myWallet: ethers.Wallet;
  private _myContract: ethers.Contract;
  private _metaContract:{address: string, abi:any, name:string}
  private _dollarExchange: number;
  private _signer: ethers.providers.JsonRpcSigner;

  public walletBalance = new Subject<IBALANCE>();
  public contractBalance = new Subject<IBALANCE>();

  public blocks = new Subject<Array<BlockWithTransactions>>();
  private _blocks: Array<BlockWithTransactions> = [];


  public blockchain_busy = new Subject<boolean>()

  constructor(
    private notifierService:NotifierService
  ) {

  }

  async getProvider() {
    if (this._provider == undefined) {
      this._provider = await new ethers.providers.JsonRpcProvider();
    }
    return this._provider;
  }

  async getSigner() {
    if ((this, this._signer == undefined)) {
      this._signer = this._provider.getSigner();
    }
    return this._signer;
  }

  async getMyWallet() {
    if (this._myWallet == undefined) {
      let wallet: ethers.Wallet;
      const currentPrivateKey = window.localStorage.getItem('metaPrivateKey');
      if (currentPrivateKey) {
        wallet = new ethers.Wallet(currentPrivateKey);
      } else {
        wallet = ethers.Wallet.createRandom();
        const privateKey = wallet._signingKey().privateKey;
        window.localStorage.setItem('metaPrivateKey', privateKey);
      }
      this._myWallet = await wallet.connect(this._provider);
    }
    return this._myWallet;
  }

  private async refreshWalletBalance() {
    if (this._dollarExchange == undefined) {
      await this.getDollarEther();
    }

    const weiBalance = await this._myWallet.getBalance();
    const etherBalance = this.convertWeiToEther(weiBalance);
    const usdBalance = this.convertEthertoUSD(etherBalance);

    const local_balance: IBALANCE = {
      ether: etherBalance.toString().substring(0, 6),
      usd: usdBalance.toFixed(2),
    };

    this.walletBalance.next(local_balance)

  }

  async getWalletBalance() {
    const wallet = this._myWallet;
    return await wallet.getBalance();
  }


  set metaContract(meta){
    this._metaContract = meta
  }

  async getContract() {
    // Contract Address (created while deploying)
    if (this._myContract == undefined) {
      // Contract instance passing the address, the abi(contract interface) and the signer
      this._myContract = new ethers.Contract(
        this._metaContract.address,
        this._metaContract.abi,
        this._myWallet
      );
    }
    return this._myContract;
  }

  private async refreshContractBalance() {
    if (this._dollarExchange == undefined) {
      await this.getDollarEther();
    }

    let weiBalance = await this._provider.getBalance(this._myContract.address);
    
    // if (weiBalance == undefined){
    //   weiBalance = 0
    // }
    const etherBalance = this.convertWeiToEther(weiBalance);
    const usdBalance = this.convertEthertoUSD(etherBalance);

    const local_balance: IBALANCE = {
      ether: etherBalance.toString().substring(0, 6),
      usd: usdBalance.toFixed(2),
    };

    this.contractBalance.next(local_balance)

  }

  async getContractBalance() {
    const contract = this._myContract;
    return await contract.getBalance();
  }

  async runTransactionFunction(contractFunction: (args) => any, args) {
    this.blockchain_busy.next(true)
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
      const result_tx = await contractFunction.apply(this, args);
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
      this.blockchain_busy.next(false)
    }
    this.notifierService.showNotification(notification_message)
  }

  async runContractFunction(contractFunction: (args) => any, args) {
    const result = await contractFunction.apply(this, args);
    return result;
  }

  async dispatchContractFunction(contractFunction: (args) => any, args, state) {
    if (state == 'pure' || state == 'view') {
      return await this.runContractFunction(contractFunction, args);
    } else {
      await this.runTransactionFunction(contractFunction, args);
    }
  }

  async doTransaction(tx, who) {

    this.blockchain_busy.next(true)
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
      if (who == 'signer') {
        tx_obj = await this._signer.sendTransaction(tx);
        tx_result = await tx_obj.wait();
        
      } else {
        tx_obj = await this._myWallet.sendTransaction(tx);
        tx_result = await tx_obj.wait();
      }
      const result = tx_result
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
      this.blockchain_busy.next(false)
    }
 
    this.notifierService.showNotification(notification_message)
  }

  get dollarExchange() {
    return this._dollarExchange;
  }

  async getDollarEther() {
    const p = await Promise.race(
      [
        'https://eth-mainnet.gateway.pokt.network/v1/lb/611156b4a585a20035148406',
        `https://eth-mainnet.alchemyapi.io/v2/oKxs-03sij-U_N0iOlrSsZFr29-IqbuF`,
        'https://rpc.scaffoldeth.io:48544',
      ].map((map) => new ethers.providers.JsonRpcProvider(map))
    );
    const main_provider = await p;

    const uniswapUsdcAddress = '0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc';
    const uniswapAbi = uniswap_abi;

    const getUniswapContract = async (address) =>
      await new ethers.Contract(address, uniswapAbi, main_provider);

    const contract = await getUniswapContract(uniswapUsdcAddress);
    const reserves = await contract.getReserves();

    this._dollarExchange =
      (Number(reserves._reserve0) / Number(reserves._reserve1)) * 1e12;
  }

  convertEtherToWei(ether_value) {
    return (ether_value * 10 ** 18).toFixed(0);
  }

  convertWeiToEther(wei_value) {
    return wei_value / 10 ** 18;
  }

  convertUSDtoEther(usd_value) {
    return usd_value / this._dollarExchange;
  }

  convertEthertoUSD(ether_value) {
    return ether_value * this._dollarExchange;
  }


async getOneMoreBlock(blockNumer) {
  const block = await this._provider.getBlockWithTransactions(blockNumer)
  this._blocks.push(block)
  this.blocks.next(this._blocks)
}


  async initDapp() {
    await this.getProvider();
    await this.getSigner();
    await this.getMyWallet();
    await this.getContract();
    await this.getDollarEther();
    


  this._provider.on("block", async (log, event) => {
    this.refreshWalletBalance()
    this.refreshContractBalance()
    const block = await this._provider.getBlockWithTransactions(log)
    this._blocks.unshift(block)
 
    this.blocks.next(this._blocks)
    this.blockchain_busy.next(false)
 
})


  }
}
