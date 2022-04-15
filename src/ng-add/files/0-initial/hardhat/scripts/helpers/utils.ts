import { Contract, ContractTransaction } from 'ethers';
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