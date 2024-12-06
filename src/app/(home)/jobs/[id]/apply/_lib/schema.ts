import { Document, JobSeeker, JobSeekerDocument } from "@prisma/client";
import { z } from "zod";

export const JobApplicationSchema = z.object({
  jobSeekerId: z
    .string({
      required_error: "Job Seeker ID is required",
    })
    .min(1, "Job Seeker ID is required"),
  vacancyId: z
    .string({
      required_error: "Vacancy ID is required",
    })
    .min(1, "Vacancy ID is required"),
  cvId: z
    .string({
      required_error: "Please select a CV",
    })
    .min(1, "Please select a CV"),
  coverLetterId: z
    .string({
      required_error: "Please select a cover letter",
    })
    .min(1, "Please select a cover letter"),
  otherDocumentsId: z
    .array(z.string())
    .min(1, "Please select at least one document"),
});

export type JobApplication = z.infer<typeof JobApplicationSchema>;

export type ApplicantDetail = JobSeeker & {
  documents: (JobSeekerDocument & {
    document: Document;
  })[];
};
