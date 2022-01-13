import { expect } from "chai";
import { ethers } from "hardhat";
import { BigNumber } from "ethers";


describe("Debug Contract", function () {
  it("Should return the new greeting once it's changed", async function () {
    const DebugContract = await ethers.getContractFactory("DebugContract");
    const debugContract = await DebugContract.deploy("Hello, world!");
    await debugContract.deployed();
    expect(await debugContract.greet()).to.equal("Hello, world!");
    const setGreetingTx = await debugContract.setGreeting("Hola, mundo!");
    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await debugContract.greet()).to.equal("Hola, mundo!");
  });
  it("Should return compute Value's changed", async function () {
    const DebugContract = await ethers.getContractFactory("DebugContract");
    const debugContract = await DebugContract.deploy("Hello, world!");
    await debugContract.deployed();
    expect(await debugContract.greet()).to.equal("Hello, world!");
   
    const COMPUTE_RESULT= BigNumber.from(32)
    const result = await debugContract.calculate(4,8)
  
   expect(result).to.equal(COMPUTE_RESULT)
  });
});
