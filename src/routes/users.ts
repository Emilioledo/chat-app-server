import express from "express";
import { validateBodySchema } from "../midldlewares";
import { UserPostSchema, UserLoginSchema } from "../schemas/UserSchema";
import { userController } from "../controller/userController";

export const router = express.Router();

router.post(
  "/register",
  validateBodySchema(UserPostSchema),
  userController.createUser
);

router.post(
  "/login",
  validateBodySchema(UserLoginSchema),
  userController.userLogin
);

router.delete("/delete/:id", userController.deleteUser);
