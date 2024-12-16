"use server";

import { getLoggedUser } from "@/app/auth/_lib/actions";
import Database from "@/lib/backend/database/db-context";
import { ErrorResponse, OkResponse } from "@/lib/shared/response";
import { Drop } from "@/lib/shared/types";
import { getResponseData } from "@/lib/shared/utils";
import { Prisma } from "@prisma/client";

export async function getVacancies(
  args?: Drop<Prisma.VacancyFindManyArgs, "include" | "select">
) {
  const logged = getResponseData(await getLoggedUser());

  const where: Prisma.VacancyWhereInput = {
    status: "Published",
    deadline: {
      gte: new Date(),
    },
    type: logged?.userType === "Staff" ? undefined : "External",
    ...args?.where,
  };

  return Promise.all([
    Database.vacancy.count({ where }),
    Database.vacancy
      .findMany({
        ...args,
        where,
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
        async (vacancies) => OkResponse.create(vacancies),
        (error) => ErrorResponse.fromError(error)
      )
      .catch((error) => ErrorResponse.fromError(error)),
  ]);
}
