import { ApplicationStatus } from "@prisma/client";
import { z } from "zod";

export const ChangeApplicationStatusSchema = z.object({
  id: z.string({ required_error: "Id is required" }).min(1, "Id is required"),
  status: z.nativeEnum(ApplicationStatus, {
    required_error: "Status is required",
    invalid_type_error: "Invalid status",
  }),
});

export type ChangeApplicationStatus = z.infer<
  typeof ChangeApplicationStatusSchema
>;
