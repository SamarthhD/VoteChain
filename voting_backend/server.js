const express = require('express');
const cors = require('cors');
const path = require("path");

const app = express();
const PORT = 3000;

require('dotenv').config();
const connectDB = require('./db/connect');
const candidateroutes = require('./routes/candidateRoutes');
const voterroutes = require('./routes/voterRoutes');
const authRoutes = require('./routes/AuthenticationRoutes');

// Middleware
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Use routers
app.use("/api", candidateroutes);
app.use("/api", voterroutes);
app.use("/images",express.static(path.join(__dirname,"votingSystem")));

app.use("/api", authRoutes);

// Connect to MongoDB and start server
connectDB(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
