# Realtime Chat (Node.js + Socket.IO)

A minimal, scalable realtime chat app built with Express and Socket.IO. It mirrors the common tutorial flow:
- client/server event communication (`new-user-joined`, `send`, `receive`, `left`)
- broadcast notifications when users join/leave
- simple typing indicator
- clean, responsive UI with left/right message alignment

## Quick Start
1. **Install Node.js** (v16+ recommended)
2. Open a terminal and run:
   ```bash
   cd socketio-chat
   npm install
   npm run dev   # for auto-reload with nodemon
   # or: npm start
   ```
3. Open http://localhost:3000 in multiple tabs or devices on the same network to test multi-user chat.

## Project Structure
```
socketio-chat/
├── package.json
├── server.js
└── public/
    ├── index.html
    ├── style.css
    └── client.js
```

## How it works
- **Server (`server.js`)** keeps a `Map` of `socket.id -> username`. It listens for:
  - `new-user-joined` → saves the username and broadcasts `user-joined`
  - `send` → broadcasts `receive` with message and timestamp
  - `typing` → broadcasts `user-typing` for a simple typing indicator
  - `disconnect` → broadcasts `left`
- **Client (`client.js`)** shows a join modal, sends messages, and renders:
  - self messages on the **right**
  - others' messages on the **left**
  - system notifications in the **center**

## Notes
- This is a single-room global chat for simplicity. You can add rooms using `socket.join(room)` and `io.to(room).emit(...)`.
- For production, consider:
  - Reverse proxy (Nginx), HTTPS
  - Sticky sessions if horizontally scaling with multiple Node processes
  - Socket.IO adapter for Redis for multi-instance scale

© 2025-09-03
