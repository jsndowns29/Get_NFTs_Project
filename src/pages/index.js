import React, { useState} from "react"
import Navbar from "../components/navbar.js"
import AddWallet from "../components/add_wallet.js"
import CollectionGrid from "../components/collection_grid.js"
import {settings} from "../settings/settings"
import '../style.css' 

export default function Home() {

  const [address, setAddress] = useState("");
  let grid;

  //Wallet address containing LearnWeb3DAO and Build Space NFTs for testing
  //const walletAddress = "0x72A69e7dAb96e415A42b4fa841DbAA899Ab780F6";

  //get settings from settings file
  const apiUrl = settings.apiUrl;
  const contractAddresses = settings.contractAddresses;
  const collectionNames = settings.collectionNames;

  //sets address state, function is passed to and called from AddWallet component
  const handleAddress = (address) => {
    setAddress(address);
  }
  
  //display NFTs in a grid only if wallet address is defined  
  if (address !== ""){
      grid = <div>
        {/*create collection grid for each collection contract address provided in the settings file*/}            {contractAddresses.map((contractAddress, i)=>{
          return <CollectionGrid walletAddress={address} collectionName={collectionNames[i]} contractAddress={contractAddress} apiUrl={apiUrl} />
        })}
      </div>
    }else{
      grid = <div/>
    }
    
  return <div id="default ">
    <Navbar />
    <div  className="account-text tile-text-main-mobile">Account: {address}</div>
    <AddWallet handleAddress={handleAddress} />
    {grid}
  </div>
}
