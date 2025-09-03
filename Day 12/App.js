import React, { useState, useEffect } from "react";
import axios from "axios";

const API = "http://localhost:3001/api/todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  // Load todos
  const fetchTodos = async () => {
    const res = await axios.get(API);
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Add todo
  const addTodo = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const res = await axios.post(API, { title, description: desc });
    setTodos([res.data, ...todos]);
    setTitle("");
    setDesc("");
  };

  // Toggle complete
  const toggleTodo = async (todo) => {
    const res = await axios.put(`${API}/${todo.id}`, {
      ...todo,
      completed: !todo.completed,
    });
    setTodos(todos.map((t) => (t.id === todo.id ? res.data : t)));
  };

  // Delete todo
  const deleteTodo = async (id) => {
    await axios.delete(`${API}/${id}`);
    setTodos(todos.filter((t) => t.id !== id));
  };

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto" }}>
      <h1>To-Do App</h1>

      <form onSubmit={addTodo} style={{ marginBottom: "20px" }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          style={{ padding: "8px", width: "60%", marginRight: "8px" }}
        />
        <input
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Description"
          style={{ padding: "8px", width: "30%", marginRight: "8px" }}
        />
        <button type="submit">Add</button>
      </form>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              marginBottom: "12px",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "6px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo)}
              />
              <span
                style={{
                  marginLeft: "10px",
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.title}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                style={{ marginLeft: "auto" }}
              >
                Delete
              </button>
            </div>
            {todo.description && (
              <div style={{ marginLeft: "28px", color: "#555" }}>
                {todo.description}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
