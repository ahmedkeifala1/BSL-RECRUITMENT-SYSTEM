import { Staff } from "@prisma/client";
import { z } from "zod";

export const AddEditStaffSchema = z
  .object({
    title: z.string().optional(),
    firstName: z
      .string({
        required_error: "First name is required",
      })
      .min(1, "First name is required"),
    lastName: z
      .string({
        required_error: "Last name is required",
      })
      .min(1, "Last name is required"),
    middleName: z.string().optional(),
    designation: z
      .string({
        required_error: "Designation is required",
      })
      .min(1, "Designation is required"),
    department: z
      .string({
        required_error: "Department is required",
      })
      .min(1, "Department is required"),
    division: z
      .string({
        required_error: "Division is required",
      })
      .min(1, "Division is required"),
    unit: z
      .string({
        required_error: "Unit is required",
      })
      .min(1, "Unit is required"),
    email: z
      .string({
        required_error: "Email is required",
      })
      .min(1, "Email is required")
      .email({ message: "Invalid email address" }),
  })
  .transform((data) => {
    return {
      ...data,
      email: data.email.toLowerCase(),
      fullName: `${data.title ?? ""} ${data.firstName} ${
        data.middleName ?? ""
      } ${data.lastName}`.trim(),
    };
  });

export type AddEditStaff = z.infer<typeof AddEditStaffSchema>;

export type ListStaff = Staff & {
  isAdmin: boolean;
};
