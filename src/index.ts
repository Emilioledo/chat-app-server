import express from "express";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import { router as userRouter } from "./routes";
import dotenv from "dotenv";

const app = express();
const cors = require("cors");
dotenv.config();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: process.env.WEBSOCKET_CLIENT,
    credentials: true,
  },
});

app.use(cors());
app.use(express.json());

const REST_API_PORT = process.env.REST_API_PORT || 3000;
const WEBSOCKET_PORT = process.env.WEBSOCKET_PORT || 3001;

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("chat", (message) => {
    io.emit("chat", { id: socket.id, message });
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

app.use("/api/users", userRouter);

server.listen(WEBSOCKET_PORT, () =>
  console.log(`Websocket running on port ${WEBSOCKET_PORT}`)
);

app.listen(REST_API_PORT, () =>
  console.log(`Server running on port ${REST_API_PORT}`)
);
