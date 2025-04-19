import { UserRole } from "@prisma/client";
import * as z from "zod";

export const settingsSchema = z.object({
  name: z.optional(z.string()),
  isTwoFactorEnabled: z.optional(z.boolean()),
  email: z.optional(z.string().email()),
  password: z.string().min(6, "Minimum of 6 charachters required!").optional(),
  newPassword: z
    .string()
    .min(6, "Minimum of 6 charachters required!")
    .optional(),
  role: z.enum([UserRole.ADMIN, UserRole.USER]),
});

export const loginSchema = z.object({
  email: z.string().email({
    message: "Email is required!",
  }),

  password: z.string().min(3, "Password is required!"),
  code: z.optional(z.string()),
});

export const registerSchema = z.object({
  email: z.string().email({
    message: "Email is required!",
  }),

  password: z.string().min(6, "Minimum 6 charachters required !"),
  name: z.string().min(1, "Name is required!"),
});

export const resetSchema = z.object({
  email: z.string().email({
    message: "Email is required!",
  }),
});

export const newPasswordSchema = z.object({
  password: z.string().min(6, "Minimum 6 charachters required !"),
});
