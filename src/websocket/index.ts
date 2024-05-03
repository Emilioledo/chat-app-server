import http from "http";
import dotenv from "dotenv";
import { Server as SocketIOServer } from "socket.io";

export const websocket = (app: any) => {
  dotenv.config();

  const server = http.createServer(app);

  const WEBSOCKET_PORT = process.env.WEBSOCKET_PORT || 3001;

  const io = new SocketIOServer(server, {
    cors: {
      origin: process.env.WEBSOCKET_CLIENT,
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("chat", (message) => {
      io.emit("chat", { id: socket.id, message });
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });

  server.listen(WEBSOCKET_PORT, () =>
    console.log(`Websocket running on port ${WEBSOCKET_PORT}`)
  );
};
