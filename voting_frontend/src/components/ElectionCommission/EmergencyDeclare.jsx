import { useState } from "react";
import useWeb3context from "../../context/useWeb3context";

const EmergencyDeclare = () => {
  const { web3state } = useWeb3context();
  const { contractInstance } = web3state;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleEmergencyStop = async () => {
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      if (!contractInstance) {
        setError("Contract instance not available");
        setLoading(false);
        return;
      }

      await contractInstance.emergencyStopVoting();
      setSuccess("Voting has been stopped successfully!");
      console.log("Emergency stop executed");
    } catch (error) {
      setError(error.message || "Failed to stop voting");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Warning Section */}
      <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-lg">
        <h2 className="text-2xl font-bold text-red-400 mb-3">Emergency Stop</h2>
        <p className="text-gray-200 mb-4">
          Use this function only in critical situations. Clicking the button below will immediately stop all voting.
        </p>
        <p className="text-gray-300 text-sm">
          <span className="text-red-300 font-semibold">Warning:</span> This action cannot be undone during the current voting period.
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200">
          {error}
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-200">
          {success}
        </div>
      )}

      {/* Emergency Stop Button */}
      <button
        onClick={handleEmergencyStop}
        disabled={loading || !contractInstance}
        className="w-full py-3 px-6 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white font-bold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl text-lg"
      >
        {loading ? "Stopping..." : "⚠️ EMERGENCY STOP VOTING"}
      </button>

      {/* Info Box */}
      <div className="p-4 bg-gray-800/30 border border-primary/20 rounded-lg">
        <p className="text-gray-300 text-sm">
          Only the Election Commission can execute this action.
        </p>
      </div>
    </div>
  );
};

export default EmergencyDeclare;