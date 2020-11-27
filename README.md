ETH SWAP APPLICATION

(I) DESCRIPTION 

Its a simple eth-swap application. User spends eth and gets erc20 token of his choice. The conversion rate is fixed. For 1 ETH sent to the application 
, user gets 100 ERC20 tokens in return. By default application has 2 tokens DAPP token and BAT token. New tokens  can be added to the application.

(II) TECH STACKS/TOOLS USED

(i) Javascript
(ii) Reactjs
(iii) Ethereum 
(iv) Solidity
(v) Truffle 
(vi) Web3 js

(III) Setting up the project

(i) Clone the repo 
> git clone <repo url>
  
(ii) Go to the project root directory

(iii) Start the local truffle network
> truffle develop

(iv) Deploy the contracts on local network . In the truffle console you get after running truffle develop
> migrate --reset 

(v) start the project
 Open one more terminal and run the following 
 NOTE:- please have metamask plugin installed in your browser.
 
 > npm run start
 
 This will start the app in your browser at http://localhost:3000
 
 ICreate a custom network in metamask and import truffle local newtwork accounts to metamask using the seed phrase when you run truffle develop.
 Connect the browser application to the local truffle  network imported . You will be able to run the application and spend your ethers to get DAPP or BAT tokens.
 
