import { JobListing, JobListingType } from "@prisma/client";
import { z } from "zod";

export const AddEditListingSchema = z.object({
  jobId: z
    .string({ required_error: "Job ID is required" })
    .min(1, "Job ID is required"),
  name: z
    .string({ required_error: "Listing name is required" })
    .min(1, "Listing name is required"),
  type: z.nativeEnum(JobListingType, {
    required_error: "Listing type is required",
    invalid_type_error: "Invalid listing type",
  }),
  requirements: z
    .array(
      z
        .string({ required_error: "Field is required" })
        .min(1, "Field is required")
    )
    .min(1, "Provide at least one requirement for this listing")
    .default([]),
});
export type AddEditListing = z.infer<typeof AddEditListingSchema>;

export type JobListings = {
  key: JobListingType;
  listings: JobListing[];
};
