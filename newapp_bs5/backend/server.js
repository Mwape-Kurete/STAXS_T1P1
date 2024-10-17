const path = require("path");
const express = require("express");
const app = express();

// Serve static files (React Frontend)
app.use(express.static(path.join(__dirname, "build")));

// Catch-all for React Frontend routing
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
