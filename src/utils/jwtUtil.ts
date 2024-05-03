import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserModel from "../model/User.model";

dotenv.config();

const secretKey = process.env.SECRET_KEY as string;

export const createToken = (user: UserModel) => {
  const token = jwt.sign({ user }, secretKey, { expiresIn: 43200 });
  return token;
};
