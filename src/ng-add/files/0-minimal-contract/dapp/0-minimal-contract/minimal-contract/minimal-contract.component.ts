import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AngularContract, DappInjectorService, web3Selectors } from 'angular-web3';
import { providers } from 'ethers';



@Component({
  selector: 'minimal-contract',
  templateUrl:'./minimal-contract.component.html',
  styles: [
  ]
})
export class MinimalContractComponent implements AfterViewInit {
  deployer_address!: string;
  myWallet_address!:string;;
  contractHeader!: { name: string; address: string; };
  blockchain_is_busy = false;
  blockchain_status!: string;
  minimalContract!: AngularContract;
  netWork!:string;

  constructor(  private store: Store,
    private dappInjectorService: DappInjectorService,) { }


  async asyncStuff() {
    this.myWallet_address = (await this.dappInjectorService.config.signer?.getAddress()) as string
   this.contractHeader  = { name: this.minimalContract.name, address: this.minimalContract.address}
   this.deployer_address = await (await (this.dappInjectorService.config.defaultProvider as providers.JsonRpcProvider).getSigner()).getAddress()
    this.netWork = this.dappInjectorService.config.connectedNetwork;
 
  }

  ngAfterViewInit(): void {
    this.store.select(web3Selectors.chainStatus).subscribe(async (value) => {
      this.blockchain_status = value;

      console.log(value)

      if (value == 'success') {
        this.minimalContract = this.dappInjectorService.config.contracts['myContract']
        this.asyncStuff()
      

   
      } else {

      }

    });

  }

}
