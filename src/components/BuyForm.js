import React,{useState,useEffect} from 'react';
import tokenLogo from '../logos/token-logo.png'
import ethLogo from '../logos/eth-logo.png';
import DropdownElement from './Dropdown';


const SIDE={
    BUY:'BUY',
    SELL:'SELL'
};

function BuyForm({web3,ethBalance,tokenBalance,buyTokens,tokens,selectedToken,onSelect}) {

    const [output,setOutput]=useState(0);
    

    const [order,setOrder]=useState({
        side:SIDE.BUY,
        amount:'',
    });

    const onSubmit=async (e)=>{
        e.preventDefault();



          
           await  buyTokens(order.amount);
          //  setOutput(0);

      
    }

    useEffect(()=>{
        const init=async ()=>{
           


            console.log("**@ LOADING BUY FORM END ");
        }

        init();

    },[])

    return (
     
  
            <form className="mb-3 " onSubmit={e=>onSubmit(e)}>
 
              <div>
                <label className="float-left"><b>Input</b></label>
                <span className="float-right text-muted">
                  Balance: {ethBalance}
                </span>
              </div>
              <div className="input-group mb-4">
                <input
                  type="text"
                  onChange={({ target: { value }}) => {
                      setOrder(order => ({ ...order, amount: value}))
                   
                     let output=value*100;
                     setOutput(output);


                    }}
                //   ref={(input) => { this.input = input }}
                  className="form-control form-control-lg"
                  placeholder="0"
                  required />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <img src={ethLogo} height='32' alt=""/>
                    &nbsp;&nbsp;&nbsp; ETH

                    
                  </div>
                </div>
              </div>
              <div>
                <label className="float-left"><b>Output</b></label>
                <span className="float-right text-muted">
                  Balance: {tokenBalance}
                </span>
              </div>
              <div className="input-group mb-2">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="0"
                  disabled
                  value={output}
                  
                />
                
                <div className="input-group-append">
                  <div className="input-group-text">
                    <img src={tokenLogo} height='32' alt=""/>
                    &nbsp; 

                    <DropdownElement 

           items={tokens.map((token)=>({
                        label:token.ticker,
                        value:token
                    }))}

                    activeItem={
                        {
                            label:selectedToken.ticker,
                            value:selectedToken
                        }
                    }



                    onSelect={onSelect}
                    web3={web3}

                    ></DropdownElement>
                  </div>
                </div>
              </div>
              <div className="mb-5">
                <span className="float-left text-muted">Exchange Rate</span>
                  <span className="float-right text-muted">1 ETH = 100 {selectedToken.ticker}</span>
              </div>
              <button type="submit" className="btn btn-primary btn-block btn-lg">BUY!</button>
            </form>
  
          
      );

    }

export default BuyForm
