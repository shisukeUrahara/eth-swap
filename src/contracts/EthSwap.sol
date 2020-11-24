pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';


contract EthSwap {
  string public name = "EthSwap Instant Exchange";
  address public owner;
  uint public rate = 100;
      // collection of tokens
    mapping(bytes32=>Token) public tokens;

    // a struct to represent erc20  tokens
    struct Token{
        bytes32 ticker;
        address tokenAddress;
    }
      // a list of tokens which we can iterate through
    Token[] public tokenList;


  event TokensPurchased(
    address account,
    address token,
    uint amount,
    uint rate
  );

  event TokensSold(
    address account,
    address token,
    uint amount,
    uint rate
  );

  constructor() public {
    owner=msg.sender;
    // token = _token;
    // ad this token to the token list
   

  } 

  // modifiers
 modifier onlyAdmin() {
        require(msg.sender==owner,'Only Admin Allowed');
        _;
    }


    function buyTokens(bytes32 _token) public payable {
    // Calculate the number of tokens to buy
    uint tokenAmount = msg.value * rate;
    bytes32 ticker= bytes32(_token);
    address  currentTokenAddress=tokens[ticker].tokenAddress;

    // Require that EthSwap has enough tokens
    require(IERC20(currentTokenAddress).balanceOf(address(this)) >= tokenAmount,'INSUFFICIENT TOKENS IN CONTRACT');

    // Transfer tokens to the user
    // token.transfer(msg.sender, tokenAmount);

     IERC20(currentTokenAddress).transfer(
            msg.sender,
            tokenAmount
            );

    // Emit an event
    emit TokensPurchased(msg.sender, currentTokenAddress, tokenAmount, rate);
  }
    

  // function buyTokens(bytes32 _token) public payable {
  //   // Calculate the number of tokens to buy
  //   uint tokenAmount = msg.value * rate;
  //   address  currentTokenAddress=tokens[_token].tokenAddress;

  //   // Require that EthSwap has enough tokens
  //   require(IERC20(currentTokenAddress).balanceOf(address(this)) >= tokenAmount,'INSUFFICIENT TOKENS IN CONTRACT');

  //   // Transfer tokens to the user
  //   // token.transfer(msg.sender, tokenAmount);

  //    IERC20(currentTokenAddress).transfer(
  //           msg.sender,
  //           tokenAmount
  //           );

  //   // Emit an event
  //   emit TokensPurchased(msg.sender, currentTokenAddress, tokenAmount, rate);
  // }

  function sellTokens(bytes32 _token,uint _amount) public {
    address  currentTokenAddress=tokens[_token].tokenAddress;
    // User can't sell more tokens than they have
    require(IERC20(currentTokenAddress).balanceOf(msg.sender) >= _amount);

    // Calculate the amount of Ether to redeem
    uint etherAmount = _amount / rate;

    // Require that EthSwap has enough Ether
    require(address(this).balance >= etherAmount);

    // Perform sale
    // token.transferFrom(msg.sender, address(this), _amount);
    IERC20(currentTokenAddress).transferFrom(msg.sender,address(this),_amount);

    msg.sender.transfer(etherAmount);

    // Emit an event
    emit TokensSold(msg.sender, currentTokenAddress, _amount, rate);
  }


  // a function to add tokens to the dex
    function addToken(bytes32 _ticker ,address _tokenAddress) onlyAdmin()  external  {
        // add the new token to the mapping 
        
        tokens[_ticker]=Token({
                               ticker:_ticker,
                            tokenAddress: _tokenAddress
                              });
                              
        // add token to the token list
        tokenList.push(Token({
                               ticker:_ticker,
                            tokenAddress: _tokenAddress
                              }));
                              
    }

    // a function to list tokens
    function listTokens() public view returns (Token[] memory){
      return tokenList;
    }



}