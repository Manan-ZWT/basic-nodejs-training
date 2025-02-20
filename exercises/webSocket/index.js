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
io.on("connection", (socket) => {
  console.log(`Client connected: ${socket.id}`);
  connections.add(socket.id);
  io.emit("updatelist", Array.from(connections));

  socket.emit("id", socket.id);

  socket.on("broadcast", (bmsg) => {
    socket.broadcast.emit("broadcast", { id: socket.id, message: bmsg });
  });

  socket.on("message", ({ id, message }) => {
    io.to(id).emit("message", { senderId: socket.id, message: message });
  });

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
    connections.delete(socket.id);
    io.emit("updatelist", Array.from(connections));
  });
});

server.listen(9000, () => {
  console.log("Success");
});
