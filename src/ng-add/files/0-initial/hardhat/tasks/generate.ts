import { writeFileSync } from 'fs-extra';
import { task } from 'hardhat/config';

task(
    'generate',
    'Create a mnemonic for builder deploys').setAction(async ({}, hre) => {
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
  