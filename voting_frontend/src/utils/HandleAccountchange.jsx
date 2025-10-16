import GetWeb3state from "./GetWeb3state"
const HandleAccountchange= async(setWeb3state)=>{
const accounts = await window.ethereum.request(
    { 
        method: "eth_requestAccounts" 

    });
  const selectedAccount = accounts[0];
  setWeb3state((prevState)=>({...prevState,selectedAccount}));
}
export default HandleAccountchange;