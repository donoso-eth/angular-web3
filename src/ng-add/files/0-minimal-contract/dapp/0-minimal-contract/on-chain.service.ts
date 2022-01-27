import { Inject, Injectable } from '@angular/core';

import { Contract} from 'ethers'
import { AngularNetworkProvider, AngularContract, AngularWallet, ICONTRACT } from 'angular-web3';



@Injectable({
  providedIn: 'root'
})
export class OnChainService {
  myProvider!: AngularNetworkProvider;
  newWallet!: AngularWallet;
  minimalContract!: AngularContract;

  constructor( @Inject('minimalContractMetadata') public minimalContractMetadata:ICONTRACT
  ) { }


  async reInjection(){
    
  }


  async init(){
    this.myProvider = new AngularNetworkProvider([]);
    await this.myProvider .init()
    await this.myProvider .initBlockSubscription()
    this.newWallet = new  AngularWallet()
    const mywallet =  await this.newWallet.init(this.myProvider.Provider)
    this.minimalContract =  new AngularContract(this.minimalContractMetadata)
    await this.minimalContract.init(this.myProvider.Provider,mywallet)

  }
}
