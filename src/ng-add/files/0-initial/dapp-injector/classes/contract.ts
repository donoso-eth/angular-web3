import { Injectable, OnDestroy, Inject } from '@angular/core';
import { JsonRpcProvider, Web3Provider } from '@ethersproject/providers';
import { providers, Wallet, Contract, Signer, CallOverrides, ContractTransaction, PayableOverrides } from 'ethers';
import { ReplaySubject } from 'rxjs';
import { INETWORK, netWorkById, NETWORK_TYPE, noNetwork } from '../constants/constants';
import {
  ICONTRACT_METADATA,
  ITRANSACTION_DETAILS,
  ITRANSACTION_RESULT,
} from '../models/models';




@Injectable()
export class AngularContract<T extends Contract> implements OnDestroy {
  private _instance!: T
  private _provider!: providers.JsonRpcProvider;
  private _balance: any;
  private _network_deployed!: string;
  public eventSubscriptionObject: { [key: string]: ReplaySubject<any> } = {};

  public contractBalanceSubscription: ReplaySubject<any> = new ReplaySubject(1);

  constructor(
    @Inject('metadata')
    public contract_init: {
      metadata: ICONTRACT_METADATA;
      provider: JsonRpcProvider | Web3Provider;
      signer: Signer;
    }
  ) {
    this.init();
  }

  async init() {
    this._provider = this.contract_init.provider;
    this._network_deployed = this.contract_init.metadata.network;
    this._instance = (await new Contract(
      this.contract_init.metadata.address,
      this.contract_init.metadata.abi,
      this.contract_init.signer 
    )) as T;


    return this._instance;
  }

  get name() {
    return this.contract_init.metadata.name;
  }

  get abi() {
    return this.contract_init.metadata.abi;
  }

  get address() {
    return this.contract_init.metadata.address;
  }

  get network_deployed() {
    return this._network_deployed;
  }

  get instance() {
    if (this._instance == undefined) {
      throw new Error('Contract not yet initialized');
    }
    return this._instance;
  }

  async refreshBalance() {
    this._balance = await this._provider.getBalance(this.address);
    this.contractBalanceSubscription.next(this._balance);
   
    return this._balance;
  }



  ngOnDestroy(): void {
 
  }
}
