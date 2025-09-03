const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// DB connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// GET all todos
app.get("/api/todos", (req, res) => {
  db.query("SELECT * FROM todos ORDER BY created_at DESC", (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
});

// CREATE todo
app.post("/api/todos", (req, res) => {
  const { title, description } = req.body;
  if (!title) return res.status(400).json({ error: "Title required" });

  db.query(
    "INSERT INTO todos (title, description) VALUES (?, ?)",
    [title, description || null],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      db.query(
        "SELECT * FROM todos WHERE id = ?",
        [result.insertId],
        (err2, rows) => {
          if (err2) return res.status(500).json({ error: err2 });
          res.json(rows[0]);
        }
      );
    }
  );
});

// UPDATE todo
app.put("/api/todos/:id", (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  db.query(
    "UPDATE todos SET title=?, description=?, completed=? WHERE id=?",
    [title, description, completed, id],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      db.query("SELECT * FROM todos WHERE id = ?", [id], (err2, rows) => {
        if (err2) return res.status(500).json({ error: err2 });
        res.json(rows[0]);
      });
    }
  );
});

// DELETE todo
app.delete("/api/todos/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM todos WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Deleted" });
  });
});

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
