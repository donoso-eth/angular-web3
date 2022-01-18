import { expect } from "chai";
import { ethers } from "hardhat";

describe("Hello World", function () {
  it("Should return the new greeting once it's changed", async function () {
    const HelloWorld = await ethers.getContractFactory("HelloWorldContract");
    const helloWorld = await HelloWorld.deploy("Hello, world!");
    await helloWorld.deployed();

    expect(await helloWorld.greet()).to.equal("Hello, world!");

    const setGreetingTx = await helloWorld.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await helloWorld.greet()).to.equal("Hola, mundo!");
  });
});
