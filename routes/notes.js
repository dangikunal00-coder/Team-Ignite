const express = require("express");
const router = express.Router();
const db = require("../db");

// Get all notes
router.get("/", (req, res) => {
  db.query("SELECT * FROM notes", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Get note by id
router.get("/:id", (req, res) => {
  db.query(
    "SELECT * FROM notes WHERE id = ?",
    [req.params.id],
    (err, result) => {
      if (err) throw err;
      res.json(result[0]);
    }
  );
});

// Create note
router.post("/", (req, res) => {
  const { title, content } = req.body;
  db.query(
    "INSERT INTO notes (title, content) VALUES (?, ?)",
    [title, content],
    (err, result) => {
      if (err) throw err;
      res.json({ id: result.insertId, title, content });
    }
  );
});

// Update note
router.put("/:id", (req, res) => {
  const { title, content } = req.body;
  db.query(
    "UPDATE notes SET title = ?, content = ? WHERE id = ?",
    [title, content, req.params.id],
    (err) => {
      if (err) throw err;
      res.json({ id: req.params.id, title, content });
    }
  );
});

// Delete note
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM notes WHERE id = ?", [req.params.id], (err) => {
    if (err) throw err;
    res.json({ message: "Note deleted" });
  });
});

module.exports = router;
