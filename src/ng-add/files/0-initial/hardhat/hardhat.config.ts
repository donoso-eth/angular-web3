import * as dotenv from 'dotenv';

import { HardhatUserConfig, task } from 'hardhat/config';
import '@nomiclabs/hardhat-etherscan';
import '@nomiclabs/hardhat-waffle';
import '@typechain/hardhat';
import 'hardhat-gas-reporter';
import 'solidity-coverage';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import * as glob from 'glob';
import { resolve } from 'path';

const INFURA_ID = 'YOUR KEY'; //process.env["INFURA_ID"]
const MORALIS_ID = 'YOUR KEY'; //process.env["MORALIS_ID"]
const ALCHEMY_ID_MUMBAI = 'YOUR KEY'; //process.env["ALCHEMY_ID_MUMBAI"]

dotenv.config();

//// import task files when types have already been created
if (existsSync('./typechain-types')) {
  glob.sync('./tasks/**/*.ts').forEach(function (file: any) {
    require(resolve(file));
  });
}

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task(
  'generate',
  'Create a mnemonic for builder deploys',
  async (_, { ethers }) => {
    const DEBUG = true;
    const bip39 = require('bip39');
    const { hdkey } = require('ethereumjs-wallet');
    const mnemonic = bip39.generateMnemonic();
    if (DEBUG) console.log('mnemonic', mnemonic);
    const seed = await bip39.mnemonicToSeed(mnemonic);
    if (DEBUG) console.log('seed', seed);
    const hdwallet = hdkey.fromMasterSeed(seed);
    console.log(hdwallet);
    const wallet_hdpath = "m/44'/60'/0'/0/";
    const account_index = 0;
    const fullPath = wallet_hdpath + account_index;
    if (DEBUG) console.log('fullPath', fullPath);
    const wallet = hdwallet.derivePath(fullPath).getWallet();
    console.log(wallet);
    console.log(JSON.stringify(wallet));
    const privateKey = '0x' + wallet.privateKey.toString('hex');
    if (DEBUG) console.log('privateKey', privateKey);
    console.log(privateKey);
    const EthUtil = require('ethereumjs-util');
    const address =
      '0x' + EthUtil.privateToAddress(wallet.privateKey).toString('hex');
    console.log(
      '🔐 Account Generated as ' +
        address +
        ' and set as mnemonic in packages/hardhat'
    );
    console.log(
      "💬 Use 'yarn run account' to get more information about the deployment account."
    );

    writeFileSync('./' + address + '.txt', mnemonic.toString());
    writeFileSync('./mnemonic.txt', mnemonic.toString());
  }
);

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const mainnetGwei = 21;


const defaultNetwork = 'localhost';

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.4',
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  defaultNetwork,

  networks: {
    hardhat: {
      forking: {
        //your rpc url here, in this case for Mumbai
        url: `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_ID_MUMBAI}`,
        blockNumber: 25953748,
      },
    },
    localhost: {
      url: 'http://localhost:8545',
      chainId: 1337,
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${INFURA_ID}`, // <---- YOUR INFURA ID! (or it won't work)
      // `https://speedy-nodes-nyc.moralis.io/${MORALIS_ID}/eth/rinkeby`
      accounts:
        process.env['DEPLOYER_KEY'] !== undefined
          ? [process.env['DEPLOYER_KEY']]
          : [],
      // accounts: {
      //   mnemonic: mnemonic(),
      // },
    },
    kovan: {
      url: `https://kovan.infura.io/v3/${INFURA_ID}`, // <---- YOUR INFURA ID! (or it won't work)
      // `https://speedy-nodes-nyc.moralis.io/${MORALIS_ID}/eth/kovan`
      accounts:
        process.env['DEPLOYER_KEY'] !== undefined
          ? [process.env['DEPLOYER_KEY']]
          : [],
      // accounts: {
      //   mnemonic: mnemonic(),
      // },
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${INFURA_ID}`, // <---- YOUR INFURA ID! (or it won't work)
      //`https://speedy-nodes-nyc.moralis.io/${MORALIS_ID}/eth/mainnet`

      gasPrice: mainnetGwei * 1000000000,
          accounts:
        process.env['DEPLOYER_KEY'] !== undefined
          ? [process.env['DEPLOYER_KEY']]
          : [],
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/${INFURA_ID}`, // <---- YOUR INFURA ID! (or it won't work)
      // `https://speedy-nodes-nyc.moralis.io/${MORALIS_ID}/eth/ropsten`
          accounts:
        process.env['DEPLOYER_KEY'] !== undefined
          ? [process.env['DEPLOYER_KEY']]
          : [],
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${INFURA_ID}`, // <---- YOUR INFURA ID! (or it won't work)
      // `https://speedy-nodes-nyc.moralis.io/${MORALIS_ID}/eth/goerli`
          accounts:
        process.env['DEPLOYER_KEY'] !== undefined
          ? [process.env['DEPLOYER_KEY']]
          : [],
    },
    xdai: {
      url: 'https://rpc.xdaichain.com/',
      gasPrice: 1000000000,
          accounts:
        process.env['DEPLOYER_KEY'] !== undefined
          ? [process.env['DEPLOYER_KEY']]
          : [],
    },
    polygon: {
      url: 'https://speedy-nodes-nyc.moralis.io/XXXXXXXXXXXXXXXXXXXx/polygon/mainnet', // <---- YOUR MORALIS ID! (not limited to infura)
      //https://polygon-rpc.com
      gasPrice: 1000000000,
          accounts:
        process.env['DEPLOYER_KEY'] !== undefined
          ? [process.env['DEPLOYER_KEY']]
          : [],
    },
    mumbai: {
      url: `https://speedy-nodes-nyc.moralis.io/${MORALIS_ID}/polygon/mumbai`, // <---- YOUR MORALIS ID! (not limited to infura)
      // `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_ID_MUMBAI}`
      gasPrice: 1000000000,
          accounts:
        process.env['DEPLOYER_KEY'] !== undefined
          ? [process.env['DEPLOYER_KEY']]
          : [],
    },

    matic: {
      url: 'https://rpc-mainnet.maticvigil.com/',
      gasPrice: 1000000000,
          accounts:
        process.env['DEPLOYER_KEY'] !== undefined
          ? [process.env['DEPLOYER_KEY']]
          : [],
    },
    // ropsten: {
    //   url: process.env["ROPSTEN_URL"] || "",
    //   accounts: process.env["DEPLOYER_KEY"] !== undefined ? [process.env["DEPLOYER_KEY"]] : [],
    // },
  },
  gasReporter: {
    enabled: process.env['REPORT_GAS'] !== undefined,
    currency: 'USD',
  },
  etherscan: {
    apiKey: process.env['ETHERSCAN_API_KEY'],
  },
};

export default config;
