import { useEffect, useState } from "react";
import useWeb3context from "../../context/useWeb3context";

const VotingStatus = () => {
  const { web3state } = useWeb3context();
  const { contractInstance } = web3state;
  const [votingStatus, setVotingStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVotingStatus = async () => {
      setLoading(true);
      setError("");
      try {
        if (!contractInstance) {
          setError("Contract instance not available");
          setLoading(false);
          return;
        }

        const status = await contractInstance.getVotingStatus();
        
        // Convert status to readable format
        const statusMap = {
          0: "Not Started",
          1: "In Progress",
          2: "Ended"
        };
        
        const statusText = statusMap[parseInt(status)] || "Unknown";
        setVotingStatus(statusText);
        console.log("Voting status:", statusText);
      } catch (error) {
        setError("Failed to fetch voting status");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (contractInstance) {
      fetchVotingStatus();
    }
  }, [contractInstance]);

  // Determine color based on status
  const getStatusColor = () => {
    switch (votingStatus) {
      case "Not Started":
        return "text-yellow-300 bg-yellow-500/10 border-yellow-500/30";
      case "In Progress":
        return "text-green-300 bg-green-500/10 border-green-500/30";
      case "Ended":
        return "text-red-300 bg-red-500/10 border-red-500/30";
      default:
        return "text-gray-300 bg-gray-500/10 border-gray-500/30";
    }
  };

  const getStatusEmoji = () => {
    switch (votingStatus) {
      case "Not Started":
        return "⏳";
      case "In Progress":
        return "🗳️";
      case "Ended":
        return "✅";
      default:
        return "❓";
    }
  };

  return (
    <div className="space-y-6">
      {/* Status Card */}
      <div className={`p-8 rounded-lg border-2 ${getStatusColor()}`}>
        <div className="text-center">
          <div className="text-5xl mb-3">{getStatusEmoji()}</div>
          <h2 className="text-2xl font-bold text-white mb-2">Current Voting Status</h2>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
          <div className="flex items-center justify-center gap-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-400"></div>
            <p className="text-blue-300">Loading status...</p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200">
          {error}
        </div>
      )}

      {/* Status Display */}
      {votingStatus && !loading && (
        <div className="p-6 bg-gray-800/40 border border-primary/20 rounded-lg">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-300 font-medium">Status:</span>
              <span className={`px-4 py-2 rounded-full font-bold ${
                votingStatus === "Not Started"
                  ? "bg-yellow-500/20 text-yellow-300"
                  : votingStatus === "In Progress"
                  ? "bg-green-500/20 text-green-300"
                  : "bg-red-500/20 text-red-300"
              }`}>
                {votingStatus}
              </span>
            </div>

            {/* Status Info */}
            <div className="p-3 bg-gray-900/50 rounded border border-primary/10">
              <p className="text-gray-200 text-sm">
                {votingStatus === "Not Started" && "Voting has not started yet. Please wait for the voting period to begin."}
                {votingStatus === "In Progress" && "Voting is currently active. Voters can cast their votes now."}
                {votingStatus === "Ended" && "Voting period has ended. No more votes can be cast."}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* No Status Yet */}
      {!votingStatus && !loading && !error && (
        <div className="p-6 bg-gray-800/40 border border-primary/20 rounded-lg text-center">
          <p className="text-gray-300">Unable to determine voting status</p>
        </div>
      )}
    </div>
  );
};

export default VotingStatus;