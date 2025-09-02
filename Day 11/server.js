const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // change if needed
  password: "dip220804", // change if needed
  database: "studentdb",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL Database");
});

// ---------------- CRUD APIs ----------------

// CREATE - Add a new student
app.post("/api/students", (req, res) => {
  const { name, rollNo, course, marks } = req.body;
  const sql =
    "INSERT INTO students (name, rollNo, course, marks) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, rollNo, course, marks], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({
      message: "Student added successfully",
      studentId: result.insertId,
    });
  });
});

// READ - Get all students
app.get("/api/students", (req, res) => {
  db.query("SELECT * FROM students", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// READ - Get a student by ID
app.get("/api/students/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM students WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.length === 0)
      return res.status(404).json({ message: "Student not found" });
    res.json(result[0]);
  });
});

// UPDATE - Update student details
app.put("/api/students/:id", (req, res) => {
  const { id } = req.params;
  const { name, rollNo, course, marks } = req.body;
  const sql =
    "UPDATE students SET name=?, rollNo=?, course=?, marks=? WHERE id=?";
  db.query(sql, [name, rollNo, course, marks, id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Student updated successfully" });
  });
});

// DELETE - Delete a student
app.delete("/api/students/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM students WHERE id=?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Student deleted successfully" });
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
