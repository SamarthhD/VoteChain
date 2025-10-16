import { useEffect, useState } from "react";
import Web3context from "./Web3context";
import GetWeb3state from "../utils/GetWeb3state";
import HandleAccountchange from "../utils/HandleAccountchange";
import HandleChainchange from "../utils/HandleChainchange";
import Wallet from "../components/wallet/Wallet";
const Web3provider=({children})=>{
const [web3state,setWeb3state]=useState({
    contractInstance:null,
    selectedAccount:null,
    chainId:null
})

const handleWallet= async()=>{
    try{
    const{contractInstance,selectedAccount,chainId}= await GetWeb3state();//get wallet data from the function
    setWeb3state({contractInstance,selectedAccount,chainId});//set state
    console.log("Wallet connected:", selectedAccount, chainId);
    
    }
    catch(error){
        console.error(error);
    }
}
 const handleAccountsChanged = () => HandleAccountchange(setWeb3state);
 //pass setweb3state as args  in both as both components use it
  const handleChainChanged = () => HandleChainchange(setWeb3state);

useEffect(()=>{
//event listeners for when the user switches accounts or chains/network in MetaMask
    window.ethereum.on('accountsChanged',handleAccountsChanged);
    window.ethereum.on('chainChanged',handleChainChanged);
return()=>{
    //Cleanup function, runs when component unmounts (or before effect re-runs)
    // Removes the listeners to prevent duplicate calls or memory leaks
     window.ethereum.removeListener('accountsChanged',handleAccountsChanged);
    window.ethereum.removeListener('chainChanged',handleChainChanged);
}
},[])
return(
    <>
    <Web3context.Provider value={{web3state,handleWallet}}> 
        {/* pass data ie. web3state to children from web3context */}
        {/* in app.jsx Web3provider's children will get the data */}
        {children}
     </Web3context.Provider>
   
    </>
)
}
export default Web3provider;