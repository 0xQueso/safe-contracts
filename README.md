# Safe Contract

The `Safe` contract is a solidity smart contract that provides a simple and secure way to deposit and withdraw ERC20 tokens.

## Features

- **Deposit Tokens**: Users can deposit ERC20 tokens into the contract.
- **Withdraw Tokens**: Users can withdraw deposited tokens from the contract.
- **Owner Management**: The contract owner can manage the ERC20 token address.

## Setup

1. **Install Dependencies**: Ensure you have Node.js and npm installed. Run `npm install` to install project dependencies.
   
2. **Configure ERC20 Token Address**: Update the `tokenAddress` parameter in the contract constructor with the address of the desired ERC20 token.
   
3. **Deploy Contract**: Deploy the `Safe` contract to your desired Ethereum network using a tool like Remix, Truffle, or Hardhat.

## Usage

1. **Deposit Tokens**: Call the `depositTokens` function with the desired amount of tokens to deposit.
   
2. **Withdraw Tokens**: Call the `withdrawTokens` function with the desired amount of tokens to withdraw.
   
3. **Manage Token Address**: The contract owner can update the ERC20 token address using the `setTokenAddress` function.

## Testing

- Ensure to thoroughly test the contract functionalities before deploying to a production environment.
- Use tools like Truffle, Hardhat, or Remix for testing and deployment.

## Security

- The contract includes the OpenZeppelin ReentrancyGuard to prevent reentrancy attacks.
- Follow best practices for smart contract development and auditing to ensure security.

## MORE INFO

- Mock token address:  0xEdcC3aF7B1F50F093d14b6156aFC3AdC02Fb8cAD
- Safe contract address:  0x3ae5f89c9C948B3802d7E0C1D1993fF7D56b2BB6

To proceed with testing, deployment and verification:

```shell
npx hardhat test test/SafeTest.js
npx hardhat run scripts/deploy.js
npx hardhat verify --network sepolia [contractAddress] [constructors]
```
