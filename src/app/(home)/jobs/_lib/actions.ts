"use server";

import Database from "@/lib/backend/database/db-context";
import { ErrorResponse, OkResponse } from "@/lib/shared/response";
import { Drop } from "@/lib/shared/types";
import { Prisma } from "@prisma/client";

export async function getVacancies(
  args?: Drop<Prisma.VacancyFindManyArgs, "include" | "select">
) {
  return Database.vacancy
    .findMany({
      ...args,
      where: {
        status: "Published",
        deadline: {
          gte: new Date(),
        },
        ...args?.where,
      },
      select: {
        id: true,
        deadline: true,
        job: {
          omit: {
            status: true,
          },
        },
      },
    })
    .then(
      async (vacancies) => {
        const total = await Database.vacancy.count({
          where: {
            status: "Published",
            deadline: {
              gte: new Date(),
            },
            ...args?.where,
          },
        });

        return OkResponse.create({
          total,
          vacancies,
        });
      },
      (error) => ErrorResponse.fromError(error)
    )
    .catch((error) => ErrorResponse.fromError(error));
}
