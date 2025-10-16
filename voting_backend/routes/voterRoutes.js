const express = require('express');
const router = express.Router();
const VoterModel = require('../models/VoterSchema');
const auth = require('../middleware/auth');


router.post('/PostVoterImage', auth,multer.uploadVoter, async (req, res) => {
  try {
    console.log("post Voter");

    let token = req.headers['x-access-token'] ;
    console.log("Token (backend):", token);

    res.status(200).json({
      message: "Voter image route hit successfully",
      token: token
    });


     const { accountAddress, imageName } = req.body;

    // Basic validation
    if (!accountAddress || !imageName) {
      return res.status(400).json({ error: "accountAddress and imageName are required" });
    }

    // const savedCandidate = await CandidateModel.create({
    //   accountAddress,
    //   imageName
    // });

    // console.log("Saved candidate:", savedCandidate);
    // res.status(201).json(savedCandidate); // 201 = created
  } catch (error) {
    console.error("Error saving voter:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
