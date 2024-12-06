import { Document, JobSeeker, JobSeekerDocument } from "@prisma/client";
import { ApplicationDetail } from "../../_lib/schema";
import { LoggedUser } from "@/app/auth/_lib/schemas";
import { Drop } from "@/lib/shared/types";

export type JobSeekerDocumentDetail = JobSeekerDocument &
  Drop<Document, "id" | "type"> & {
    documentType: string;
  };

export type JobSeekerDetail = JobSeeker & {
  applications: ApplicationDetail[];
  documents: JobSeekerDocumentDetail[];
};

export type LoggedJobSeeker = JobSeeker & {
  account: LoggedUser;
};
