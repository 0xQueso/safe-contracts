// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Safe is Ownable, ReentrancyGuard {
    // Address of the ERC20 token
    address public tokenAddress;
    // Mapping to store user balances
    mapping(address => uint256) public balances;

    // Events to track token deposits and withdrawals
    event TokensDeposited(address indexed user, uint256 amount);
    event TokensWithdrawn(address indexed user, uint256 amount);

    // Constructor to initialize the token address
    constructor(address _tokenAddress) Ownable(msg.sender) {
        tokenAddress = _tokenAddress;
    }

    // Function to deposit tokens into the contract
    function depositTokens(uint256 _amount) external nonReentrant {
        // Ensure amount is greater than zero
        require(_amount > 0, "Amount must be greater than zero");

        // Get the ERC20 token instance
        IERC20 token = IERC20(tokenAddress);
        // Check allowance of sender to this contract
        uint256 allowance = token.allowance(msg.sender, address(this));
        require(allowance >= _amount, "Allowance too low");

        // Transfer tokens from sender to this contract
        require(token.transferFrom(msg.sender, address(this), _amount), "Token transfer failed");

        // Update sender's balance
        balances[msg.sender] += _amount;
        // Emit event for token deposit
        emit TokensDeposited(msg.sender, _amount);
    }

    // Function to withdraw tokens from the contract
    function withdrawTokens(uint256 _amount) external nonReentrant {
        // Ensure amount is greater than zero
        require(_amount > 0, "Amount must be greater than zero");
        // Ensure sender has sufficient balance
        require(balances[msg.sender] >= _amount, "Insufficient balance");

        // Get the ERC20 token instance
        IERC20 token = IERC20(tokenAddress);
        // Transfer tokens from this contract to sender
        require(token.transfer(msg.sender, _amount), "Token transfer failed");

        // Update sender's balance
        balances[msg.sender] -= _amount;
        // Emit event for token withdrawal
        emit TokensWithdrawn(msg.sender, _amount);
    }

    // Function to get the balance of the contract
    function contractBalance() external view returns (uint256) {
        // Get the ERC20 token instance
        IERC20 token = IERC20(tokenAddress);
        // Return balance of this contract
        return token.balanceOf(address(this));
    }

    // Function to set the token address (onlyOwner)
    function setTokenAddress(address _tokenAddress) external onlyOwner {
        // Ensure valid token address
        require(_tokenAddress != address(0), "Invalid token address");
        // Set the new token address
        tokenAddress = _tokenAddress;
    }
}