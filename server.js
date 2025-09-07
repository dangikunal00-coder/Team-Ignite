// server.js
const path = require('path');
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Keep a map of connected users
const users = new Map(); // socket.id -> username

io.on('connection', (socket) => {
  // When a new user joins, they send their name
  socket.on('new-user-joined', (name) => {
    const username = String(name || 'Anonymous').trim() || 'Anonymous';
    users.set(socket.id, username);
    // Notify others
    socket.broadcast.emit('user-joined', { name: username, id: socket.id, at: Date.now() });
  });

  // Incoming message from a client
  socket.on('send', (message) => {
    const from = users.get(socket.id) || 'Anonymous';
    const payload = { name: from, message: String(message || ''), at: Date.now(), id: socket.id };
    // Echo back to sender (optional) can be handled client-side; we broadcast to others
    socket.broadcast.emit('receive', payload);
  });

  // Typing indicator (optional)
  socket.on('typing', (isTyping) => {
    const from = users.get(socket.id) || 'Anonymous';
    socket.broadcast.emit('user-typing', { name: from, id: socket.id, typing: !!isTyping });
  });

  socket.on('disconnect', () => {
    const name = users.get(socket.id) || 'Anonymous';
    users.delete(socket.id);
    socket.broadcast.emit('left', { name, id: socket.id, at: Date.now() });
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
