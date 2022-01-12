import { ethers} from 'ethers'

export const getWallet = ():ethers.Wallet => {
    let wallet:ethers.Wallet;
    const currentPrivateKey = window.localStorage.getItem("metaPrivateKey");
    if (currentPrivateKey) {
       wallet = new ethers.Wallet(currentPrivateKey);

    } else {
      const wallet = ethers.Wallet.createRandom();
      const privateKey =wallet._signingKey().privateKey;
      window.localStorage.setItem("metaPrivateKey", privateKey);
    }
    return wallet
}