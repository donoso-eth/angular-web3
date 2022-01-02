Thanks to  @austingriffit for crafting the awesome [Scaffold-eth](https://github.com/scaffold-eth/scaffold-eth) project. This projects aims to reproduce with angular tooling the same experience as scaffold-sth produce for react devs


# ⛓️  AngularOnChain

<p align="center">
  <img src="docs/images/angular_on_chain.png"  alt="[Angular On Chain" width="350" title="[Angular On Chaint">
</p>



### Mision
&nbsp; 
Superpower the angular superdevs with the best and easy to use tools for get up and running instantly creating wonderfull dapps on Ethereum/polygon's blockchains

> everything you need to build on Ethereum and Polygon! 🚀.

🧪 Quickly experiment with Solidity using 

&nbsp; 
# ROADMAP

10/01/22 First release npm package with min config: version 0.0.2  
  
15/01/22 Medium article and tutorial 

01/02/22 Release npm package with contract interaction: version 0.0.3

...

01/03/2022 Complete reproduction scaffold-eth as angular schemartics: version 1.0.0  

 &nbsp; 


# 🏄‍♂️ Quick Start

Prerequisites: [Node](https://nodejs.org/en/download/) plus [Yarn](https://classic.yarnpkg.com/en/docs/install/) or [Npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) and [Git](https://git-scm.com/downloads)

### 1) Add the angularonchain schematics package to your project  

```bash
ng add angularonchain
```
  &nbsp;  
### 2) Choose installation Options:
The package will prompt the options for configuration  
- Project name: if not provided, the angular,json default project will be taken
- Demo Dapp to be installed. The roadmap shows the plan to add additional demo Dapps, for the time being only "Hello on Chan
  - Hello On Chain Dapp

 &nbsp;  


 
### 3) Initialize your 👷‍ Hardhat chain:
For start up and running we recommend starting learning and playing with the local node. In the case that you want to deploy to a testnest or mainnet you can skip the next command

```javascript
npm run node   
// spin blockhain node on localhost creating 10 accounts and privatekeys
```
Either deploying to localhost node or testnet/cloud the conract has to be compiled

```javascript
npm run compile 
// compile the demo app contract in hardhat/contracts/demoContract.sol
```
When compiling, the contract artifacts will be created in the angular project assets folder. 


🔏 You can edit your smart contract `.sol` in `/hardhat/contracts` and recompile with same command 


```javascript
npm run deploy:localhost
// deploy the smartcontract to the chosen network.
```
 If you want to deploy to a testnet/mainnet the api and private key have to be configured within hardhat/hardhat.config.ts

💼 You can edit your deployment scripts in `/hardhat/deploy`  
 &nbsp;  

### 4) Your demo App:  
 &nbsp; 

# 📚 Documentation

As per [Scaffold-eth](https://github.com/scaffold-eth/scaffold-eth), find a non exhaustive list of ressources to learn solidity, inlcuding the [Scaffold-eth](https://github.com/scaffold-eth/scaffold-eth) resources  
Documentation, tutorials, challenges, and many more resources, visit: [docs.scaffoldeth.io](https://docs.scaffoldeth.io)  
 &nbsp; 

For quickstarters we recommend learning the basics of **ethers** and **solidity**, ethers is the library used for interacting bewtween the app and the blockchain and solidity is the choosen languaje for dreating **smart contracts**  
&nbsp; 

# 🔭 Learning ethers.js
ethers,js and web3,js are the most popular libraries to interactact with the blockchain, we have choosen ether for our project, the main reason is the separation of concern of providers and signers. A very instructive video can be seen at [ethers.js: A Complete, Tiny and Simple Ethereum Library in JavaScript by Richard Moore](https://www.youtube.com/watch?v=r1ldSzcqaHo)  
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
