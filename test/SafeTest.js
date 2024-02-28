const {
    time,
    loadFixture,
  } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
  const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
  const { expect } = require("chai");
  

  describe("Safe", function () {
    let Safe;
    let safeContract;
    let safeContractAddress; 
    let MockToken; 
    let mockToken; 
    let mockTokenAddress; 
    let owner;
    let addr1;
    let addr2;
    let etherDepositAmount = "1";
  
    beforeEach(async function () {
      [owner, addr1, addr2] = await ethers.getSigners();
      MockToken= await ethers.getContractFactory("MockToken");
      mockToken = await MockToken.deploy(addr1.address);
      await mockToken.waitForDeployment();
      mockTokenAddress = await mockToken.getAddress();

      Safe = await ethers.getContractFactory("Safe");
      safeContract = await Safe.deploy(mockTokenAddress);
      await safeContract.waitForDeployment();
      safeContractAddress = await safeContract.getAddress();

      console.log('Mock token address: ', mockTokenAddress);
      console.log('Safe contract address: ', safeContractAddress);

      await mockToken.connect(addr1).approve(safeContractAddress, ethers.parseEther(etherDepositAmount));

    });
  
    it("Should deposit tokens and allow withdrawal", async function () {
      // Deposit tokens
      const depositAmount = ethers.parseEther(etherDepositAmount);
      await safeContract.connect(addr1).depositTokens(depositAmount);
  
      // Check balance
      const balance = await safeContract.balances(addr1.address); 
      expect(balance).to.equal(depositAmount);
      
      // Withdraw tokens
      await safeContract.connect(addr1).withdrawTokens(depositAmount);
  
      // Check balance after withdrawal
      const finalBalance = await safeContract.balances(addr1.address);
      expect(finalBalance).to.equal(0);
    });
  });;
  