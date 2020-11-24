import React,{useState,useEffect} from 'react';
import tokenLogo from '../logos/token-logo.png'
import ethLogo from '../logos/eth-logo.png';
import Dropdown from './Dropdown';
import BuyForm from './BuyForm';
import SellForm from './SellForm';

const SIDE={
    BUY:'BUY',
    SELL:'SELL'
};

function Main({web3,ethBalance,tokenBalance,buyTokens,sellTokens,tokens,selectedToken,onSelect}){

    const [output,setOutput]=useState(0);
    const [currentForm,setCurrentForm]=useState(SIDE.BUY);

    useEffect(()=>{
        const init=async ()=>{
          // const tokens=tokens;
          // const selectedToken=selectedToken;
          // const onSelect=onSelect;

         



            console.log("*@  LOADING MAIN COMPONENT END .....");


            const currentForm=SIDE.BUY;

            setCurrentForm(currentForm);
        }

        init();

    },[])

    return (
         <div>


           {
             (tokens.length>0 && typeof selectedToken!=='undefined')?(
              <div id="content" className="mt-3">

          
<div className="d-flex justify-content-between mb-3">
  <button
      className="btn  btn-primary"
      onClick={(event) => {
        setCurrentForm(SIDE.BUY);
      }}
    >
    Buy
  </button>
  <span className="text-muted">&lt; &nbsp; &gt;</span>
  <button
      className="btn  btn-success"
      onClick={(event) => {
        setCurrentForm(SIDE.SELL);
      }}
    >
    Sell
  </button>

 
</div>

  <div className="card mb-4" >

    <div className="card-body">

      {
        currentForm===SIDE.BUY? (
          
     <BuyForm 
     web3={web3}
     ethBalance={ethBalance}
     tokenBalance={tokenBalance}
     buyTokens={buyTokens}
     tokens={tokens}
     selectedToken={selectedToken}
     onSelect={onSelect}
     
     >

     </BuyForm>

        ): (
          <SellForm
     web3={web3}
     ethBalance={ethBalance}
     tokenBalance={tokenBalance}
     sellTokens={sellTokens}
     tokens={tokens}
     selectedToken={selectedToken}
     onSelect={onSelect}
     
     >

     </SellForm>
        )

      }




    

    </div>

  </div>

</div>
             ):null
           }
         </div>
      );

    }

export default Main
