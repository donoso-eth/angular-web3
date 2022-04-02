import { OnInit, OnDestroy, ElementRef, AfterViewInit, Injectable, Directive } from '@angular/core';
import { JsonRpcProvider } from '@ethersproject/providers';
import { Store } from '@ngrx/store';
import { AngularContract } from 'angular-web3';
import { Signer } from 'ethers';
import { pipe, Subject, takeUntil } from 'rxjs';
import { DappInjectorService } from '../dapp-injector.service';
import { NETWORK_STATUS, web3Selectors } from '../store';

@Directive()
export class DappBaseComponent implements OnDestroy, AfterViewInit {
  private destroyHooks: Subject<void> = new Subject();

  ////// Public Available
  blockchain_is_busy: boolean = true;
  blockchain_status: NETWORK_STATUS = 'loading';

  defaultContract!: AngularContract;

  defaultProvider!: JsonRpcProvider;

  signer!: Signer;
  signerAdress!: string;

  constructor(public dapp: DappInjectorService, public store: Store) {}

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
        this.defaultContract = this.dapp.defaultContract as AngularContract;
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
function chainStatus(chainStatus: any) {
  throw new Error('Function not implemented.');
}
