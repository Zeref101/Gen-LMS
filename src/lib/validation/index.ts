import * as z from "zod";

export const SignUpValidation = z.object({
  name: z.string().min(5, { message: "Too short" }),
  username: z.string().min(2).max(50),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Passwords must have at least 8 characters" }),
});

export const SignInValidation = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Passwords must have at least 8 characters" }),
});
