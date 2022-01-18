import { Inject, Injectable } from '@angular/core';
import { ContractService, NetworkProviderService,WalletService } from 'angularonchain';
import { Contract} from 'ethers'
import { uniswap_abi } from './uniswap_abi';


@Injectable({
  providedIn: 'root'
})
export class OnChainService {
  private _dollarExchange: number;

  constructor(@Inject('localNodeProvider') public localProvider: NetworkProviderService,
  @Inject('helloWorldContract') public contractService:ContractService, public walletService: WalletService
  ) { }


  async getDollarEther() {
    if (this._dollarExchange == undefined) {

    const uniswapUsdcAddress = "0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc";
    const uniswapAbi = uniswap_abi;
    
   const uniswapService = new NetworkProviderService([
    "https://eth-mainnet.gateway.pokt.network/v1/lb/611156b4a585a20035148406",
    `https://eth-mainnet.alchemyapi.io/v2/oKxs-03sij-U_N0iOlrSsZFr29-IqbuF`,
    "https://rpc.scaffoldeth.io:48544",
  ])

   await uniswapService.init()

  const getUniswapContract = async (address) =>
    await new Contract(address, uniswapAbi, uniswapService.Provider);
    const contract = await getUniswapContract(uniswapUsdcAddress);
    const reserves = await contract.getReserves();

    this._dollarExchange =
      (Number(reserves._reserve0) / Number(reserves._reserve1)) * 1e12;

    }
    return this._dollarExchange
  }

  async init(){
    const myProvider = await this.localProvider.init()
    await this.localProvider.initBlockSubscription()
    const myWallet = await this.walletService.init(myProvider)
    console.log(myWallet)
    await this.contractService.init(myProvider,myWallet)

  }
}
