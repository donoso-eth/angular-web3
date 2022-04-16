import { OnInit, OnDestroy, ElementRef, AfterViewInit, Injectable, Directive } from '@angular/core';
import { JsonRpcProvider } from '@ethersproject/providers';
import { Store } from '@ngrx/store';
import { Signer } from 'ethers';
import { pipe, Subject, takeUntil } from 'rxjs';
import { IDEFAULT_CONTRACT } from 'src/assets/contracts/interfaces';
import { DappInjector } from '../dapp-injector.service.ts';
import { NETWORK_STATUS, web3Selectors } from '../store';
import { AngularContract } from './contract';

@Directive()
export class DappBaseComponent implements OnDestroy, AfterViewInit {
  public destroyHooks: Subject<void> = new Subject();

  ////// Public Available
  blockchain_is_busy: boolean = true;
  blockchain_status: NETWORK_STATUS = 'loading';

  defaultContract!: AngularContract<IDEFAULT_CONTRACT>;

  defaultProvider!: JsonRpcProvider;

  signer!: Signer;
  signerAdress!: string;

  constructor(public dapp: DappInjector, public store: Store) {}

  async hookChainIsLoading() {}

  async hookFailedtoConnectNetwork() {}

  async hookWalletNotConnected() {}

  async hookContractConnected() {}

  async hookReadyContractReady() {}

  async hookForceDisconnect() {}


  ngAfterViewInit(): void {
    //////////   CHAIN STATUS //////////////////
    this.store
      .select(web3Selectors.chainStatus)
      .pipe(takeUntil(this.destroyHooks))
      .subscribe(async (value) => {
        this.blockchain_status = value;
        console.log(value);
      });

    //////  CHAIN START LOADING
    this.store
      .pipe(web3Selectors.hookChanIsLoading)
      .pipe(takeUntil(this.destroyHooks))
      .subscribe(() => {
        this.hookChainIsLoading();
      });

    //////  FAIL TO CONNECT NETWORK
    this.store
      .pipe(web3Selectors.hookFailToconnect)
      .pipe(takeUntil(this.destroyHooks))
      .subscribe(() => {
        this.hookFailedtoConnectNetwork();
      });

    //////  WALLET IS CONNECTED TO CONTRACT
    this.store
      .pipe(web3Selectors.hookContractConnected)
      .pipe(takeUntil(this.destroyHooks))
      .subscribe(() => {
        this.defaultContract = this.dapp.defaultContract!;
        this.signer = this.dapp.signer as Signer;
        this.defaultProvider = this.dapp.provider as JsonRpcProvider;
        this.signerAdress = this.dapp.signerAddress as string;
        this.hookContractConnected();
      });

    //////   READ CONTRACT IS READY
    this.store
      .pipe(web3Selectors.hookReadContractConnected)
      .pipe(takeUntil(this.destroyHooks))
      .subscribe(() => {
        this.hookReadyContractReady();
      });

    //////  Force Disconnect
    this.store
      .pipe(web3Selectors.hookForceDisconnect)
      .pipe(takeUntil(this.destroyHooks))
      .subscribe(() => {
        this.hookForceDisconnect;
      });

    //////////  APP IS BUSY   ///////////////////
    this.store
      .select(web3Selectors.isNetworkBusy)
      .pipe(takeUntil(this.destroyHooks))
      .subscribe((isBusy: boolean) => {
        this.blockchain_is_busy = isBusy;
      });
  }

  ngOnDestroy(): void {
    this.destroyHooks.next();
    this.destroyHooks.complete();
  }
}
