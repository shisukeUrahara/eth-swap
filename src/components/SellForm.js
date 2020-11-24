import React,{useState,useEffect} from 'react';
import tokenLogo from '../logos/token-logo.png'
import ethLogo from '../logos/eth-logo.png';
import DropdownElement from './Dropdown';

const SIDE={
    BUY:'BUY',
    SELL:'SELL'
};

function SellForm({web3,ethBalance,tokenBalance,sellTokens,tokens,selectedToken,onSelect}) {

    const [output,setOutput]=useState(0);
    const [order,setOrder]=useState({
        side:SIDE.BUY,
        amount:'',
    });

    const onSubmit=async (e)=>{
        e.preventDefault();


           
            sellTokens(order.amount);

            // setOutput(0);

      
    }

    useEffect(()=>{
        const init=async ()=>{
  
          
        }

        init();

    },[])

    return (
      
  
        <form className="mb-3" onSubmit={(event) =>onSubmit(event)}>
          <div>
            <label className="float-left"><b>Input</b></label>
            <span className="float-right text-muted">
              Balance: {tokenBalance}
            </span>
          </div>
          <div className="input-group mb-4">
            <input
              type="text"

              onChange={({ target: { value }}) => {
                      setOrder(order => ({ ...order, amount: value}))
                     
                     let output=value/100;
                     
                     setOutput(output);


                    }}
            //   onChange={(event) => {
            //     const tokenAmount = this.input.value.toString()
            //     this.setState({
            //       output: tokenAmount / 100
            //     })
            //   }}
              className="form-control form-control-lg"
              placeholder="0"
              required />
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
          <div>
            <label className="float-left"><b>Output</b></label>
            <span className="float-right text-muted">
              Balance: {ethBalance}
            </span>
          </div>
          <div className="input-group mb-2">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="0"
              value={output}
              disabled
            />
            <div className="input-group-append">
              <div className="input-group-text">
                <img src={ethLogo} height='32' alt=""/>
                &nbsp;&nbsp;&nbsp; ETH
              </div>
            </div>
          </div>
          <div className="mb-5">
            <span className="float-left text-muted">Exchange Rate</span>
            <span className="float-right text-muted">100 {selectedToken.ticker} = 1 ETH</span>
          </div>
          <button type="submit" className="btn btn-success btn-block btn-lg">SELL!</button>
        </form>
      );

    }

export default SellForm
