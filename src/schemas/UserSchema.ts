import * as yup from "yup";

export const UserPostSchema = yup.object({
  body: yup.object({
    username: yup.string().min(4).max(20).required(),
    password: yup
      .string()
      .min(8)
      .max(16)
      .matches(
        /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/,
        "The password must contain at least one letter and at least one number."
      )
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
      .matches(
        /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/,
        "The password must contain at least one letter and at least one number."
      )
      .required(),
  }),
});
