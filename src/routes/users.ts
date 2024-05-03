import express from "express";
import { validateSchema } from "../midldlewares";
import { UserPostSchema, UserLoginSchema } from "../schemas/UserSchema";
import { userController } from "../controller/userController";

export const router = express.Router();

router.post(
  "/register",
  validateSchema(UserPostSchema),
  userController.createUser
);

router.post(
  "/login",
  validateSchema(UserLoginSchema),
  userController.userLogin
);
