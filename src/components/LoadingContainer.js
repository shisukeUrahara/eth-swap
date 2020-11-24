import React,{useState,useEffect} from 'react';
import {getWeb3,getContracts} from './utils.js';
import App from './App.js';
import 'bootstrap/dist/css/bootstrap.min.css';


function LoadingContainer() {
    // states
    const [web3,setWeb3]=useState(undefined);
    const [accounts,setAccounts]=useState([]);
    const [contracts,setContracts]=useState(undefined);

    useEffect (()=>{
     const init= async function(){
      const web3=await getWeb3();
      const contracts=await getContracts(web3);
       const accounts=await web3.eth.getAccounts();

      


       setWeb3(web3);
       setContracts(contracts);
       setAccounts(accounts);

       setInterval( async ()=> {

        let newAccounts=await web3.eth.getAccounts();
        // console.log("**@ new account is , ",newAccounts);
        // console.log("**@ old account is , ",accounts);
    
        if (newAccounts[0] !== accounts[0]) {
          
    
          accounts[0] = newAccounts[0];
        setAccounts(newAccounts);
    
    
        }
        
      }, 300);





// accountInterval();

     };

     init();

     

    },[]);

    const isReady= function(){
        return (
            typeof web3!=='undefined' &&
            accounts.length>0 &&
            typeof contracts!== 'undefined'
        )
    }

    if(!isReady()){
    return (
        <div>Loading .....</div>
    )
    }


    return (
        <App web3={web3} contracts={contracts} accounts={accounts}></App>
    )
    
}

export default LoadingContainer
