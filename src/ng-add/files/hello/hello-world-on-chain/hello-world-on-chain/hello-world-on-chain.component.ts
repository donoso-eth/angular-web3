import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

import { ethers } from 'ethers';

import DemoContract from '../../../assets/artifacts/contracts/DemoContract.sol/DemoContract.json';
import DemoContractAddress from '../../../assets/artifacts/contract_democontract.json';
@Component({
  selector: 'hello-world-on-chain',
  templateUrl: './hello-world-on-chain.component.html',
  styles: [
    `
      .btn_send {
    padding: 10px;
    margin-top: 20px;
    background: orange;
    width: 75px;
    border: 1px solid darkgreen;
}
      }
    `,
  ],
})
export class HelloWorldOnChainComponent implements OnInit {
  deployer_address;
  contract_address;
  myContract: ethers.Contract;
  greeting: string;
  greeting_input: string;
  provider: ethers.providers.JsonRpcProvider;
  signer: any;
  deployer_balance: any;
  loading_contract: 'loading' | 'found' | 'error' = 'loading';
  constructor() {}

  async onChainStuff() {
    try {
      // First we create a provider instance
      // If we want to create a specific clockchain provider, we must pass the url.
      this.provider = new ethers.providers.JsonRpcProvider();

      // Once the provider instance is created, we can request the signer (in localhost node is the first account)
      // In the Blockchain the signer is passed through the hardhat config or metamask
      this.signer = this.provider.getSigner();

      // Signer Address
      this.deployer_address = await this.signer.getAddress();

      // Contract Address (created while deploying)
      this.contract_address = DemoContractAddress.address;

      // Contract instance passing the address, the abi(contract interface) and the signer
      this.myContract = new ethers.Contract(
        this.contract_address,
        DemoContract.abi,
        this.signer
      );

    
      await  this.displayGreeting()

    } catch (error) {
      this.loading_contract = 'error'
    }
  }

  async displayGreeting() {
    
    this.greeting = await this.myContract.greet();
    this.deployer_balance = ethers.utils.formatUnits(
      await this.signer.getBalance(),
      18
    );
    this.loading_contract = 'found'
  }

  async changeGreeting() {
    if (this.greeting_input == undefined) {
      alert('No Greeting found, be nice!!');
      return;
    }
    this.loading_contract = 'loading'
    await this.myContract.setGreeting(this.greeting_input);
    this.displayGreeting();
  }

  ngOnInit(): void {
    this.onChainStuff();
  }
}
