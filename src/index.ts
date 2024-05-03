import express from "express";
import http from "http";
import dotenv from "dotenv";
import { Server as SocketIOServer } from "socket.io";
import { router as userRouter } from "./routes";
import HttpException from "./midldlewares/httpException";
import { connectDB } from "./database/db";

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

//db connection
connectDB();

// routes
app.use("/api/users", userRouter);

// handle internal server errors
app.use(
  (
    err: Error | HttpException,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    // @ts-ignore
    if (err && err.errorCode) {
      // @ts-ignore
      res.status(err.errorCode).json({
        error: err.message,
      });
    } else if (err) {
      res.status(500).json({
        error: err.message,
      });
    }
  }
);

server.listen(WEBSOCKET_PORT, () =>
  console.log(`Websocket running on port ${WEBSOCKET_PORT}`)
);

app.listen(REST_API_PORT, () =>
  console.log(`Server running on port ${REST_API_PORT}`)
);
