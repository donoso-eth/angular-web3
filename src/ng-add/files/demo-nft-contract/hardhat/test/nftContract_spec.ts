import { expect } from "chai";
import { ethers } from "hardhat";
import { BigNumber } from "ethers";


describe("NFT Contract", function () {
  it("Should return the new greeting once it's changed", async function () {
    const NftContract = await ethers.getContractFactory("NftContract");
    const nftContract = await NftContract.deploy();
    await nftContract.deployed();
    expect(await nftContract.greet()).to.equal("Hello, world!");
    const setGreetingTx = await nftContract.setGreeting("Hola, mundo!");
    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await nftContract.greet()).to.equal("Hola, mundo!");
  });
  it("Should return compute Value's changed", async function () {
    const NftContract = await ethers.getContractFactory("NftContract");
    const nftContract = await NftContract.deploy();
    await nftContract.deployed();
    expect(await nftContract.greet()).to.equal("Hello, world!");
   
    const COMPUTE_RESULT= BigNumber.from(32)
    const result = await nftContract.calculate(4,8)
  
   expect(result).to.equal(COMPUTE_RESULT)
  });
});
