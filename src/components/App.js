import React, {useEffect,useState, Component } from 'react';
import logo from '../logo.png';
import './App.css';
import Web3 from 'web3';
import {getWeb3,getContracts} from './utils';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar.js';
import Main from './Main.js';



function App ({web3,contracts,accounts}) {

 
  const [tokens,setTokens]=useState([]);
  const [selectedToken,setSelectedToken]=useState(undefined);
  const [selectedTokenBalance,setSelectedTokenBalance]=useState(0);
  const [ethBalance,setEthBalance]=useState(0);
  const [selectedAccount,setSelectedAccount]=useState(accounts[0]);
  const [loading,setLoading]=useState(false);
  const [tokenBalance,setTokenBalance]=useState(0);
  const [user,setUser]=useState({
    accounts:[],
    selectedToken:undefined,
    balances:{
      ethBalance:0,
      tokenBalance:0
    }

  });

  const selectToken= async (token)=>{
    setSelectedToken(token);
    
    let currentTokenBalance=await getBalances(selectedAccount,token);

    setSelectedTokenBalance(currentTokenBalance);

  }

  const buyTokens=async (amount)=>{
 let ethAmount=web3.utils.toWei(amount,"ether");

 let ticker=web3.utils.fromAscii(selectedToken.ticker);
 let paddedTicker =web3.utils.padRight(ticker,64);

 const nonce=await web3.eth.getTransactionCount(selectedAccount);


 await contracts.ethswap.methods.buyTokens(paddedTicker).send({from:selectedAccount.toLowerCase(),value:ethAmount},(err,data)=>{
   if(err){
  console.log("**@ the error in buying tokens is , ",err);
   }
   else{
   console.log("**@ the buy tokens is successfull , data is , ",data);

   }
 })


 let updatedWeiBalance= await web3.eth.getBalance(selectedAccount);
 let updatedEthBalance= web3.utils.fromWei(updatedWeiBalance,"ether");

 setEthBalance(updatedEthBalance);



 let updatedWeiTokenBalance= await contracts[selectedToken.ticker].methods.balanceOf(selectedAccount).call()
 let updatedEthTokenBalance = web3.utils.fromWei(updatedWeiTokenBalance,"ether");

 setTokenBalance(updatedEthTokenBalance);


  }


  const sellTokens=async (tokenAmount)=>{

    let ethTokenAmount=web3.utils.toWei(tokenAmount,"ether");
    
   
    let ticker=web3.utils.fromAscii(selectedToken.ticker);
// user must approve the tokens to be spent by the exchange;


await contracts[selectedToken.ticker].methods.approve(contracts.ethswap.address,ethTokenAmount).send({from:selectedAccount})

   let result= await contracts.ethswap.methods.sellTokens(ticker,ethTokenAmount).send({from:selectedAccount});


     let updatedWeiBalance= await web3.eth.getBalance(selectedAccount);
     let updatedEthBalance= web3.utils.fromWei(updatedWeiBalance,"ether");
    
     setEthBalance(updatedEthBalance);
    
    
    
    
     let updatedWeiTokenBalance= await contracts[selectedToken.ticker].methods.balanceOf(selectedAccount).call()
     let updatedEthTokenBalance = web3.utils.fromWei(updatedWeiTokenBalance,"ether");
    
     setTokenBalance(updatedEthTokenBalance);

     
  }

  

  const getBalances=async function(account,token){
    // get the dex token balance for given token
    // const tokenDex=await contracts.ethswap.methods.traderBalances(account,web3.utils.fromAscii(token.ticker)).call();

    // get the user wallet token balance for that particular token
    let tempTokenBalance=await contracts[token.ticker].methods.balanceOf(account).call();
    // Component.log("**@ tempTokenBalance is , ",tempTokenBalance);
    // console.log("**@ type of temp token balance is , ", typeof tempTokenBalance);

    const tokenBalance= await web3.utils.fromWei(tempTokenBalance.toString(),"ether");
    // console.log("**@ tokenBalnce converted is , ",tokenBalance);
    // console.log("**@ type of token balance converted is ,",typeof tokenBalance);

    const ethBalance=await web3.utils.fromWei(await web3.eth.getBalance(account),"ether");
    // console.log("**@ token balance is , ",tokenBalance);
    // console.log("**@ eth Balance is ,",ethBalance);
    setTokenBalance(tokenBalance);

    return {ethBalance,tokenBalance};
  }

  const isLoading=async ()=>{
    let result= (
      typeof web3!=='undefined' &&
      accounts.length>0 &&
      typeof contracts!== 'undefined' 
    
   );


   return result;
  }


  useEffect (()=>{
   const init= async function(){
     let content;

    // const loading= isLoading();
    // setLoading(loading);

  
   
 
    const selectedAccount=accounts[0];
    setSelectedAccount(selectedAccount);

    const ethBalance=web3.utils.fromWei(await web3.eth.getBalance(selectedAccount),"ether");
    setEthBalance(ethBalance);



    


    const rawTokens=await contracts.ethswap.methods.listTokens().call();
    const tokens= await rawTokens.map((token)=>({
      ...token,
      ticker:web3.utils.hexToUtf8(token.ticker)
    }));

     
    
     setTokens(tokens);

     const selectedToken=tokens[0];
     setSelectedToken(selectedToken);




    const selectedTokenBalance=await getBalances(selectedAccount,selectedToken);
     

    const balances=await getBalances(selectedAccount,selectedToken) ;

    setTokens(tokens);
 
    
    

  
   };

   

   init();
 

  },[accounts[0]]);


  


  

  
    return (
      <div>
        <Navbar account={selectedAccount}></Navbar>
       
        <div className="container-fluid mt-5 ">
          <div className="row">
            <main role="main" className="col-lg-12  ml-auto mr-auto " style={{maxWidth:'600px'}}>
              <div className="content mr-auto ml-auto">
                <a
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                </a>


             {
               !isLoading?(
               <p id="loader" className="text-center">Loading...</p>
               ):(
                <Main 
                web3={web3}
                 ethBalance={ethBalance} 
                 tokenBalance={tokenBalance} 
                 buyTokens={buyTokens} 
                 sellTokens={sellTokens} 
                 tokens={tokens}
                 selectedToken={selectedToken}
                 selectedTokenBalance={selectedTokenBalance}
                 onSelect={selectToken}
                 
                 />
               )
             }               
               
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  
}

export default App;
