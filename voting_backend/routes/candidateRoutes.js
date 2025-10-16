const express = require('express');
const router = express.Router();
const CandidateModel = require('../models/CandidateSchema');
const auth = require('../middleware/auth');


router.post('/PostCandidateImage', auth,multer.uploadCandidate, async (req, res) => {
  try {
    console.log("post candidate");

    let token = req.headers['x-access-token'] ;
    console.log("Token (backend):", token);

    res.status(200).json({
      message: "Candidate image route hit successfully",
      token: token
    });


     // const { accountAddress, imageName } = req.body;

    // // Basic validation
    // if (!accountAddress || !imageName) {
    //   return res.status(400).json({ error: "accountAddress and imageName are required" });
    // }

    // const savedCandidate = await CandidateModel.create({
    //   accountAddress,
    //   imageName
    // });

    // console.log("Saved candidate:", savedCandidate);
    // res.status(201).json(savedCandidate); // 201 = created
  } catch (error) {
    console.error("Error saving candidate:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
