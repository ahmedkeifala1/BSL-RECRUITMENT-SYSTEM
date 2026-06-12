import { JobSeekerDocumentType } from "@prisma/client";
import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

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
  file: z
    .instanceof(File, { message: "Document file is required" })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: `File size must be less than 5MB`,
    })
    .refine((file) => ALLOWED_FILE_TYPES.includes(file.type), {
      message: "Only PDF and DOC/DOCX files are allowed",
    }),
});
export type UploadJobSeekerDocument = z.infer<
  typeof UploadJobSeekerDocumentSchema
>;

export { MAX_FILE_SIZE, ALLOWED_FILE_TYPES };
