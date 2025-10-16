import { useEffect } from "react";
import useWeb3context from "../../context/useWeb3context";
import { useState } from "react";

const GetVoterList = () => {
  const { web3state } = useWeb3context();
  const { contractInstance } = web3state;
  const [voterList, setVoterList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVoterList = async () => {
      setLoading(true);
      setError("");
      try {
        const voters = await contractInstance.getVoterList();
        setVoterList(voters);
        console.log(voters);
      } catch (err) {
        setError("Failed to fetch voter list. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (contractInstance) {
      fetchVoterList();
    }
  }, [contractInstance]);

  return (
    <div className="w-full p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Voter List</h1>

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
        {!loading && voterList.length > 0 ? (
          <div className="overflow-x-auto rounded-lg border border-primary/30 shadow-[0_0_30px_rgba(55,19,236,0.2)]">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-primary/30 to-primary/10 border-b border-primary/30">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                    #
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                    Age
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                    Gender
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                    Voted For
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                    Wallet Address
                  </th>
                </tr>
              </thead>
              <tbody>
                {voterList.map((voter, index) => (
                  <tr
                    key={index}
                    className="border-b border-primary/20 hover:bg-primary/5 transition-colors"
                  >
                    <td className="px-6 py-4 text-gray-200 font-medium">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 text-gray-200 font-medium">
                      {voter.name || "—"}
                    </td>
                    <td className="px-6 py-4 text-gray-200">
                      {voter.age?.toString() || "—"}
                    </td>
                    <td className="px-6 py-4 text-gray-200">
                      {getGenderLabel(voter.gender)}
                    </td>
                    <td className="px-6 py-4">
                      {voter.voteCandidateId && parseInt(voter.voteCandidateId) > 0 ? (
                        <span className="px-3 py-1 bg-green-500/20 text-green-300 border border-green-500/50 rounded-full text-sm font-medium">
                          Candidate #{voter.voteCandidateId?.toString()}
                        </span>
                      ) : (
                        <span className="text-gray-400 text-sm">Not voted</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-300 text-sm font-mono break-all">
                      {voter.voterAddress
                        ? `${voter.voterAddress.slice(0, 6)}...${voter.voterAddress.slice(-4)}`
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
                {voterList.length === 0 ? "No voters registered yet." : ""}
              </p>
            </div>
          )
        )}

        {/* Stats */}
        {voterList.length > 0 && !loading && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
              <p className="text-gray-400 text-sm mb-1">Total Voters</p>
              <p className="text-primary font-bold text-2xl">
                {voterList.length}
              </p>
            </div>
            <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
              <p className="text-gray-400 text-sm mb-1">Voted</p>
              <p className="text-primary font-bold text-2xl">
                {voterList.filter(v => parseInt(v.voteCandidateId || 0) > 0).length}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper function to convert gender code to label
const getGenderLabel = (genderCode) => {
  const genderMap = {
    0: "Not Specified",
    1: "Male",
    2: "Female",
    3: "Other",
  };
  return genderMap[parseInt(genderCode)] || "—";
};

export default GetVoterList;