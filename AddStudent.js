// API returning a list of students(JSON)

// Import express
const express = require("express");
const app = express();

// Dummy student list (JSON)
const students = [
  { id: 1, name: "Rahul", age: 20, course: "Computer Science" },
  { id: 2, name: "Priya", age: 22, course: "Mechanical Engineering" },
  { id: 3, name: "Amit", age: 19, course: "Electrical Engineering" },
];

// API endpoint to get student list
app.get("/students", (req, res) => {
  res.json(students);
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
