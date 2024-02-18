import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

describe("Counter", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployCounterFixture() {

    // Contracts are deployed using the first signer/account by default
    const [owner] = await hre.viem.getWalletClients();

    const counter = await hre.viem.deployContract("Counter", []);

    const publicClient = await hre.viem.getPublicClient();

    return {
      counter,
      owner,
      publicClient,
    };
  }

  describe("Deployment", function () {
    it("Should set the right number", async function () {
      const { counter } = await loadFixture(deployCounterFixture);

      expect(await counter.read.number()).to.equal(0n);
    });

    it("Should increment the number", async function () {
      const { counter } = await loadFixture(deployCounterFixture);

      await counter.write.increment();

      expect(await counter.read.number()).to.equal(1n);

      await counter.write.increment();

      expect(await counter.read.number()).to.equal(2n);
    });

    it("Should set the number to 5 and then to 0", async function () {
      const { counter } = await loadFixture(deployCounterFixture);

      await counter.write.setNumber([5n]);

      expect(await counter.read.number()).to.equal(5n);

      await counter.write.setNumber([0n]);

      expect(await counter.read.number()).to.equal(0n);
    });
  });
});
