import { Application, JobSeeker } from "@prisma/client";

export type ListCandidate = Pick<Application, "id"> &
  Pick<JobSeeker, "email" | "fullName"> & {
    job: string;
  };
