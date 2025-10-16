const express = require("express"); // authenticationroutes.js
const { ethers } = require("ethers");
const router = express.Router();
const jwt=require('jsonwebtoken')

// enable JSON parsing
router.use(express.json());

// POST /api/authentication/:account
router.post("/authentication/:accountAddress", (req, res) => {
  const { signature } = req.body;
  const { accountAddress } = req.params;

  console.log("Received signature:", signature);
  console.log("From account:", accountAddress);

  if(!signature || !accountAddress){
    res.status(500).json({message:"authentication failed"})
  }

  try{
    const message = "welcome to the voting dapp.Please accept the terms and conditions";
    const recoveredAddress=ethers.utils.verifyMessage(message,signature);
    // Recovers and returns the wallet address that originally signed the given 
    // message using the provided signature.
    console.log(recoveredAddress);
    if(recoveredAddress.toLowerCase() == accountAddress.toLocaleLowerCase()){
      const token=jwt.sign(accountAddress,'secretKey');
      res.status(200).json({message:"authentication successful",token:token});
      console.log("Generated Token:", token);
      
    }
    else{
      throw new Error
    }
  }
    catch(error){
      console.error(error
        
      );
      
    }

});

module.exports = router;
