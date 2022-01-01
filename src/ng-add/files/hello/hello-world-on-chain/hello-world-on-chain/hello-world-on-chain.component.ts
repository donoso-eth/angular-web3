import { Component, OnInit } from '@angular/core';

import { ethers} from 'ethers'

import Greeter from '../../../assets/artifacts/contracts/Greeter.sol/Greeter.json';
import GreeterAddress from '../../../assets/artifacts/contract_greeter.json';
@Component({
  selector: 'hello-world-on-chain',
  templateUrl: './hello-world-on-chain.component.html',
  styles: [`
    .btn_send {
      background:red;
    }`
  ]
})
export class HelloWorldOnChainComponent implements OnInit {
  deployer_address;
  contract_address;
  myContract: ethers.Contract;
  greeting:string;
  greeting_input:string;
  provider: ethers.providers.JsonRpcProvider;
  signer: any;
  deployer_balance: any;

  constructor() {
    console.log(Greeter.abi)
    console.log(GreeterAddress)
   }

  async onChainStuff(){
    this.provider = new ethers.providers.JsonRpcProvider();

    this.signer = this.provider.getSigner()
   
    this.deployer_address = await this.signer.getAddress();

    this.contract_address = GreeterAddress.address

    this.myContract = new ethers.Contract(this.contract_address, Greeter.abi, this.signer);
   
    
    this.displayGreeting()
  
  
  }

  async displayGreeting() {
    this.greeting = await this.myContract.greet()
    this.deployer_balance = ethers.utils.formatUnits(await this.signer.getBalance(),18)
    console.log(this.greeting)
  }

  async changeGreeting(){
  
    if (this.greeting_input == undefined) {
      alert("No Greeting found, be nice!!")
      return
    }
   await this.myContract.setGreeting(this.greeting_input)
    this.displayGreeting()
  }

  ngOnInit(): void {
    this.onChainStuff()
  }

}
