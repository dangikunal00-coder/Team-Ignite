function NoteList({ notes, updateNote, deleteNote }) {
  return (
    <div>
      {notes.map((note) => (
        <div key={note.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <button onClick={() => {
            const title = prompt("New title", note.title);
            const content = prompt("New content", note.content);
            if (title && content) updateNote(note.id, { title, content });
          }}>Edit</button>
          <button onClick={() => deleteNote(note.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default NoteList;
