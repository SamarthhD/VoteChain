import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Web3provider from './context/Web3provider';
import Sidebar from './components/Sidebar';
import Background from './components/Background';
import Dashboard from './components/Dashboard';
import Wallet from './components/wallet/Wallet';
import RegisterCandidate from './pages/Candidate/RegisterCandidate';
import RegisterVoter from './pages/Voter/RegisterVoter';
import GetVoterList from './pages/Voter/GetVoterlist';
import GetCandidateList from './pages/Candidate/GetCandidatelist';
import ElectionCommission from './pages/ElectionCommission/ElectionCommission';

function App() {
  return (
    <div className="h-screen w-screen m-0 p-0 overflow-hidden bg-background-light dark:bg-background-dark font-display text-gray-800 dark:text-gray-200 relative">
      <div className="fixed inset-0 z-0">
        <Background />
      </div>
      <Web3provider>
        <Router>
          <div className="h-screen w-screen flex relative z-10 overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-y-auto" style={{ height: "100vh" }}>
              <Routes>
                <Route path="/" element={
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", width: "100%" }}>
                    <Dashboard />
                    <Wallet />
                  </div>
                } />
                <Route path="/registerCandidate" element={<RegisterCandidate />} />
                <Route path="/registerVoter" element={<RegisterVoter />} />
                <Route path="/getCandidatelist" element={<GetCandidateList />} />
                <Route path="/getVoterlist" element={<GetVoterList />} />
                <Route path="/electionCommission" element={<ElectionCommission />} />
              </Routes>
            </main>
          </div>
        </Router>
      </Web3provider>
    </div>
  );
}

export default App;