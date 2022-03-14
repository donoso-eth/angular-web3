export interface Web3State {
    chainStatus: NETWORK_STATUS;
    isNetworkBusy:boolean;
    signerNetwork:string;
    walletBalance:number;
    etherToDollar:number;

    
  }

  export type NETWORK_STATUS = 'loading' | 'fail' | 'wallet-not-connected' | 'ethereum-not-connected' | 'success' | 'disconnected';