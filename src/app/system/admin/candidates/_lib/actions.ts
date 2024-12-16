"use server";

import Database from "@/lib/backend/database/db-context";
import { ErrorResponse, OkResponse } from "@/lib/shared/response";
import { Drop } from "@/lib/shared/types";
import { Prisma } from "@prisma/client";

export async function listCandidates(
  args?: Drop<Prisma.ApplicationFindManyArgs, "select" | "include">
) {
  const where: Prisma.ApplicationWhereInput = {
    ...args?.where,
    status: "Shortlisted",
  };

  return Promise.all([
    Database.application.count({ where }),
    Database.application
      .findMany({
        ...args,
        where,
        select: {
          id: true,
          vacancy: {
            select: {
              job: {
                select: {
                  title: true,
                },
              },
            },
          },
          jobSeeker: {
            select: {
              email: true,
              fullName: true,
            },
          },
        },
      })
      .then(
        (data) =>
          OkResponse.create(
            data.map(({ vacancy, jobSeeker, ...d }) => ({
              ...d,
              ...jobSeeker,
              job: vacancy.job.title,
            }))
          ),
        (error) => ErrorResponse.fromError(error)
      )
      .catch((error) => ErrorResponse.fromError(error)),
  ]);
}
