// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockToken is ERC20 {
    constructor(address _testAddress) ERC20("MOCKTOKEN", "MT") {
        _mint(_testAddress, 1 ether);
    }
}