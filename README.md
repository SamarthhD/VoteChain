# VoteChain
A full stack descentralized voting application
# 🗳️ Full Stack Voting DApp

A decentralized voting application built with **Solidity, React, Node.js, Express, MongoDB, and Ethers.js**, enabling secure, transparent, and tamper-proof elections on the blockchain.

---

##  Project Overview

This project demonstrates a full-stack blockchain application where users can create elections, vote securely, and verify results in real-time. Leveraging smart contracts, all votes are immutable and transparent, ensuring trust and decentralization.

- **Frontend:** React.js with responsive UI
- **Backend:** Node.js + Express.js API for user authentication and data storage
- **Blockchain:** Ethereum smart contracts written in Solidity
- **Blockchain Interaction:** Ethers.js for connecting frontend to smart contracts
- **Database:** MongoDB for storing user and election metadata
- **Security:** Wallet-based authentication using MetaMask

---

##  Features

- **Create Elections:** Admin can create elections with a list of candidates.
- **Vote Securely:** Users can register and  vote using their Ethereum wallet (MetaMask).
- **Transparent Results:** Election results are fetched from the blockchain for accuracy.
- **Immutable Records:** Votes cannot be altered once submitted.
- **Real-time Updates:** Frontend dynamically updates vote counts.

---

##  Technologies Used

- **Frontend:** React.js, Tailwind CSS  
- **Backend:** Node.js, Express.js, MongoDB, Mongoose  
- **Blockchain:** Solidity, Ethers.js,  
- **Tools:** MetaMask, Postman, VS Code  

---

## Installation & Setup

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/voting-dapp.git
cd voting-dapp
cd voting_backend
npm install
cd ../voting_frontend
npm install
cd ../backend
npm start(for nodemon) or npm server.js 
cd ../frontend
npm run dev
Open in browser

Frontend will be accessible at http://localhost:3000
