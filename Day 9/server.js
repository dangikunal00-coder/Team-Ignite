const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// In-memory data (replace with DB later)
let students = [
  { id: 1, name: "Alice", course: "CS" },
  { id: 2, name: "Bob", course: "Math" },
];

// Get all students
app.get("/students", (req, res) => {
  res.json(students);
});

// Get student by id
app.get("/students/:id", (req, res) => {
  const student = students.find((s) => s.id == req.params.id);
  student ? res.json(student) : res.status(404).send("Not Found");
});

// Add student
app.post("/students", (req, res) => {
  const newStudent = { id: Date.now(), ...req.body };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

// Update student
app.put("/students/:id", (req, res) => {
  let index = students.findIndex((s) => s.id == req.params.id);
  if (index !== -1) {
    students[index] = { ...students[index], ...req.body };
    res.json(students[index]);
  } else res.status(404).send("Not Found");
});

// Delete student
app.delete("/students/:id", (req, res) => {
  students = students.filter((s) => s.id != req.params.id);
  res.send("Deleted");
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
