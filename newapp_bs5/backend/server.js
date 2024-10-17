const path = require("path");
const express = require("express");
const axios = require("axios");
const qs = require("qs");
const cors = require("cors");
const app = express();
require("dotenv").config(); // Load environment variables from a .env file

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

// Enable CORS for all routes (allowing all origins)
app.use(cors());

// Middleware for logging requests (useful for debugging)
app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  next();
});

// Serve static files (React Frontend)
app.use(express.static(path.join(__dirname, "build")));

// Endpoint for fetching Spotify token
app.get("/api/token", async (req, res) => {
  const data = qs.stringify({ grant_type: "client_credentials" });
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Basic ${Buffer.from(
      `${CLIENT_ID}:${CLIENT_SECRET}`
    ).toString("base64")}`,
  };

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      data,
      { headers }
    );
    res.json({ access_token: response.data.access_token });
  } catch (error) {
    console.error("Error fetching Spotify token:", error);
    res.status(500).send("Error fetching Spotify token");
  }
});

// Catch-all for React Frontend routing
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"), (err) => {
    if (err) {
      console.error("Error serving index.html:", err);
      res.status(500).send("An error occurred while serving the page.");
    }
  });
});

// Define the port from environment or fallback to 8080
const PORT = process.env.PORT || 8080;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
