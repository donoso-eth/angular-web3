import { expect } from "chai";
import { ethers } from "hardhat";

describe("Minimal Contract", function () {
  it("Should return the new greeting once it's changed", async function () {
    const MimimlaContract = await ethers.getContractFactory("MinimalContract");
    const mimimlaContract = await MimimlaContract.deploy();
    await mimimlaContract.deployed();

    console.log(mimimlaContract)

  });
});
