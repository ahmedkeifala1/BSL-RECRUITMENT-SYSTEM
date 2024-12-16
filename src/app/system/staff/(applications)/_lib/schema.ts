import { JobSeekerDocumentType } from "@prisma/client";
import { z } from "zod";

export const UploadJobSeekerDocumentSchema = z.object({
  type: z.nativeEnum(JobSeekerDocumentType, {
    required_error: "Document type is required",
    invalid_type_error: "Invalid document type",
  }),
  jobSeekerId: z
    .string({ required_error: "Job seeker ID is requires" })
    .min(1, "Job seeker ID is required"),
  name: z
    .string({ required_error: "Document name is requires" })
    .min(1, "Document name is required"),
  file: z.instanceof(File, { message: "Document file is required" }),
});
export type UploadJobSeekerDocument = z.infer<
  typeof UploadJobSeekerDocumentSchema
>;
