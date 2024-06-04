<p >
<span style="color:red"> </span>
<span><br>This package is under strong development and continous changes, not all the demos are working so far</span>




Thanks to  @austingriffith for crafting the awesome [Scaffold-eth](https://github.com/scaffold-eth/scaffold-eth) project. This projects aims to reproduce with angular tooling the same experience as scaffold-sth produce for react devs


# ⛓️  Angular-Web3


[![CircleCI branch](https://img.shields.io/circleci/project/github/jdonosocoding/angular-web3/release.svg?label=build)](https://circleci.com/gh/jdonosocoding/angular-web3) [![CircleCI branch](https://img.shields.io/circleci/project/github/jdonosocoding/angular-web3/release.svg?label=test)](https://circleci.com/gh/jdonosocoding/angular-web3) [![latest](https://img.shields.io/npm/v/angular-web3/latest.svg)](https://npmjs.com/package/angular-web3) 
[![License](https://img.shields.io/npm/l/@ampgular/cli.svg)](/LICENSE) 
<p align="center">
  <img src="docs/images/angular_on_chain.png"  alt="[Angular On Chain" width="350" title="[Angular On Chaint">
</p>



### Mision  
Superpower the angular superdevs with the best and easy to use tools for get up and running instantly creating wonderfull dapps on Ethereum/polygon's blockchains

> everything you need to build on Ethereum and Polygon! 🚀.

🧪 Quickly experiment changing contracts and seen result on the frontend.
&nbsp; 
&nbsp;   
### Main knowledge pillars:
- Hardhat
- Solidity
- Ether.js  
- Of course Angular

&nbsp; 


# 🏄‍♂️ Quick Start

Prerequisites: 
To be in an **Angular project** 
  
   ```bash
  ng new angular-scaffold-eth  
``` 
cd in the directory
   ```bash
  cd angular-scaffold-eth  
``` 
 
  &nbsp;  
### 1) Add the angular-web3 schematics package to your project  

```bash
ng add angular-web3
```
  &nbsp;  
### 2) chose installation Options:
The package will prompt the options for configuration  
- Project name in the case that your workspace has more than one angular project
- Do you want to install a Demo app or only infrastructure/services?

a) Demo Dapp to be installed:
  - Hello World Contract
  - Debug Contract  
  - NFT Contract   

If you choose a Demo app, bear in mind that Angular Material will be installed for fast mock up

&nbsp; 
b) Having chosen an empty app you will have the opportunity to adda services (more to come)

  - ipfs
  - subgraph

  &nbsp;  
### 3) Updated tsconfig.json:
All relevant web3 dapp files are under de DappInjectorModule. For ease of coding we have added a path in the tsconfig file:
 ```
"paths":{"angular-web3":["src/app/dapp-injector/index.ts"]}
```
to be able to :
 ```
import { DappFeature } from 'angular-web3'
```
throurought the entire dapp
  &nbsp;  
  &nbsp;  
### 4) Initialize your 👷‍ Hardhat chain:
For start up and running we recommend starting learning and playing with the local node. 

&nbsp;**Hardhat file structure**.
The schematics package will scaffold the required hardhat config:  

<p align="center">
  <img src="docs/images/hardhat_files.png"  alt="Angular On Chain" width="350" title="Angular On Chaint">
</p>

It will do the wiring moving the contracts and requiered artifacts as json files to the assets folder.  
In the case that you want to deploy to a testnest or mainnet you can skip the next command.

```javascript
npm run chain  
// spin blockhain node on localhost creating 10 accounts and privatekeys
```
Either deploying to localhost node or testnet/cloud the conract has to be compiled

```javascript
npm run compile 
// compile the demo app contract in hardhat/contracts/demoContract.sol
```
When compiling, the contract artifacts will be created in the angular project assets folder. 


🔏 You can edit your smart contract `.sol` in `/hardhat/contracts` and recompile with same command 

Now is time to deploy our contract

```javascript
npm run deploy
// deploy the smartcontract to the chosen network.
```
 If you want to deploy to a testnet/mainnet the api and private key have to be configured within hardhat/hardhat.config.ts


💼 You can edit your deployment scripts in `/hardhat/deploy`  
 &nbsp;  
 
Developping in the hardhat network it may be useful to use watch hooks for compiling and deploying, if this is required you can avoid the commands 'compile' and 'deploy' and run in watch mode  
```javascript
npm run watch-contract
// launch compile and deploy in watch mode.
```
☠️☠️☠️ Don't do watch mode in mainnet  
⚠️⚠️⚠️ Take care watching in the testnet, test ether is free but you are required to have some  
 &nbsp;  
 **Testing Solidity Contracts**
 The schematics also include the hardhat test configuratio and infrastructure for solidity contract testing  
 &nbsp;


```javascript
npm run contracts:test
// run the contract tests
```
```javascript
npm run contracts:coverage
// Contracts solidity test coverage analysis
```
<p align="center">
  <img src="docs/images/solidity_coverage.png"  alt="[Angular On Chain" width="350" title="Angular On Chaint">
</p>

Out of the box testing infrastructure ready to use 🧪🧪🧪🧪

&nbsp;

### 5) Your demo App:  
Our target is to upload every two weeks a new Demo App till we have around 10 dapps showcasing major use cases.

For the time being, we have the first two: **Hello World On Chain** and **Debug Contrat**.  
The schematics package
 It will also scaffold a angular module with the use case chosen. In our case the the "hello world on chain module"
<p align="center">
  <img src="docs/images/feature_dapp.png"  alt="Feature Dapp Module" width="350" title="Feature Dapp Module">
</p>
The next steps are:  

- **Copy the selector** of the exported featuremodule component into the chosen component .html  
   
```javascript
<hello-world-contract></hello-world-contract> 
``` 
 &nbsp;
 - **typings.d.ts** file.  
  We The contract interface .abi file and the contract address will be directly imported through json files, we require to have following lines of code in your typings.d.ts file:  
  ```javascript
declare var module: NodeModule;
    interface NodeModule {
    id: string;
}

declare module "*.json" {
    const value: any;
    export default value;
}   

declare module '@download/blockies'
```
In the case that no typings.d.ts file is available, the schematics package will create it.
 &nbsp;

 &nbsp;
# 🚀🚀🚀 And Voilà
<p align="center">
  <img src="docs/images/hello_dapp.png"  alt="Hello World app"  title="Hello World app">
</p>

 &nbsp;
# 🧰 Angular web3 dapp structure 

 We will deep dive in other articles, for now a brief introduction in order to understand the structured required to run our dapp on the blockchain. 

 Out of the box chain state will be handled through ngrx with two 

 A configuration object declared at the DappInjector Module level with followind params:
<p align="center">
  <img  width="300" src="docs/images/config_injector.png"  alt="Hello World app"  title="Hello World app">
</p>

 &nbsp; 


# 📚 Documentation

As per [Scaffold-eth](https://github.com/scaffold-eth/scaffold-eth), find a non exhaustive list of ressources to learn solidity, inlcuding the [Scaffold-eth](https://github.com/scaffold-eth/scaffold-eth) resources  
Documentation, tutorials, challenges, and many more resources, visit: [docs.scaffoldeth.io](https://docs.scaffoldeth.io)  
 &nbsp; 

For quickstarters we recommend learning the basics of **ethers** and **solidity**, ethers is the library used for interacting bewtween the app and the blockchain and solidity is the chosen languaje for dreating **smart contracts**  
&nbsp; 

# 🔭 Learning ethers.js ☁️
ethers,js and web3,js are the most popular libraries to interactact with the blockchain, we have chosen ether for our project, the main reason is the separation of concern of providers and signers. A very instructive video can be seen at [ethers.js: A Complete, Tiny and Simple Ethereum Library in JavaScript by Richard Moore](https://www.youtube.com/watch?v=r1ldSzcqaHo)  
&nbsp;  
Follow the [Getting Started guide](https://docs.ethers.io/v5/getting-started/) with special interest in understanding the main three concepts within the common terminology:
<p align="center">
  <img src="docs/images/ethers_terminlogy.png"  alt="Angular On Chain"  title="Terminology Ethers">
</p>

📕 Read the docs: https://docs.ethers.io/v5/    

Minimal code snippet
```javascript
  async onChainStuff(){

    // First we create a provider instance
    // If we want to create a specific clockchain provider, we must pass the url.
    this.provider = new ethers.providers.JsonRpcProvider();

    // Once the provider instance is created, we can request the signer (in localhost node is the first account)
    // In the Blockchain the signer is passed through the hardhat config or metamask
    this.signer = this.provider.getSigner()

    // Signer Address
    this.deployer_address = await this.signer.getAddress();

     // Contract Address (created while deploying)
    this.contract_address = DemoContractAddress.address

    
     // Contract instance passing the address, the abi(contract interface) and the signer
    this.myContract = new ethers.Contract(this.contract_address, DemoContract.abi, this.signer);
   
    // Deployer balance in rEth
    this.deployer_balance = ethers.utils.formatUnits(await this.signer.getBalance(),18)
 
  }
```


&nbsp; 
# 🔭 Learning Solidity  
Minimal code snippet our our hello world dapp, get a first solidity flavour!

```javascript
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract DemoContract {
    string private greeting;

    constructor(string memory _greeting) {
        console.log("Deploying a Smart Contract with greeting:", _greeting);
        greeting = _greeting;
    }

    function greet() public view returns (string memory) {
        return greeting;
    }

    function setGreeting(string memory _greeting) public {
        console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
        greeting = _greeting;
    }
}
```

📕 Read the docs: https://docs.soliditylang.org

📚 Go through each topic from [solidity by example](https://solidity-by-example.org) editing `YourContract.sol` in **🏗 scaffold-eth**

- [Primitive Data Types](https://solidity-by-example.org/primitives/)
- [Mappings](https://solidity-by-example.org/mapping/)
- [Structs](https://solidity-by-example.org/structs/)
- [Modifiers](https://solidity-by-example.org/function-modifier/)
- [Events](https://solidity-by-example.org/events/)
- [Inheritance](https://solidity-by-example.org/inheritance/)
- [Payable](https://solidity-by-example.org/payable/)
- [Fallback](https://solidity-by-example.org/fallback/)

📧 Learn the [Solidity globals and units](https://solidity.readthedocs.io/en/v0.6.6/units-and-global-variables.html)
