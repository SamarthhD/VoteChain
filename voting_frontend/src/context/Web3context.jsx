import { createContext } from "react";
 const Web3context=createContext();
 export default Web3context;
 //substitute for usecontext(web3context) in each component
 //useContext(Web3context) allows you to consume 
 // whatever values are provided by the Web3context.Provider.