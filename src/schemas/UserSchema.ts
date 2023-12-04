import * as yup from "yup";

export const UserPostSchema = yup.object({
  body: yup.object({
    username: yup.string().min(4).max(20).required(),
    password: yup
      .string()
      .min(8)
      .max(16)
      .matches(/^[a-zA-Z0-9]+$/)
      .required(),
  }),
});

export const UserLoginSchema = yup.object({
  body: yup.object({
    username: yup.string().min(4).max(20).required(),
    password: yup
      .string()
      .min(8)
      .max(16)
      .matches(/^[a-zA-Z0-9]+$/)
      .required(),
  }),
});
