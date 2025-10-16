import { useEffect, useState } from "react";
import useWeb3context from "../../context/useWeb3context";

const GetCandidateList = () => {
  const { web3state } = useWeb3context();
  const { contractInstance } = web3state;
  const [candidateList, setCandidateList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCandidateList = async () => {
      setLoading(true);
      setError("");
      try {
        const candidates = await contractInstance.getCandidateList();
        setCandidateList(candidates);
        console.log(candidates);
      } catch (err) {
        setError("Failed to fetch candidate list. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (contractInstance) {
      fetchCandidateList();
    }
  }, [contractInstance]);

  return (
    <div className="w-full p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Candidate List</h1>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        )}

        {/* Table */}
        {!loading && candidateList.length > 0 ? (
          <div className="overflow-x-auto rounded-lg border border-primary/30 shadow-[0_0_30px_rgba(55,19,236,0.2)]">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-primary/30 to-primary/10 border-b border-primary/30">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">#</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Party</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Age</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Gender</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Votes</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Wallet Address</th>
                </tr>
              </thead>
              <tbody>
                {candidateList.map((candidate, index) => (
                  <tr
                    key={index}
                    className="border-b border-primary/20 hover:bg-primary/5 transition-colors"
                  >
                    <td className="px-6 py-4 text-gray-200 font-medium">{index + 1}</td>
                    <td className="px-6 py-4 text-gray-200 font-medium">
                      {candidate.name || "—"}
                    </td>
                    <td className="px-6 py-4 text-gray-200">
                      {candidate.party || "—"}
                    </td>
                    <td className="px-6 py-4 text-gray-200">
                      {candidate.age?.toString() || "—"}
                    </td>
                    <td className="px-6 py-4 text-gray-200">
                      {getGenderLabel(candidate.gender)}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-primary/20 text-primary border border-primary/50 rounded-full font-bold text-lg">
                        {candidate.votes?.toString() || "0"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-300 text-sm font-mono break-all">
                      {candidate.candidateAddress
                        ? `${candidate.candidateAddress.slice(0, 6)}...${candidate.candidateAddress.slice(-4)}`
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          !loading && (
            <div className="text-center py-12 bg-gray-900/40 rounded-lg border border-primary/20">
              <p className="text-gray-300 text-lg">
                {candidateList.length === 0 ? "No candidates registered yet." : ""}
              </p>
            </div>
          )
        )}

        {/* Stats Section */}
        {candidateList.length > 0 && !loading && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
              <p className="text-gray-400 text-sm mb-1">Total Candidates</p>
              <p className="text-primary font-bold text-2xl">
                {candidateList.length}
              </p>
            </div>
            <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
              <p className="text-gray-400 text-sm mb-1">Total Votes Cast</p>
              <p className="text-primary font-bold text-2xl">
                {candidateList.reduce(
                  (sum, candidate) => sum + parseInt(candidate.votes || 0),
                  0
                )}
              </p>
            </div>
            <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
              <p className="text-gray-400 text-sm mb-1">Leading Candidate</p>
              <p className="text-primary font-bold text-lg">
                {candidateList.length > 0
                  ? candidateList.reduce((max, candidate) =>
                      parseInt(candidate.votes || 0) >
                      parseInt(max.votes || 0)
                        ? candidate
                        : max
                    ).name
                  : "—"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper: gender conversion
const getGenderLabel = (genderCode) => {
  const genderMap = {
    0: "Not Specified",
    1: "Male",
    2: "Female",
    3: "Other",
  };
  return genderMap[parseInt(genderCode)] || "—";
};

export default GetCandidateList;
