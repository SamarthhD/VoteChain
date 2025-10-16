import { useState } from "react";
import AnnounceWinner from "../../components/ElectionCommission/AnnounceWinner";
import DisplayWinner  from "../../components/ElectionCommission/DisplayWinner";
import EmergencyDeclare from "../../components/ElectionCommission/EmergencyDeclare";
import VotingStatus from"../../components/ElectionCommission/VotingStatus";
import VotingTimePeriod from "../../components/ElectionCommission/Votingtimeperiod";

const ElectionCommission = () => {
  const [activeTab, setActiveTab] = useState("status");

  const tabs = [
    { id: "status", label: "Voting Status", component: VotingStatus },
    { id: "timePeriod", label: "Set Time Period", component: VotingTimePeriod },
    { id: "announceWinner", label: "Announce Winner", component: AnnounceWinner },
    { id: "displayWinner", label: "Display Winner", component: DisplayWinner },
    { id: "emergency", label: "Emergency Stop", component: EmergencyDeclare },
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;

  return (
    <div className="w-full p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Election Commission</h1>
          <p className="text-gray-400">Manage voting period and election results</p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8 flex flex-wrap gap-2 bg-gray-900/40 p-3 rounded-lg border border-primary/20">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-primary text-white shadow-lg shadow-primary/50"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-gray-900/40 border border-primary/20 rounded-lg p-6">
          {ActiveComponent ? (
            <ActiveComponent />
          ) : (
            <div className="text-gray-400 text-center py-8">
              Select a tab to get started
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ElectionCommission;