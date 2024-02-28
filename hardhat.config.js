require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url:'https://base-sepolia.g.alchemy.com/v2/166vjm5di5J7OZX4f83EowfgrB0vpS5K',
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: process.env.SEPOLIA_KEY ,
    customChains: [
      {
        network: "sepolia",
        chainId: 84532,
        urls: {
          apiURL: "https://api-sepolia.basescan.org/api",
          browserURL: "https://base-sepolia.blockscout.com"
        }
      }
    ]
  },     
  sourcify: {
    enabled: false
  }
};
