import { Request, Response } from "express";
import { comparePassword, generateId, hashPassword } from "../utils";
import { User } from "../types";

const users: User[] = [];

export const userController = {
  createUser: async (request: Request, response: Response) => {
    const { body } = request.body;
    try {
      const user = users.filter((user) => user.username === body.username);
      if (user.length) {
        return response.status(500).json({
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
      return response.status(500).json({
        object: {
          msg: error,
        },
      });
    }
  },
  userLogin: async (request: Request, response: Response) => {
    try {
      const { body } = request.body;
      const { username, password } = body;

      const user = users.find((user) => user.username === username);

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

      return response.status(200).json({
        object: {
          username: user.username,
          msg: "User logged successfully",
          isLogged: true,
        },
      });
    } catch (error) {
      return response.status(500).json({
        object: {
          msg: error,
        },
      });
    }
  },
};
