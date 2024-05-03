import { Request, Response, NextFunction } from "express";
import {
  comparePassword,
  createToken,
  generateId,
  hashPassword,
} from "../utils";
import UserModel from "../model/User.model";

export const userController = {
  createUser: async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const { body } = request.body;
      const { email, password } = body;
      await UserModel.sync();
      const user = await UserModel.findOne({
        where: {
          email,
        },
      });
      if (user) {
        return response.status(403).json({
          object: {
            msg: "User already exist",
          },
        });
      }
      const newUser = {
        id: generateId(),
        ...body,
        password: await hashPassword(password, 10),
        createdAt: new Date(),
      };
      UserModel.create(newUser);

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
      const { email, password } = body;
      await UserModel.sync();

      const user = await UserModel.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        return response.status(401).json({
          object: {
            msg: "Invalid credentials",
          },
        });
      }

      const encryptedPassword = user.getDataValue("password");

      const isValidPassword = await comparePassword(
        password,
        encryptedPassword
      );

      if (!isValidPassword) {
        return response.status(401).json({
          object: {
            msg: "Invalid credentials",
          },
        });
      }

      const token = createToken(user);

      const username = user.getDataValue("username");

      return response.status(200).json({
        object: {
          username: username,
          msg: "User logged successfully",
          token,
        },
      });
    } catch (error) {
      next(error);
    }
  },
};
