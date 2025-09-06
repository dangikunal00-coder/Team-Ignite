const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// DB Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "dip220804", // your MySQL password
  database: "auth_demo",
});

// Create users table (run only once in MySQL CLI)
// CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(50), password VARCHAR(255));

const JWT_SECRET = "your_jwt_secret";

// Register API
app.post("/register", (req, res) => {
  const { username, password } = req.body;

  // hash password
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return res.status(500).json({ error: "Error hashing password" });

    db.query(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [username, hash],
      (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "User registered successfully" });
      }
    );
  });
});

// Login API
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (err, users) => {
      if (err) return res.status(500).json({ error: err });
      if (users.length === 0)
        return res.status(401).json({ error: "Invalid credentials" });

      const user = users[0];

      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) return res.status(500).json({ error: err });
        if (!isMatch)
          return res.status(401).json({ error: "Invalid credentials" });

        const token = jwt.sign(
          { id: user.id, username: user.username },
          JWT_SECRET,
          { expiresIn: "1h" }
        );
        res.json({ token });
      });
    }
  );
});

// Protected Route
app.get("/dashboard", (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    res.json({ message: `Welcome ${user.username}! This is your dashboard.` });
  });
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
