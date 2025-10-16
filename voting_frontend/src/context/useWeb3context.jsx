import { useContext } from "react";
import  Web3context  from "./Web3context";

const useWeb3context=()=>{
    return useContext(Web3context);
}
export default useWeb3context;