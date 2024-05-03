import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../types";

dotenv.config();

const secretKey = process.env.SECRET_KEY as string;

export const createToken = (user: User) => {
  const token = jwt.sign({ user }, secretKey, { expiresIn: 43200 });
  return token;
};
