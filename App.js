import React, { useState } from "react";

function App() {
  const [text, setText] = useState("");

  return (
    <div style={styles.container}>
      <h1>Text Counter + Live Preview</h1>

      {/* Input */}
      <textarea
        style={styles.textarea}
        rows="6"
        placeholder="Type something..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {/* Counter */}
      <p style={styles.counter}>
        Characters: {text.length} | Words:{" "}
        {text.trim() === "" ? 0 : text.trim().split(/\s+/).length}
      </p>

      {/* Live Preview */}
      <div style={styles.preview}>
        <h3>Live Preview:</h3>
        <p>{text || "Start typing to see preview..."}</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "40px auto",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginBottom: "10px",
  },
  counter: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "15px",
  },
  preview: {
    padding: "15px",
    background: "#f9f9f9",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },
};

export default App;
