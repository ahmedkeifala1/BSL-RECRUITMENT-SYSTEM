import { Drop } from "@/lib/shared/types";
import { EmploymentType, Job, JobStatus } from "@prisma/client";
import { z } from "zod";
import { JobListings } from "../[id]/_lib/schema";

export const AddEditJobSchema = z.object({
  title: z
    .string({ required_error: "Job title is required" })
    .min(1, "Job title is required"),
  description: z
    .string({ required_error: "Job description is required" })
    .min(1, "Job description is required"),
  type: z.nativeEnum(EmploymentType, {
    required_error: "Job type is required",
    invalid_type_error: "Invalid job type",
  }),
});

export const ChangeJobStatusSchema = z.object({
  status: z.nativeEnum(JobStatus, {
    required_error: "Job status is required",
    invalid_type_error: "Invalid job status",
  }),
});

export type ChangeJobStatus = z.infer<typeof ChangeJobStatusSchema>;

export type AddEditJob = z.infer<typeof AddEditJobSchema>;

export type JobStatusTotal = Record<JobStatus, number>;

export type ListJob = Drop<Job, "updatedAt"> & {
  vacancies: number;
};

export type ListJobWithStatusTotals = {
  jobs: ListJob[];
  totals: JobStatusTotal;
};

export type JobDetail = Job & {
  listings?: JobListings[];
};
