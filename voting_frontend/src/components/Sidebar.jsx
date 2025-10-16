import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-80 h-screen bg-background-dark/80 backdrop-blur-sm p-6 flex flex-col justify-between border-r border-primary/20 shadow-[0_0_15px_rgba(55,19,236,0.2)] relative z-10 flex-shrink-0 m-0">
      <div>
        <div className="flex items-center gap-3 mb-16">
          <div className="w-9 h-9 bg-primary rounded-full shadow-[0_0_8px_#3713ec,0_0_16px_#3713ec,0_0_24px_#3713ec]"></div>
          <h1 className="text-4xl font-bold !text-white">Dashboard</h1>
        </div>
        <nav className="flex flex-col gap-3 mt-12">
          <Link
            to="/"
            className="flex items-center gap-4 px-4 py-3 rounded-lg transition-colors duration-200 bg-gradient-to-br from-primary/30 to-primary/10 text-white border border-primary/50 shadow-lg shadow-primary/30"
          >
            <span className="font-medium">Home</span>
          </Link>

          <Link
            to="/registerCandidate"
            className="flex items-center gap-4 px-4 py-3 rounded-lg transition-colors duration-200 text-gray-400 hover:bg-primary/10 hover:text-white"
          >
            <span className="font-medium">Register Candidate</span>
          </Link>

          <Link
            to="/registerVoter"
            className="flex items-center gap-4 px-4 py-3 rounded-lg transition-colors duration-200 text-gray-400 hover:bg-primary/10 hover:text-white"
          >
            <span className="font-medium">Register Voter</span>
          </Link>

          <Link
            to="/getCandidatelist"
            className="flex items-center gap-4 px-4 py-3 rounded-lg transition-colors duration-200 text-gray-400 hover:bg-primary/10 hover:text-white"
          >
            <span className="font-medium">Get Candidate List</span>
          </Link>

          <Link
            to="/getVoterlist"
            className="flex items-center gap-4 px-4 py-3 rounded-lg transition-colors duration-200 text-gray-400 hover:bg-primary/10 hover:text-white"
          >
            <span className="font-medium">Get Voter List</span>
          </Link>

          <Link
            to="/electionCommission"
            className="flex items-center gap-4 px-4 py-3 rounded-lg transition-colors duration-200 text-gray-400 hover:bg-primary/10 hover:text-white"
          >
            <span className="font-medium">Election Commission</span>
          </Link>
        </nav>
      </div>
      <div>
        
   
        
          {/* <span className="font-medium">Logout</span> */}
        
      </div>
    </aside>
  );
};

export default Sidebar;