import { Request, Response, NextFunction } from "express";
import {
  comparePassword,
  createToken,
  generateId,
  hashPassword,
} from "../utils";
import { User } from "../types";

const users: User[] = [];

export const userController = {
  createUser: async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const { body } = request.body;
    try {
      const user = users.filter((user) => user.username === body.username);
      if (user.length) {
        return response.status(403).json({
          object: {
            msg: "User already exist",
          },
        });
      }
      const newUser = {
        id: generateId(),
        ...body,
        password: await hashPassword(body.password, 10),
        createdAt: new Date(),
      };
      users.push(newUser);

      return response.status(200).json({
        object: {
          username: newUser.username,
          msg: "User created",
        },
      });
    } catch (error) {
      next(error);
    }
  },
  userLogin: async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const { body } = request.body;
      const { username, password } = body;

      const user = users.find((user) => user.username === username) as User;

      if (!user) {
        return response.status(401).json({
          object: {
            msg: "Invalid credentials",
          },
        });
      }

      const isValidPassword = await comparePassword(password, user.password);

      if (!isValidPassword) {
        return response.status(401).json({
          object: {
            msg: "Invalid credentials",
          },
        });
      }

      const token = createToken(user);

      return response.status(200).json({
        object: {
          username: user.username,
          msg: "User logged successfully",
          token,
        },
      });
    } catch (error) {
      next(error);
    }
  },
};
