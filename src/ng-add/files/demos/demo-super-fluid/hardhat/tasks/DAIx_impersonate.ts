import { Contract, Signer, utils } from 'ethers/lib/ethers';
import { task } from 'hardhat/config';

import {
  waitForTx,
  initEnv,
  ZERO_ADDRESS,
  randomString,
  impersonate,
  deployContract,
} from './helpers/utils';

import { Framework } from '@superfluid-finance/sdk-core';
import { abi_ERC20 } from './helpers/ERC20_ABI';
import { readFileSync } from 'fs-extra';
import { join } from 'path';
import { FluidDao__factory } from '../typechain-types';
import { HardhatRuntimeEnvironment } from 'hardhat/types';

const hostABI = require('@superfluid-finance/ethereum-contracts/build/contracts/Superfluid.json');
const cfaABI = require('@superfluid-finance/ethereum-contracts/build/contracts/ConstantFlowAgreementV1.json');
const contract_path_relative = '../src/assets/contracts/';
const processDir = process.cwd();
const contract_path = join(processDir, contract_path_relative);
const contract_config = JSON.parse(
  readFileSync(join(processDir, 'contract.config.json'), 'utf-8')
) as { [key: string]: any };

task('create-stream', 'creating stream').setAction(async ({}, hre) => {
  const [deployer, user1, user2, user3, user4] = await initEnv(hre);
  const deployer_address = await deployer.getAddress();
  const provider = hre.ethers.provider;

  // await hre.network.provider.request({
  //   method: "evm_mine",
  //   params: [],
  // });

  // let fluidDaoContract  = await new FluidDao__factory(deployer)
  // .deploy("0xEB796bdb90fFA0f28255275e16936D25d3418603",
  // "0x49e565Ed1bdc17F3d220f72DF0857C26FA83F873",
  // "0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f");
  // await fluidDaoContract.deployed();



 
  let deployerNonce = await hre.ethers.provider.getTransactionCount(
    deployer_address
  );

  console.log(deployerNonce);

  const contract_path_relative =
    '../src/assets/contracts/fluid_dao_metadata.json';
  const processDir = process.cwd();
  const contract_path = join(processDir, contract_path_relative);

  const contratMetadata = JSON.parse(readFileSync(contract_path, 'utf-8'));

  console.log(contratMetadata.address);


  const fluidDaoContract = new hre.ethers.Contract(
    contratMetadata.address,
    contratMetadata.abi,
    deployer
  );

const result = await fluidDaoContract['owner']()

console.log(result)
 
  console.log(deployer_address);



  let day_holder_is_member;
  day_holder_is_member = await fluidDaoContract.functions['isMember'](deployer_address);
  console.log(day_holder_is_member);

  const DaiContract = new hre.ethers.Contract(
    '0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f',
    abi_ERC20,
    deployer
  );


  const day_balance = await DaiContract['balanceOf'](
    deployer_address
   );
 
   console.log(day_balance.toString());

  day_holder_is_member = await fluidDaoContract.functions['isMember'](deployer_address);
  console.log(day_holder_is_member,56);


  const cfaContract = new hre.ethers.Contract(
    '0x49e565Ed1bdc17F3d220f72DF0857C26FA83F873',
    cfaABI.abi,
    deployer
  );

  const host = new hre.ethers.Contract(
    '0xEB796bdb90fFA0f28255275e16936D25d3418603',
    hostABI.abi,
    deployer
  );



  let ABI = [
    'function createFlow(address token, address receiver, int96 flowRate,bytes ctx)',
  ];
  let iface = new hre.ethers.utils.Interface(ABI);
  const tx = iface.encodeFunctionData('createFlow', [
    '0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f',
    fluidDaoContract.address,
    '385802469135802',
    '0x',
  ]);

  console.log(tx);

  let result_callAgree = await host['callAgreement'](
    '0x49e565Ed1bdc17F3d220f72DF0857C26FA83F873',
    tx,
    '0x',{ nonce: deployerNonce++ , gasPrice:  utils.parseUnits('100', 'gwei'), 
        gasLimit: 2000000 }
  );
 let res = await result_callAgree.wait();
    console.log('siiiii siii')
  day_holder_is_member = await fluidDaoContract.functions['isMember'](deployer_address);
  console.log(day_holder_is_member);



  // await fluidDaoContract.mockAddPermision()
  day_holder_is_member = await fluidDaoContract.functions['isMember'](deployer_address);
  console.log(day_holder_is_member);

    return;

  //// pause the stream
  let DeleteFlowAbi = [
    'function deleteFlow(address token,address sender, address receiver,bytes ctx)',
  ];
  iface = new hre.ethers.utils.Interface(DeleteFlowAbi);
  const txDown = iface.encodeFunctionData('deleteFlow', [
    '0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f',
    deployer_address,
    fluidDaoContract.address,
    '0x',
  ]);

   result_callAgree = await host['callAgreement'](
    '0x49e565Ed1bdc17F3d220f72DF0857C26FA83F873',
    txDown,
    '0x'
  );
   res = await result_callAgree.wait();

  day_holder_is_member = await fluidDaoContract.functions['isMember'](deployer_address);
  console.log(day_holder_is_member);

});

async function mineBlocks(hre:HardhatRuntimeEnvironment) {
  for (let i = 1; i <= 10; i++) {
    await hre.network.provider.request({
      method: "evm_mine",
      params: [],
    });
  }
}