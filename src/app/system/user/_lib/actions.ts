"use server";

import { getLoggedUser } from "@/app/auth/_lib/actions";
import { ErrorResponse, OkResponse } from "@/lib/shared/response";
import Database from "@/lib/backend/database/db-context";
import { Prisma } from "@prisma/client";

export async function getAuthJobSeeker(email?: string) {
  if (!email) {
    const logged = await getLoggedUser();

    if (!logged.data || logged.isFailure) {
      return ErrorResponse.forbidden("Not authenticated");
    }

    email = logged.data.email;
  }

  const res = await getLoggedJobSeeker({ email: email });

  if (res.isFailure) {
    return ErrorResponse.unauthorized("Not authorized");
  }

  return res;
}

export async function getLoggedJobSeeker(
  where: Prisma.JobSeekerWhereUniqueInput
) {
  return Database.jobSeeker
    .findFirstOrThrow({
      where,
      include: {
        account: {
          omit: {
            password: true,
          },
        },
      },
    })
    .then(
      (user) => OkResponse.create(user),
      (error) => ErrorResponse.fromError(error)
    )
    .catch((error) => ErrorResponse.fromError(error));
}
