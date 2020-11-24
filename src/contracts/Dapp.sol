pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;


import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol';


contract Dapp is ERC20 ,ERC20Detailed{
    constructor () ERC20Detailed('DAPP','DAPP TOKEN',18) public {}
    
    function faucet(address to, uint amount) external {
    _mint(to, amount);
  }
  
}