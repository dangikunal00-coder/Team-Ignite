// API returning "Hello, World"

// Import express
const express = require("express");
const app = express();

// Define a simple GET API
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
