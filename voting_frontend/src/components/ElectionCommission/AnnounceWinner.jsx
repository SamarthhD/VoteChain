import { useState } from "react";
import useWeb3context from "../../context/useWeb3context";
import DisplayWinner from "./DisplayWinner";

const AnnounceWinner = () => {
  const { web3state } = useWeb3context();
  const { contractInstance } = web3state;
  const [winner, setWinner] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchWinner = async () => {
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      if (!contractInstance) {
        setError("Contract instance not available");
        setLoading(false);
        return;
      }

      const winnerAddress = await contractInstance.winner();
      setWinner(winnerAddress);
      console.log("Winner address:", winnerAddress);
      
      if (winnerAddress && winnerAddress !== "0x0000000000000000000000000000000000000000") {
        setSuccess("Winner announced successfully!");
      } else {
        setSuccess("No winner declared yet (Tie or voting not ended)");
      }
    } catch (error) {
      setError(error.message || "Failed to announce winner");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Content */}
      <div className="bg-gray-800/40 border border-primary/20 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-6">Announce Winner</h2>

        <p className="text-gray-200 mb-6">
          Click the button below to announce the election winner based on vote count.
        </p>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200">
            {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-200">
            {success}
          </div>
        )}

        {/* Button */}
        <button
          onClick={() => contractInstance && fetchWinner()}
          disabled={loading || !contractInstance}
          className="w-full py-3 px-6 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/80 hover:to-blue-600/80 disabled:from-gray-600 disabled:to-gray-600 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-primary/50 hover:shadow-xl hover:shadow-primary/70"
        >
          {loading ? "Announcing..." : "Announce Winner"}
        </button>
      </div>

      {/* Display Winner Component */}
      {winner && (
        <div className="bg-gray-800/40 border border-primary/20 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Election Result</h2>
          <DisplayWinner Winner={winner} />
        </div>
      )}
    </div>
  );
};

export default AnnounceWinner;