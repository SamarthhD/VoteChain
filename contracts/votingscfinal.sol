// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract Vote {

    struct Voter {
        string name;
        uint age;
        uint voterId;
        Gender gender;
        uint voteCandidateId; //candidate id of candidate to whom voter has voted
        address voterAddress;
    }

    struct Candidate {
        string name;
        string party;
        uint age;
        Gender gender;
        uint candidateId;
        address candidateAddress;
        uint votes;
    }

    address public electionCommission;
    address public winner;
    uint nextVoterId = 1;
    uint nextCandidateId = 1;
    uint startTime;
    uint endTime;
    bool stopVoting;

    mapping(uint => Voter) voterDetails;
    mapping(uint => Candidate) candidateDetails;
    
    enum VotingStatus {NotStarted, InProgress, Ended}
    enum Gender {NotSpecified, Male, Female, Other}

    constructor() {
        electionCommission = msg.sender;
    }

    modifier isVotingOver() {
        require(block.timestamp >= startTime, "Voting has not started yet");
        require(block.timestamp <= endTime, "Election is over");
        require(!stopVoting, "Voting has been stopped");
        _;
    }

    modifier onlyCommissioner() {
        require(msg.sender == electionCommission, "Only election commissioner can perform action");
        _;
    }

    modifier validAge(uint age) {
        require(age >= 18, "You are below 18");
        _;
    }

    function registerCandidate(
        string calldata _name,
        string calldata _party,
        uint _age,
        Gender _gender
    ) validAge(_age) external {
        require(isCandidateNotRegistered(msg.sender), "You are already registered");
        require(nextCandidateId < 3, "Candidate registration is full");
        require(msg.sender != electionCommission, "Election commission cannot register");
        candidateDetails[nextCandidateId] = Candidate({
            name: _name,
            party: _party,
            age: _age,
            gender: _gender,
            candidateId: nextCandidateId,
            candidateAddress: msg.sender,
            votes: 0
        });
        nextCandidateId++;
    }

    function isCandidateNotRegistered(address _person) internal view returns (bool) {
        for (uint i = 1; i < nextCandidateId; i++) {
            if (candidateDetails[i].candidateAddress == _person) {
                return false;
            }
        }
        return true;
    }

    function getCandidateList() public view returns (Candidate[] memory) {
        Candidate[] memory candidateArr = new Candidate[](nextCandidateId - 1);
        for (uint i = 0; i < candidateArr.length; i++) {
            candidateArr[i] = candidateDetails[i + 1];
        }
        return candidateArr;
    }

    function isVoterNotRegistered(address _person) internal view returns (bool) {
        for (uint i = 1; i < nextVoterId; i++) {
            if (voterDetails[i].voterAddress == _person) {
                return false;
            }
        }
        return true;
    }

    function registerVoter(
        string calldata _name,
        uint _age,
        Gender _gender
    ) external validAge(_age) {
        require(isVoterNotRegistered(msg.sender), "You are already registered");
        voterDetails[nextVoterId] = Voter({
            name: _name,
            age: _age,
            voterId: nextVoterId,
            gender: _gender,
            voteCandidateId: 0,
            voterAddress: msg.sender
        });
        nextVoterId++;
    }

    function getVoterList() public view returns (Voter[] memory) {
        Voter[] memory voterArr = new Voter[](nextVoterId - 1);
        for (uint i = 0; i < voterArr.length; i++) {
            voterArr[i] = voterDetails[i + 1];
        }
        return voterArr;
    }

    function castVote(uint _voterId, uint _candidateId) external isVotingOver {
        require(voterDetails[_voterId].voteCandidateId == 0, "You have already voted");
        require(voterDetails[_voterId].voterAddress == msg.sender, "You are not authorized");
        require(_candidateId >= 1 && _candidateId < 3, "Invalid candidate id");
        voterDetails[_voterId].voteCandidateId = _candidateId;
        candidateDetails[_candidateId].votes++;
    }

    function setVotingPeriod(uint _startTimeDuration, uint _endTimeDuration) external onlyCommissioner {
        require(_endTimeDuration > 3600, "End time duration should be greater than 1 hour");
        startTime = block.timestamp + _startTimeDuration;
        endTime = startTime + _endTimeDuration;
    }

    function getVotingStatus() public view returns (VotingStatus) {
        if (startTime == 0) {
            return VotingStatus.NotStarted;
        } else if (block.timestamp >= startTime && block.timestamp <= endTime && !stopVoting) {
            return VotingStatus.InProgress;
        } else {
            return VotingStatus.Ended;
        }
    }

    function announceVotingResult() external onlyCommissioner {
         require(nextCandidateId > 2, "Both candidates must be registered first");
        if (candidateDetails[1].votes > candidateDetails[2].votes) {
            winner = candidateDetails[1].candidateAddress;
        } else if (candidateDetails[2].votes > candidateDetails[1].votes) {
            winner = candidateDetails[2].candidateAddress;
        } else {
            winner = address(0); // Tie case
        }
    }

    function emergencyStopVoting() public onlyCommissioner {
        stopVoting = true;
    }
}
