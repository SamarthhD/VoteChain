import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import RegisterCandidate from "../pages/Candidate/RegisterCandidate";
import RegisterVoter from "../pages/Voter/RegisterVoter";
import GetCandidatelist from "../pages/Candidate/GetCandidatelist";
import GetVoterlist from "../pages/Voter/GetVoterlist";
import ElectionCommission from "../pages/ElectionCommission/ElectionCommission";
import Wallet from "../components/wallet/Wallet";
import Navigation from "../components/Navigation/Navigation";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="flex flex-col h-full">
        <Navigation />
        <Wallet />
        <Dashboard />
      </div>
    ),
  },
  {
    path: "/registerCandidate",
    element: (
      <div className="flex flex-col h-full">
        <Navigation />
        <RegisterCandidate />
      </div>
    ),
  },
  {
    path: "/registerVoter",
    element: (
      <div className="flex flex-col h-full">
        <Navigation />
        <RegisterVoter />
      </div>
    ),
  },
  {
    path: "/getCandidatelist",
    element: (
      <div className="flex flex-col h-full">
        <Navigation />
        <GetCandidatelist />
      </div>
    ),
  },
  {
    path: "/getVoterlist",
    element: (
      <div className="flex flex-col h-full">
        <Navigation />
        <GetVoterlist />
      </div>
    ),
  },
  {
    path: "/electionCommission",
    element: (
      <div className="flex flex-col h-full">
        <Navigation />
        <ElectionCommission />
      </div>
    ),
  },
]);
