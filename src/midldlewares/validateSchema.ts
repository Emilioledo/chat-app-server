/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";

export const validateSchema =
  (schema: any) =>
  async (request: Request, _response: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: request.body.body,
        params: request.params,
      });
      return next();
    } catch (error) {
      next(error);
    }
  };
