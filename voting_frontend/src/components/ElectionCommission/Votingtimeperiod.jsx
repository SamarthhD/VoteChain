import { useRef, useState } from "react";
import useWeb3context from "../../context/useWeb3context";

const VotingtimePeriod = () => {
  const { web3state } = useWeb3context();
  const { contractInstance } = web3state;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const startRef = useRef(null);
  const endRef = useRef(null);

  const handleVotingTime = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      if (!contractInstance) {
        setError("Contract instance not available");
        setLoading(false);
        return;
      }

      const start = startRef.current.value.trim();
      const end = endRef.current.value.trim();

      if (!start || !end) {
        setError("Please fill in both start and end times");
        setLoading(false);
        return;
      }

      // Convert to timestamps (in seconds)
      const startTime = Math.floor(new Date(start).getTime() / 1000);
      const endTime = Math.floor(new Date(end).getTime() / 1000);

      if (startTime >= endTime) {
        setError("End time must be after start time");
        setLoading(false);
        return;
      }

      const duration = endTime - startTime;
      if (duration < 3600) {
        setError("Voting period must be at least 1 hour");
        setLoading(false);
        return;
      }

      console.log("Setting voting period - Start:", start, "End:", end);

      await contractInstance.setVotingPeriod(startTime, duration);

      setSuccess("Voting period set successfully!");
      startRef.current.value = "";
      endRef.current.value = "";
    } catch (error) {
      setError(error.message || "Failed to set voting period");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-800/40 border border-primary/20 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-2">Set Voting Time Period</h2>
        <p className="text-gray-300 mb-6">
          Configure when voting will start and end. The voting period must be at least 1 hour.
        </p>

        <form onSubmit={handleVotingTime} className="space-y-6">
          {/* Start Time Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-200">
              Start Time
            </label>
            <input
              type="datetime-local"
              ref={startRef}
              required
              className="w-full px-4 py-3 bg-gray-800/50 border border-primary/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all"
            />
            <p className="text-xs text-gray-400">When voting will begin</p>
          </div>

          {/* End Time Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-200">
              End Time
            </label>
            <input
              type="datetime-local"
              ref={endRef}
              required
              className="w-full px-4 py-3 bg-gray-800/50 border border-primary/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all"
            />
            <p className="text-xs text-gray-400">When voting will end</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
              {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-200 text-sm">
              {success}
            </div>
          )}

          {/* Info Box */}
          <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <p className="text-blue-200 text-sm">
              <span className="font-semibold">ℹ️ Requirements:</span>
            </p>
            <ul className="text-blue-200 text-sm mt-2 space-y-1 ml-4">
              <li>• Minimum duration: 1 hour</li>
              <li>• End time must be after start time</li>
              <li>• Only Election Commission can set this</li>
            </ul>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !contractInstance}
            className="w-full py-3 px-4 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/80 hover:to-blue-600/80 disabled:from-gray-600 disabled:to-gray-600 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-primary/50 hover:shadow-xl hover:shadow-primary/70"
          >
            {loading ? "Setting Period..." : "Set Voting Period"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VotingtimePeriod;