import Web3 from 'web3';
import ERC20ABI from './ERC20ABI.json';
import ethSwapJson from '../abis/EthSwap.json';


const getWeb3 = async () => {
  // const provider = new Web3.providers.HttpProvider(
  //   "http://localhost:9545"
  // );
  // return new Web3(provider);
  return new Promise((resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener("load", async () => {
      // Modern dapp browsers...
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          await window.ethereum.enable();
          // Acccounts now exposed
          resolve(web3);
        } catch (error) {
          reject(error);
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        // Use Mist/MetaMask's provider.
        const web3 = window.web3;
        console.log("Injected web3 detected.");
        resolve(web3);
      }
      // Fallback to localhost; use dev console port by default...
      else {
        const provider = new Web3.providers.HttpProvider(
          "http://localhost:9545"
        );
        const web3 = new Web3(provider);
        console.log("No web3 instance injected, using Local web3.");
        resolve(web3);
      }
    });
  });
};

const getContracts =async (web3)=>{

   

  
      // Load Token
    const networkId =  await web3.eth.net.getId();
    const ethSwapNetwork = ethSwapJson.networks[networkId];

    const ethswap= new web3.eth.Contract(ethSwapJson.abi,ethSwapNetwork.address);
    ethswap.address=ethSwapNetwork.address;

    
      // const token = new web3.eth.Contract(ERC20ABI, tokenData.address)
      // this.setState({ token })
      // let tokenBalance = await token.methods.balanceOf(this.state.account).call()
      // this.setState({ tokenBalance: tokenBalance.toString() });
      const tokens=await ethswap.methods.listTokens().call().then((result)=>{
        return result;
      })
      .catch((err)=>{
        return err;
      })

  const tokenContracts=tokens.reduce((acc,token)=>({
   ...acc,
   [web3.utils.hexToUtf8(token.ticker)]:new web3.eth.Contract(
     ERC20ABI,
     token.tokenAddress
   )
  }),{});

 

      return ({ethswap,...tokenContracts});
  }

export { getWeb3,getContracts };