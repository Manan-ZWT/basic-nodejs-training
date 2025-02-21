import express from "express";
import http from "http";
import path from "path";
import { Server } from "socket.io";
const app = express();
const server = http.createServer(app);
const io = new Server(server);
app.use(express.static("/public"));

app.get("/", (req, res) => {
  res
    .status(200)
    .sendFile(
      path.join(process.cwd(), "exercises", "webSocket", "public", "index.html")
    );
});
const connections = new Set();
const rooms = new Set();

io.on("connection", (socket) => {
  console.log(`Client connected: ${socket.id}`);
  connections.add(socket.id);
  io.emit("updatelist", Array.from(connections));
  io.emit("updateroomlist", Array.from(rooms));

  socket.emit("id", socket.id);

  socket.on("broadcast", (bmsg) => {
    socket.broadcast.emit("broadcast", { id: socket.id, message: bmsg });
  });

  socket.on("message", ({ id, message }) => {
    io.to(id).emit("message", { senderId: socket.id, message: message });
  });

  socket.on("createRoom", (new_room_name) => {
    if (!rooms.has("new_room_name")) {
      rooms.add(new_room_name);
      console.log(rooms);
      io.emit("updateroomlist", Array.from(rooms));
    } else {
      console.log("Room already exists");
    }
  });

  socket.on("joinRoom", (room_name) => {
    if (rooms.has(room_name)) {
      socket.join(room_name);
      console.log(`${socket.id} has join the room: ${room_name}`);
    } else {
      console.log("Room does not exists");
    }
  });

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
    connections.delete(socket.id);
    io.emit("updatelist", Array.from(connections));
    io.emit("updateroomlist", Array.from(rooms));
  });
});

server.listen(9000, () => {
  console.log("Success");
});
