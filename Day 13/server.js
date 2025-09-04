const express = require("express");
const cors = require("cors");
const notesRoutes = require("./routes/notes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/notes", notesRoutes);

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
