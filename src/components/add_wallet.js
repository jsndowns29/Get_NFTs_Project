import React, {useState} from "react"
import '../style.css' 

export default function AddWallet({handleAddress}) {
    
   const [value, setValue] = useState("");

   //ethereum address regex expression
   let ethereumRegex = "^0x[0-9a-fA-F]{40}$";

   //Connect wallet button functions
   const connectWallet = async() =>{
        //check if wallet is installed
        if(typeof window.ethereum !== 'undefined'){
            const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});

            if (new RegExp(ethereumRegex).test(accounts[0])) {
                handleAddress(accounts[0]);
            }
            
        }
        else{
            alert("MetaMask not installed! Get Metamask now: https://metamask.io/download/");
        }
   }
   
    //Enter address form functions
    const handleChange = (event) =>{
        setValue(event.target.value);
    }

    const handleSubmit = (event) =>{
        //use regex to check if user entered valid ethereum address
        if (new RegExp(ethereumRegex).test(value)) {
            handleAddress(value);
        } else {
            alert("Invalid address!")
        }
        event.preventDefault();
    }

  return <div>
    <h2 className="wallet-text-main tile-text-main-mobile">Connect to your wallet</h2>
    <div style={{marginTop: "3%"}}  className="sameLine center">
        <button onClick={connectWallet} className="connect-button">
            Connect Wallet
        </button>  
        
        <form id="wallet-form" onSubmit={handleSubmit}>
        <label>
            <input type="text" size="50" placeholder={"Enter your wallet address"} value={value} onChange={handleChange} />
        </label>
        <input id="submit" type="submit" value="  &#8594;  " />
        </form>
    </div>

  </div>
}