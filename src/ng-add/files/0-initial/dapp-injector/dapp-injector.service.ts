import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { Contract, Signature, Signer, Wallet } from 'ethers';
import { providers } from 'ethers';
import { AngularContract } from './classes';

import { netWorkById, NETWORKS } from './constants/constants';
import { DappConfigService } from './dapp-injector.module';

import { ICONTRACT_METADATA, IDAPP_CONFIG, IDAPP_STATE,  ITRANSACTION_DETAILS, ITRANSACTION_RESULT } from './models';
import { Web3Actions, web3Selectors } from './store';

import { JsonRpcProvider, Web3Provider } from '@ethersproject/providers';
import { Web3ModalComponent } from './web3-modal/web3-modal.component';
import { Subject, takeUntil } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class DappInjectorService implements OnDestroy {
  
  private destroyHooks: Subject<void> = new Subject();

  ///// ---------  DAPP STATE INITIALIZATION
  DAPP_STATE:IDAPP_STATE = {
   
    defaultProvider: null,
    connectedNetwork: null,

    signer:null,
    signerAddress:null,

    defaultContract: null,
    viewContract:null,

  }

  ///// ---------  WEB3Modal for wallet conneciton
  private webModal!: Web3ModalComponent;



  constructor(
    @Inject(DappConfigService) private dappConfig: IDAPP_CONFIG,
    @Inject(DOCUMENT) private readonly document: any,
    @Inject('contractMetadata') public contractMetadata: ICONTRACT_METADATA,
    private store: Store
  ) {
    ///// ---------  Blockchain Bootstrap
    this.chainInitialization();
  }

  async createProvider(url_array: string[]) {
    let provider;
    if (url_array.length == 0) {
      provider = new providers.JsonRpcProvider();
    } else {
      const p_race = await Promise.race(url_array.map((map) => new providers.JsonRpcProvider(map)));
      provider = await p_race;
    }

    //this._signer = this._provider.getSigner();
    return provider;
  }

  async doTransaction(tx: any, signer?: any) {
    let notification_message: ITRANSACTION_RESULT = {
      success: false,
    };

    let transaction_details: ITRANSACTION_DETAILS = {
      txhash: '',
      bknr: 0,
      from: '',
      gas: '',
      to: '',
      value: '',
    };
    try {
      let tx_obj;

      if (!signer) {
        tx_obj = await this.DAPP_STATE.signer!.sendTransaction(tx);
      } else {
        tx_obj = await signer.sendTransaction(tx);
      }

      let tx_result = await tx_obj.wait();
      const balance: any = await this.DAPP_STATE.signer?.getBalance();
      this.store.dispatch(Web3Actions.updateWalletBalance({ walletBalance: balance }));

      const result = tx_result;
      transaction_details.txhash = result.transactionHash;
      transaction_details.from = result.from;
      transaction_details.to = result.to;
      transaction_details.gas = result.gasUsed.toString();
      transaction_details.bknr = result.blockNumber;

      tx_obj.value == undefined
        ? (transaction_details.value = '0')
        : (transaction_details.value = tx_obj.value.toString());
      notification_message.success = true;
      notification_message.success_result = transaction_details;
    } catch (e: any) {
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

    return notification_message;
  }

  async handleContractError(e: any) {
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

    return myMessage;
  }

  ///// ---- -----  Launching webmodal when chain is disconnected
  async launchWebModal() {
    if (this.dappConfig.wallet !== 'wallet') {
      this.chainInitialization();
    } else {
      await this.webModal.connectWallet();
    }
  }

  ///// ---------  Blockchain Bootstrap
 private async chainInitialization() {



    ///// ---------  Initializaing the default read provider, congif from startUpCOnfig, nerwork details from xxxx
    const { isdefaultProviderConnected, provider } = await this.providerInitialization();

    ///// ---------  Exit initialization if network is not available
    if (isdefaultProviderConnected == false) {
      return;
    }

    this.DAPP_STATE.defaultProvider = provider as JsonRpcProvider;

    /// todo launch read contract async not required to await

    ///// ---------  Signer Initialization in order to xxxxxx

    switch (this.dappConfig.wallet) {
      case 'wallet':
        const walletResult = await this.walletInitialization();
        if (walletResult == false) {
          return;
        }

        this.DAPP_STATE.signer = walletResult.signer;
        this.DAPP_STATE.defaultProvider = walletResult.provider;

        ///// create web-modal/hoos for connection/disconection .etcc.....
        this.webModal = new Web3ModalComponent({ document: this.document }, this.store);

        await this.webModal.loadWallets();
        this.webModal.onConnect.pipe(takeUntil(this.destroyHooks)).subscribe(async (walletConnectProvider) => {
          this.store.dispatch(Web3Actions.chainStatus({ status: 'fail-to-connect-network' }));
          this.store.dispatch(Web3Actions.chainBusy({ status: true }));

          const webModalProvider = new providers.Web3Provider(walletConnectProvider);
          const webModalSigner = await webModalProvider.getSigner();
          this.DAPP_STATE.signerAddress = await webModalSigner.getAddress()
          this.DAPP_STATE.defaultProvider = webModalProvider;
          this.DAPP_STATE.signer = webModalSigner;

          this.contractInitialization();
        });

        this.webModal.onDisConnect.pipe(takeUntil(this.destroyHooks)).subscribe(() => {
          console.log('i am disconnecting');
          this.store.dispatch(Web3Actions.chainStatus({ status: 'fail-to-connect-network' }));
          this.store.dispatch(Web3Actions.chainBusy({ status: false }));
        });

        ///// Disconnecting manually.....
        this.store.pipe(web3Selectors.hookForceDisconnect).pipe(takeUntil(this.destroyHooks)).subscribe(() => {
          console.log('i amdisconencting manually');
          this.store.dispatch(Web3Actions.chainStatus({ status: 'disconnected' }));
          this.store.dispatch(Web3Actions.chainBusy({ status: false }));
          this.DAPP_STATE.signer = null;
          this.DAPP_STATE.signerAddress = null;
          this.DAPP_STATE.defaultContract = null;
          this.DAPP_STATE.defaultProvider = null;
        });

        break;

      case 'burner':
        ////// local wallet
        let wallet: Wallet;
        const currentPrivateKey = window.localStorage.getItem('metaPrivateKey');
        if (currentPrivateKey) {
          wallet = new Wallet(currentPrivateKey);
        } else {
          wallet = Wallet.createRandom();
          const privateKey = wallet._signingKey().privateKey;
          window.localStorage.setItem('metaPrivateKey', privateKey);
        }

        this.DAPP_STATE.signer = await wallet.connect(this.DAPP_STATE.defaultProvider);
        this.DAPP_STATE.signerAddress = await this.DAPP_STATE.signer.getAddress()
        this.contractInitialization();
        break;

      case 'privKey':
        let privateWallet: Wallet;
        let privKey = ''; //environment.privKey
        privateWallet = new Wallet(privKey);
        this.DAPP_STATE.signer = await privateWallet.connect(this.DAPP_STATE.defaultProvider);
        this.DAPP_STATE.signerAddress = await this.DAPP_STATE.signer.getAddress()
        this.contractInitialization();
        break;
    }
  }

  ///// ---------  Provider Initialization
 private  async providerInitialization(): Promise<{
    isdefaultProviderConnected: boolean;
    provider?: JsonRpcProvider;
  }> {
    const hardhatProvider = await this.createProvider([NETWORKS[this.dappConfig.defaultNetwork].rpcUrl]);

    try {
      const network = await hardhatProvider.getNetwork();
      console.log('I am connected to ' + network);
    } catch (error) {
      this.store.dispatch(Web3Actions.chainStatus({ status: 'fail-to-connect-network' }));
      this.store.dispatch(Web3Actions.chainBusy({ status: false }));
      return { isdefaultProviderConnected: false };
    }
    return { isdefaultProviderConnected: true, provider: hardhatProvider };
  }

  ///// ---------  Signer Initialization
 private  async walletInitialization() {
    //// Wallet Configuration

    //// Check if metamask/wallet already available
    console.log('Check if 🦊 injected provider');
    let ethereum = (window as any).ethereum;

    /////  check if Metamast is present in the browwser
    if (!!(window as any).ethereum) {
      const metamaskProvider = new providers.Web3Provider(ethereum, 'any');

      const addresses = await metamaskProvider.listAccounts();

      if (addresses.length > 0) {
        const providerNetwork = metamaskProvider && (await metamaskProvider.getNetwork());
        const metamaskSigner = await metamaskProvider.getSigner();
        this.DAPP_STATE.signerAddress = await metamaskSigner.getAddress()
        return {
          signer: metamaskSigner,
          provider: metamaskProvider,
        };
      } else {
        this.store.dispatch(Web3Actions.chainStatus({ status: 'wallet-not-connected' }));

        this.store.dispatch(Web3Actions.chainBusy({ status: false }));
        return false;
      }
    } else {
      /////  NO metamask
      this.store.dispatch(Web3Actions.chainStatus({ status: 'wallet-not-connected' }));

      this.store.dispatch(Web3Actions.chainBusy({ status: false }));
      return false;
    }
  }

  ///// ---------  Contract Initialization
  private async contractInitialization() {
    const contract = new AngularContract({
      metadata: this.contractMetadata,
      provider: this.DAPP_STATE.defaultProvider!,
      signer: this.DAPP_STATE.signer!,
    });

    this.DAPP_STATE.defaultContract = contract;

    const providerNetwork = await this.DAPP_STATE.defaultProvider!.getNetwork();

    const networkString = netWorkById(providerNetwork.chainId)?.name as string;
    console.log(networkString);
    this.DAPP_STATE.connectedNetwork = networkString;
    this.store.dispatch(Web3Actions.setSignerNetwork({ network: networkString }));

    this.store.dispatch(Web3Actions.chainStatus({ status: 'wallet-connected' }));
    this.store.dispatch(Web3Actions.chainBusy({ status: false }));
  }

  /////// VIEW FUCNTIOSN

  get signer() {
    return this.DAPP_STATE.signer
  }

  get signerAddress() {
    return this.DAPP_STATE.signerAddress
  }

  get provider() {
    return this.DAPP_STATE.defaultProvider
  }


  get connectedNetwork() {
    return this.DAPP_STATE.connectedNetwork
  }

  get defaultContract() {
    return this.DAPP_STATE.defaultContract
  }

    
  ngOnDestroy(): void {
    this.destroyHooks.next();
    this.destroyHooks.complete();
  }


}
