const HandleChainchange= async(setWeb3state)=>{
    const hexChainId = await window.ethereum.request({ 
    method: "eth_chainId" 

  });
  const chainId = parseInt(hexChainId, 16);
   setWeb3state((prevState)=>({...prevState,chainId}));
}
export default HandleChainchange;