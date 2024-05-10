/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";

export const validateBodySchema =
  (schema: any) =>
  async (request: Request, _response: Response, next: NextFunction) => {
    try {
      await schema.validate(request.body);
      return next();
    } catch (error) {
      next(error);
    }
  };
