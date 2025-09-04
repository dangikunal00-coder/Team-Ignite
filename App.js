import { useEffect, useState } from "react";
import axios from "axios";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";

const API = "http://localhost:5000/api/notes";

function App() {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    const res = await axios.get(API);
    setNotes(res.data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const addNote = async (note) => {
    await axios.post(API, note);
    fetchNotes();
  };

  const updateNote = async (id, note) => {
    await axios.put(`${API}/${id}`, note);
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchNotes();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Notes App</h1>
      <NoteForm addNote={addNote} />
      <NoteList notes={notes} updateNote={updateNote} deleteNote={deleteNote} />
    </div>
  );
}

export default App;
