import { Admin, AdminRole, Staff } from "@prisma/client";
import { z } from "zod";

export const NewAdminSchema = z.object({
  staff_id: z
    .string({ required_error: "Staff ID is required" })
    .min(1, "Staff ID is required"),
  role: z.nativeEnum(AdminRole, {
    required_error: "Admin role is required",
    invalid_type_error: "Invalid admin role",
  }),
});

export const ChangeAdminRoleSchema = z.object({
  role: z.nativeEnum(AdminRole, {
    required_error: "Admin role is required",
    invalid_type_error: "Invalid admin role",
  }),
});

export type ChangeAdminRole = z.infer<typeof ChangeAdminRoleSchema>;

export type NewAdmin = z.infer<typeof NewAdminSchema>;

export type ListAdmin = Admin & Pick<Staff, "fullName" | "designation">;
