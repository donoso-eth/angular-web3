# Main/Testnet forking

When developing sometime is required to interact with other contracts already present on the network. In some cases, a good approach can be to mock the contract creating a local instance of the contract; in others, the best approach will be to fork the network allowing it to interact with the complete network locally.

### Forking the network

As we are using Hardhat, we only need to include the fork configuration in our `harhdat.config.ts`:&#x20;

```
 const config: HardhatUserConfig = {
 ...
 networks: {
    hardhat: {
      forking: {
        //your rpc url here
        url: `${rpc utl for instance Allchemy}`,
        blockNumber: 25953748,
      }, 
    },
  ...
```

Hardhat recommends using alchemy and inputting the block number for better-caching performance.

Now we are able to spin the forked chain with

```
npx hardhat node

/// or within or ng web3 project
npm run chain 
```

``

&#x20;  &#x20;



