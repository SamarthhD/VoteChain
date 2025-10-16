import { useEffect } from "react";
import useWeb3context from "../../context/useWeb3context";
import { useNavigate } from "react-router-dom";

const Wallet = () => {
  const { handleWallet, web3state } = useWeb3context();
  const { selectedAccount } = web3state;
//   const navigateTo = useNavigate();

//   useEffect(() => {
//     if (selectedAccount) {
//       navigateTo("/registerCandidate");
//     }
//   }, [selectedAccount, navigateTo]);

  return (
    <button
      onClick={handleWallet}
      className="px-7 py-3 min-w-fit text-lg font-bold text-white bg-gradient-to-r from-purple-600 to-purple-500 border-2 border-purple-600 rounded-lg m-2 shadow-lg shadow-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/70 hover:-translate-y-1 transition-all duration-300 active:translate-y-0"
    >
      connect wallet
    </button>
  );
};

export default Wallet;
