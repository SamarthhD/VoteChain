import { useRef, useState, useEffect } from "react";
import useWeb3context from "../../context/useWeb3context";

const CastVote = () => {
  const { web3state } = useWeb3context();
  const { contractInstance } = web3state;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [candidateList, setCandidateList] = useState([]);
  const [loadingCandidates, setLoadingCandidates] = useState(false);

  const voterIdRef = useRef(null);
  const candidateIdRef = useRef(null);

  // Fetch candidates on component load
  useEffect(() => {
    const fetchCandidates = async () => {
      setLoadingCandidates(true);
      try {
        const candidates = await contractInstance.getCandidateList();
        setCandidateList(candidates);
        console.log("Candidates:", candidates);
      } catch (err) {
        console.error("Error fetching candidates:", err);
      } finally {
        setLoadingCandidates(false);
      }
    };

    if (contractInstance) {
      fetchCandidates();
    }
  }, [contractInstance]);

  const handleCastVote = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!contractInstance) {
      setError("Contract instance not available. Connect wallet first.");
      setLoading(false);
      return;
    }

    try {
      const voterId = voterIdRef.current.value.trim();
      const candidateId = candidateIdRef.current.value.trim();

      if (!voterId || !candidateId) {
        setError("Please fill in all fields");
        setLoading(false);
        return;
      }

      if (parseInt(candidateId) < 1 || parseInt(candidateId) > 2) {
        setError("Invalid candidate ID (must be 1 or 2)");
        setLoading(false);
        return;
      }

      console.log("Voting - Voter ID:", voterId, "Candidate ID:", candidateId);

      await contractInstance.castVote(voterId, candidateId);

      setSuccess("Vote cast successfully!");
      console.log("Vote cast successful");

      // Reset form
      voterIdRef.current.value = "";
      candidateIdRef.current.value = "";
    } catch (error) {
      setError(error.message || "Failed to cast vote. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-gray-900/60 backdrop-blur-md rounded-2xl p-8 border border-primary/30 shadow-[0_0_30px_rgba(55,19,236,0.3)]">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          Cast Your Vote
        </h1>

        {/* Candidates Display */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Available Candidates</h2>
          {loadingCandidates ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : candidateList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {candidateList.map((candidate, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-gray-800/50 border border-primary/30 rounded-lg hover:bg-gray-800/80 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-white">{candidate.name}</h3>
                    <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-bold">
                      ID: {candidate.candidateId?.toString()}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm mb-2">
                    <span className="text-gray-400">Party:</span> {candidate.party}
                  </p>
                  <p className="text-gray-300 text-sm mb-2">
                    <span className="text-gray-400">Age:</span> {candidate.age?.toString()}
                  </p>
                  <p className="text-gray-300 text-sm">
                    <span className="text-gray-400">Votes:</span>{" "}
                    <span className="font-bold text-green-400">
                      {candidate.votes?.toString()}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No candidates available</p>
          )}
        </div>

        <div className="border-t border-primary/20 pt-6">
          <form onSubmit={handleCastVote} className="space-y-6">
            {/* Voter ID Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-200">
                Your Voter ID
              </label>
              <input
                type="number"
                ref={voterIdRef}
                required
                placeholder="Enter your voter ID"
                className="w-full px-4 py-3 bg-gray-800/50 border border-primary/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all"
              />
            </div>

            {/* Candidate ID Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-200">
                Select Candidate ID to Vote For
              </label>
              <select
                ref={candidateIdRef}
                required
                className="w-full px-4 py-3 bg-gray-800/50 border border-primary/30 rounded-lg text-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all cursor-pointer"
              >
                <option value="">Choose a candidate...</option>
                {candidateList.map((candidate, idx) => (
                  <option key={idx} value={candidate.candidateId?.toString()}>
                    ID {candidate.candidateId?.toString()} - {candidate.name} ({candidate.party})
                  </option>
                ))}
              </select>
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || loadingCandidates}
              className="w-full py-3 px-4 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/80 hover:to-blue-600/80 disabled:from-gray-600 disabled:to-gray-600 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-primary/50 hover:shadow-xl hover:shadow-primary/70"
            >
              {loading ? "Casting Vote..." : "Cast Vote"}
            </button>
          </form>

          <p className="text-center text-gray-400 text-sm mt-6">
            Enter your voter ID and select a candidate to vote for.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CastVote;