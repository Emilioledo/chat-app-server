import express from "express";
import dotenv from "dotenv";
import { router as userRouter } from "./routes";
import { connectDB } from "./database/db";
import HttpException from "./midldlewares/httpException";
import { websocket } from "./websocket";

const app = express();
const cors = require("cors");
dotenv.config();

app.use(cors());
app.use(express.json());

const REST_API_PORT = process.env.REST_API_PORT || 3000;

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

websocket(app);

app.listen(REST_API_PORT, () =>
  console.log(`Server running on port ${REST_API_PORT}`)
);
