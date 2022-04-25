import { Contract, ContractTransaction, Signer } from 'ethers';
import { ensureDir } from 'fs-extra';
import { HardhatNetworkAccountConfig, HardhatNetworkAccountsConfig, HardhatNetworkConfig, HardhatRuntimeEnvironment } from 'hardhat/types';
import { join } from 'path';


export function getHardhatNetwork(hre: HardhatRuntimeEnvironment) {
  let network = hre.hardhatArguments.network;
  if (network == undefined) {
    network = hre.network.name;
  }
  return network;
}

export async function waitForTx(tx: Promise<ContractTransaction>) {
  await (await tx).wait();
}

export async function deployContract(tx: any): Promise<Contract> {
  const result = await tx;
  await result.deployTransaction.wait();
  return result;
}




export function getAssetsPath(contract_path_relative:string) {
const processDir = process.cwd()
const contract_path = join(processDir,contract_path_relative)
ensureDir(contract_path)
return contract_path
}


export async function impersonateAccount(hre:HardhatRuntimeEnvironment, account:string):Promise<Signer> {

  await hre.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [account],
  });

  const signer = await hre.ethers.getSigner(account)
  return signer

}


export async function resertHardhat(hre:HardhatRuntimeEnvironment, ):Promise<void> {

  await hre.network.provider.request({
    method: "hardhat_reset",
    params: [],
  });

}


export async function forwardChainTime(hre:HardhatRuntimeEnvironment, INCREASE_PERIOD :number):Promise<void> {

  await hre.network.provider.send("evm_increaseTime", [INCREASE_PERIOD + 1])

}

export async function mineBlocks(hre:HardhatRuntimeEnvironment, nrOfBlocks:number) {
  for (let i = 1; i <= nrOfBlocks; i++) {
    await hre.network.provider.request({
      method: "evm_mine",
      params: [],
    });
  }
}