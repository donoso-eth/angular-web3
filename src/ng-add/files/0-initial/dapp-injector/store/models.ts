export interface Web3State {
    chainStatus: NETWORK_STATUS;
    isNetworkBusy:boolean;
    readContactReady:boolean
    signerNetwork:string;

    //
    walletBalance:number;
    etherToDollar:number;

    
  }

  export type NETWORK_STATUS = 'loading' | 'fail-to-connect-network' | 'wallet-not-connected' | 'wallet-connected' | 'disconnected';