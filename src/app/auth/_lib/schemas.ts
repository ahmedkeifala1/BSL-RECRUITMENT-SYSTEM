import { Drop } from "@/lib/core/types";
import { User } from "@prisma/client";
import { z } from "zod";

export const CredentialsSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .min(1, "Email is required"),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(1, "Password is required"),
});

export type Credentials = z.infer<typeof CredentialsSchema>;

export type LoggedUser = Drop<User, "password">;
