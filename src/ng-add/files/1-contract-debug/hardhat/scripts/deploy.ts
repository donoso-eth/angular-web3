// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.

import { writeFileSync,readFileSync } from "fs";
import {ensureDir } from 'fs-extra'
import { ethers } from "hardhat";
import { join } from "path";


interface ICONTRACT_DEPLOY {
  artifactsPath:string,
  name:string,
  ctor?:any,
  jsonName:string
}

const contract_path_relative = '../src/assets/contracts/';
const processDir = process.cwd()
const contract_path = join(processDir,contract_path_relative)
ensureDir(contract_path)

async function main() {
  const contract_config = JSON.parse(readFileSync( join(processDir,'contract.config.json'),'utf-8')) as {[key:string]: ICONTRACT_DEPLOY}
  
  const deployContracts=["debugContract"]
 
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  for (const toDeployName of deployContracts) {

    const toDeployContract = contract_config[toDeployName]
    const artifactsPath = join(processDir,`../src/assets/artifacts/contracts/${toDeployContract.artifactsPath}`);
    const Metadata = JSON.parse(readFileSync( artifactsPath,'utf-8'))
    const Contract = await ethers.getContractFactory(toDeployContract.name);

    let contract
    contract =  await Contract.deploy(toDeployContract.ctor);
    toDeployContract.ctor == undefined ?  await Contract.deploy() : await Contract.deploy(toDeployContract.ctor);
    await contract.deployed();

    writeFileSync(`${contract_path}/${toDeployContract.jsonName}_metadata.json`, JSON.stringify({
      abi:Metadata.abi,
      name:toDeployContract.name
      ,address: contract.address}));
  
    console.log(toDeployContract.name + " Contract Deployed to:",  contract.address);
  } 
 

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
