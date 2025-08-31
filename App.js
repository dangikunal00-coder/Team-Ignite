import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/students")
      .then((res) => setStudents(res.data));
  }, []);

  const addStudent = () => {
    axios
      .post("http://localhost:5000/students", { name, course })
      .then((res) => setStudents([...students, res.data]));
    setName("");
    setCourse("");
  };

  return (
    <div className="App">
      <h1>📘 Student Directory</h1>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Course"
        value={course}
        onChange={(e) => setCourse(e.target.value)}
      />
      <button onClick={addStudent}>Add Student</button>

      <ul>
        {students.map((s) => (
          <li key={s.id}>
            {s.name} - {s.course}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
