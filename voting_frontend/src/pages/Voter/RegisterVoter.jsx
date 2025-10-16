import { useRef, useState, useEffect } from "react";
import useWeb3context from "../../context/useWeb3context";
import { useNavigate } from "react-router-dom";

const RegisterVoter = () => {
  const token = localStorage.getItem("token");
  const navigateTo = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!token) {
      navigateTo("/");
    }
  }, [token, navigateTo]);

  const nameRef = useRef(null);
  const ageRef = useRef(null);
  const genderRef = useRef(null);

  const { web3state } = useWeb3context();
  const { contractInstance } = web3state;

  const handleVoterReg = async (e) => {
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
      const name = nameRef.current.value;
      const age = parseInt(ageRef.current.value);
      const gender = parseInt(genderRef.current.value);

      console.log(name, age, gender);

      // Register on blockchain
      await contractInstance.registerVoter(name, age, gender);

      setSuccess("Voter registration successful!");
      console.log("Voter registration successful");

      // Reset form
      nameRef.current.value = "";
      ageRef.current.value = "";
      genderRef.current.value = "0";
    } catch (error) {
      setError(error.message || "Registration failed. Please try again.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-900/60 backdrop-blur-md rounded-2xl p-8 border border-primary/30 shadow-[0_0_30px_rgba(55,19,236,0.3)]">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          Register as Voter
        </h1>

        <form onSubmit={handleVoterReg} className="space-y-6">
          {/* Name Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-200">
              Full Name
            </label>
            <input
              type="text"
              ref={nameRef}
              required
              placeholder="Enter your full name"
              className="w-full px-4 py-3 bg-gray-800/50 border border-primary/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all"
            />
          </div>

          {/* Age Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-200">
              Age
            </label>
            <input
              type="number"
              ref={ageRef}
              required
              min="18"
              placeholder="Enter your age"
              className="w-full px-4 py-3 bg-gray-800/50 border border-primary/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all"
            />
          </div>

          {/* Gender Select */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-200">
              Gender
            </label>
            <select
              ref={genderRef}
              className="w-full px-4 py-3 bg-gray-800/50 border border-primary/30 rounded-lg text-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all cursor-pointer"
            >
              <option value="0">Not Specified</option>
              <option value="1">Male</option>
              <option value="2">Female</option>
              <option value="3">Other</option>
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
            disabled={loading}
            className="w-full py-3 px-4 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/80 hover:to-blue-600/80 disabled:from-gray-600 disabled:to-gray-600 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-primary/50 hover:shadow-xl hover:shadow-primary/70"
          >
            {loading ? "Registering..." : "Register Voter"}
          </button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-6">
          Make sure all fields are filled correctly before submitting.
        </p>
      </div>
    </div>
  );
};

export default RegisterVoter;