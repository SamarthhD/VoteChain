const DisplayWinner = ({ Winner }) => {
  const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

  if (!Winner || Winner === ZERO_ADDRESS) {
    return (
      <div className="p-6 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
        <p className="text-yellow-300 text-center font-medium">
          No winner declared yet
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Winner Card */}
      <div className="p-6 bg-gradient-to-r from-green-500/10 to-primary/10 border border-green-500/30 rounded-lg">
        <h3 className="text-lg font-semibold text-green-300 mb-3">
           Election Winner
        </h3>
        <p className="text-gray-200 mb-2">
          <span className="text-gray-400">Winner Address:</span>
        </p>
        <p className="text-white font-mono break-all bg-gray-800/50 p-3 rounded border border-primary/20">
          {Winner}
        </p>
      </div>

      {/* Shortened Address */}
      <div className="p-4 bg-gray-800/30 rounded-lg">
        <p className="text-gray-300 text-sm">
          <span className="text-gray-400">Short Address:</span>
          <span className="text-primary font-semibold ml-2">
            {Winner.slice(0, 6)}...{Winner.slice(-4)}
          </span>
        </p>
      </div>

      {/* Confirmation Message */}
      <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
        <p className="text-green-200 text-center font-medium">
           Winner has been announced
        </p>
      </div>
    </div>
  );
};

export default DisplayWinner;