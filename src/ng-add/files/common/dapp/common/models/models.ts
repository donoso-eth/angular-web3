import { Contract, ethers } from "ethers";

export interface IABI_OBJECT {
  inputs: Array<{ internalType: string; name: string; type: string }>;
  outputs: Array<{ internalType: string; name: string; type: string }>;
  stateMutability: 'view' | 'nonpayable' | 'payable' | 'pure' ;
  type: 'function' | 'constructor' | 'event' | 'receive';
  name?: string;
}

export interface BlockWithTransactions extends Omit<ethers.providers.Block , 'transactions'> {
  transactions: Array<ethers.providers.TransactionResponse>;

}

export interface IMETA_CONTRACT {
  address:string,
  name:string
  abi:Array<IABI_OBJECT>,
  contract:Contract
}

export interface ICONTRACT {
  address:string,
  name:string
  abi?:any;
}

export interface IBALANCE {
  ether: string;
  usd:string;
}

export interface IINPUT_EVENT {
  function: string;
  state: string;
  outputs: Array<any>;
  args: any;
}


export interface IFUNCION_CALL_RESULT {
  success:boolean,
  message:string

}


export interface ITRANSACTION_RESULT {
  success:boolean,
  success_result?:ITRANSACTION_DETAILS,
  error_message?:string

}

export interface ITRANSACTION_DETAILS  {
    txhash: string
    bknr: number,
    from: string
    gas: string
    to: string
    value: string
}