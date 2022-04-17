import { BytesLike, Contract, providers, Signer, utils, Wallet } from 'ethers/lib/ethers';
import { task } from 'hardhat/config';



import {
  waitForTx,

  deployContract,
  impersonateAccount,
} from '../helpers/utils';

import { Framework } from '@superfluid-finance/sdk-core';
import { abi_ERC20 } from '../reference/ERC20_ABI';
import { readFileSync } from 'fs-extra';
import { join } from 'path';

import { HardhatRuntimeEnvironment } from 'hardhat/types';


const contract_path_relative = '../src/assets/contracts/';
const processDir = process.cwd();
const contract_path = join(processDir, contract_path_relative);
const contract_config = JSON.parse(
  readFileSync(join(processDir, 'contract.config.json'), 'utf-8')
) as { [key: string]: any };

task('DAI_Impersonate', 'DAI_Impersonate').setAction(async ({}, hre) => {


  const ethers = hre.ethers; 
  const accounts = await ethers.getSigners(); 
  const deployer_local = accounts[0];


  const deployer_provider = hre.ethers.provider
  const deployerKey = process.env["PRIVATE_KEY"] as BytesLike;

  const deployer_wallet = new Wallet(deployerKey);
  const deployer = await deployer_wallet.connect(deployer_provider);


  const DaiContract = new hre.ethers.Contract(
    '0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f',
    abi_ERC20,
    deployer
  );

  // const contract_path_relative =
  //   '../src/assets/contracts/fluid_dao_metadata.json';
  // const processDir = process.cwd();
  // const contract_path = join(processDir, contract_path_relative);

  // const contratMetadata = JSON.parse(readFileSync(contract_path, 'utf-8'));

 

  //const DAIxHolder = await impersonateAccount(hre,"0xddc659c651fcc614b75d08ca4a696a6a78f22a95")


   let  deployerDAIxBalance =  (await DaiContract['balanceOf'](
    deployer.address
   )).toString();
   console.log( deployerDAIxBalance)


   const DAIxHolder_address  = "0x8f12d39b83d4f4f78129f2430f111b92eb278ae3";
   const DAI_HOLDER_balance = await DaiContract['balanceOf'](
    DAIxHolder_address
   );

   console.log(DAI_HOLDER_balance.toString())


/// WE will impersonate the DAY HOLDER ACCOUNT ANT TRANSER TO OUR DEPLOYER ACCOUNT

const DAIxHolder = await impersonateAccount(hre,DAIxHolder_address )

const DaiContracHolder = new hre.ethers.Contract(
  '0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f',
  abi_ERC20,
  DAIxHolder
);

 await DaiContracHolder['transfer'](deployer.address,10000)


 deployerDAIxBalance =  (await DaiContract['balanceOf'](
  deployer.address
 )).toString();
 console.log(deployerDAIxBalance)

});

