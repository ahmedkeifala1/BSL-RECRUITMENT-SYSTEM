import { Drop } from "@/lib/shared/types";
import { User, UserStatus } from "@prisma/client";
import { z } from "zod";

export type ListUser = Drop<User, "password">;

export const ChangeStatusSchema = z.object({
  status: z.nativeEnum(UserStatus, {
    required_error: "Status is required",
    invalid_type_error: "Invalid status",
  }),
});

export type ChangeStatus = z.infer<typeof ChangeStatusSchema>;
