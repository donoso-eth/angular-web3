import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ConstantFlowAgreementV1 } from '@superfluid-finance/sdk-core';
import { DappBaseComponent, DappInjector } from 'angular-web3';
import { Contract, Signer, Wallet } from 'ethers';
import { ISTREAM_DISPLAY } from '../shared/models/models';

import { abi_ERC20 } from './ERC20_ABI';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.scss']
})
export class StreamComponent extends DappBaseComponent{

  deployerStream!:ISTREAM_DISPLAY;
  deployer!: Signer;

  DAIxcontract!:Contract;
  deployer_balance!: number;
  alice!: { user: any; user_address: any; };
  bob!: { user: any; user_address: any; };
  eve!: { user: any; user_address: any; };
  DAPP_STATE: any;

  constructor(
    dapp:DappInjector,
    store: Store
  ) {
    super(dapp,store);

  

   }

override async hookContractConnected(): Promise<void> {
this.deployer = this.dapp.signer!;
this.DAIxcontract = new Contract('0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f',abi_ERC20,this.deployer);
this.deployer_balance = await this.getDaiBalance(this.signerAdress);

console.log(this.deployer_balance)

this.alice = await this.createBurnerUser();
this.bob = await this.createBurnerUser();
this.eve = await this.createBurnerUser();



}

async createBurnerUser(){
  let wallet = Wallet.createRandom();
  const privateKey = wallet._signingKey().privateKey;
  const user = await wallet.connect(this.DAPP_STATE.defaultProvider);
  const user_address = await user.getAddress()
  return { user, user_address}

}





async getDaiBalance(account:string){

return +(await this.DAIxcontract.balanceOf(account)).toString()

}

getAllStreamsByAccount(sccount:string){



  
}


}
