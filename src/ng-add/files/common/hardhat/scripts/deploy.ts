// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { writeFileSync } from "fs";
import { ethers } from "hardhat";

import config from '../hardhat.config'
const assets_path =  config.paths?.artifacts;
async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const DemoContract = await ethers.getContractFactory("DemoContract");
  const demoContract = await DemoContract.deploy("Hello, Angular Chained!");

  await demoContract.deployed();
 
  writeFileSync(`${assets_path}/contract_democontract.json`, JSON.stringify({address: demoContract.address}));

  console.log("Greeter deployed to:",  demoContract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
