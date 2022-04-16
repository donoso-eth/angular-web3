import { bufferToHex,privateToAddress, toBuffer} from "ethereumjs-util";
import type { mnemonicToSeedSync as mnemonicToSeedSyncT } from "ethereum-cryptography/bip39";
import type { HDKey as HDKeyT } from "ethereum-cryptography/hdkey";
import { HardhatRuntimeEnvironment, HardhatNetworkConfig } from "hardhat/types";


function deriveKeyFromMnemonicAndPath(
    mnemonic: string,
    hdPath: string,
    passphrase: string
  ): Buffer | undefined {
    const {
      mnemonicToSeedSync,
    }: {
      mnemonicToSeedSync: typeof mnemonicToSeedSyncT;
    } = require("ethereum-cryptography/bip39");
    const seed = mnemonicToSeedSync(mnemonic, passphrase);
  
    const {
      HDKey,
    }: {
      HDKey: typeof HDKeyT;
    } = require("ethereum-cryptography/hdkey");
  
    const masterKey = HDKey.fromMasterSeed(seed);
    const derived = masterKey.derive(hdPath);
  
    return derived.privateKey === null ? undefined : derived.privateKey;
  }


export function derivePrivateKeys(
    mnemonic: string,
    hdpath: string,
    initialIndex: number,
    count: number,
    passphrase: string
  ): Buffer[] {

    if (!hdpath.endsWith("/")) {
      hdpath += "/";
    }
  
    const privateKeys: Buffer[] = [];
  
    for (let i = initialIndex; i < initialIndex + count; i++) {
      const privateKey = deriveKeyFromMnemonicAndPath(
        mnemonic,
        hdpath + i.toString(),
        passphrase
      );
  
      if (privateKey === undefined) {
        throw 'error'
        // new HardhatError(ERRORS.NETWORK.CANT_DERIVE_KEY, {
        //   mnemonic,
        //   path: hdpath,
        // });
      }
  
      privateKeys.push(privateKey);
    }
  
    return privateKeys;
  }


export async function createHardhatAndFundPrivKeysFiles(
  hre: HardhatRuntimeEnvironment,
  path: string
):Promise<Array<{key:string, address:string}>> {
  
 const network_config:HardhatNetworkConfig =   hre.config.networks.hardhat
 const accountsConfig:any = network_config.accounts




 const result =  derivePrivateKeys(
   accountsConfig.mnemonic,
   accountsConfig.path,
   accountsConfig.initialIndex,
   accountsConfig.count,
   accountsConfig.passphrase
 ).map((pk:any) => ({
   privateKey: bufferToHex(pk),
   balance: accountsConfig.accountsBalance
 }))

 let accountsJson = [];

 for (const [index, account] of result.entries()) {
 
    const address = bufferToHex(privateToAddress(toBuffer(account.privateKey)));

    accountsJson.push({key:account.privateKey, address:address})

  }

  return accountsJson
}