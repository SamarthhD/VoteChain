import { BrowserProvider, Contract } from "ethers";
import abi from "../constants/abi.json";
import axios from "axios";

const GetWeb3state = async () => {
  // check if Metamask (or any wallet) is injected in the browser
  if (!window.ethereum) throw new Error("Metamask not installed");

  // prompt user to connect their wallet (returns an array of addresses)
  const accounts = await window.ethereum.request({ 
    method: "eth_requestAccounts" 
  });

  // pick the first connected account (primary account)
  const selectedAccount = accounts[0];

  // get the current chain/network ID in hex (e.g., "0x1" for Ethereum mainnet)
  const hexChainId = await window.ethereum.request({ 
    method: "eth_chainId" 
  });

  // convert chainId from hex string to decimal (e.g., "0x1" -> 1)
  const chainId = parseInt(hexChainId, 16);

  // wrap window.ethereum in an ethers.js BrowserProvider to interact with blockchain
  const provider = new BrowserProvider(window.ethereum);

  // get a signer linked to the selected account (do NOT pass selectedAccount)
  const signer = await provider.getSigner();

  // deployed contract’s address
  const contractAddress = "0x8cff38a317ab51fbdeeff507e48b03d318d74cea";

  // create a contract instance using address, abi, and signer
  const contractInstance = new Contract(contractAddress, abi, signer);

  // message to sign
  const message = "welcome to the voting dapp.Please accept the terms and conditions";

  // signer signs the message
  const signature = await signer.signMessage(message);

  // Wrap in an object
  const datasign = { signature };

  console.log(selectedAccount);

  // send signature to backend
  const res = await axios.post(
    `http://localhost:3000/api/authentication/${selectedAccount}`,
    datasign
  );
  localStorage.setItem("token",res.data.token);

  return { contractInstance, selectedAccount, chainId };
};

export default GetWeb3state;
//0xfd2f5d6adb641a011dd44bce206db0cc58d27d3d28d53273bff159b2b05a9fa26ce4760255ad17ca90479e9c4e4e2c196eec88fe79d6db50e20408e19baf65f41c