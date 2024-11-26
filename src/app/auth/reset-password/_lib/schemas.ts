import { z } from "zod";

export const ResetPasswordSchema = z
  .object({
    email: z
      .string({
        required_error: "Email is required",
      })
      .min(1, "Email is required")
      .email({ message: "Invalid email address" }),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters")
      .regex(
        new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])"),
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
      ),
    confirmPassword: z
      .string({
        required_error: "Confirm password is required",
      })
      .min(1, "Confirm password is required"),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type ResetPassword = z.infer<typeof ResetPasswordSchema>;
