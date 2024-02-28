// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
require('dotenv').config();


async function main() { 
  console.log("DEPLOYING");
  MockToken= await hre.ethers.getContractFactory("MockToken");
  mockToken = await MockToken.deploy(process.env.TEST_ADDRESS);
  await mockToken.waitForDeployment();
  mockTokenAddress = await mockToken.getAddress();

  Safe = await hre.ethers.getContractFactory("Safe");
  safeContract = await Safe.deploy(mockTokenAddress);
  await safeContract.waitForDeployment();
  safeContractAddress = await safeContract.getAddress();

  console.log('Mock token address: ', mockTokenAddress);
  console.log('Safe contract address: ', safeContractAddress);

  // Mock token address:  0xEdcC3aF7B1F50F093d14b6156aFC3AdC02Fb8cAD
  // Safe contract address:  0x3ae5f89c9C948B3802d7E0C1D1993fF7D56b2BB6
  // npx hardhat verify --network sepolia 0x3ae5f89c9C948B3802d7E0C1D1993fF7D56b2BB6 "0xEdcC3aF7B1F50F093d14b6156aFC3AdC02Fb8cAD"
  // npx hardhat verify --network sepolia 0xEdcC3aF7B1F50F093d14b6156aFC3AdC02Fb8cAD "0x81A0A981F3292C522c2054DDA8B3aD63F1a9eb42"
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
