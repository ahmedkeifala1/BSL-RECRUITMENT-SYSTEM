"use server";

import { getLoggedUser } from "@/app/auth/_lib/actions";
import { ErrorResponse, OkResponse } from "@/lib/shared/response";
import Database from "@/lib/backend/database/db-context";
import { Prisma, Staff } from "@prisma/client";

export async function getAuthStaff(email?: string) {
  if (!email) {
    const logged = await getLoggedUser();

    if (!logged.data || logged.isFailure) {
      return ErrorResponse.forbidden("Not authenticated");
    }

    email = logged.data.email;
  }

  const res = await getLoggedStaff({ email: email });

  if (res.isFailure) {
    return ErrorResponse.unauthorized("Not authorized");
  }

  return res;
}

export async function getLoggedStaff(where: Prisma.StaffWhereUniqueInput) {
  return Database.staff
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

export async function activateAsJobSeeker(staff: Staff) {
  return Database.jobSeeker
    .create({
      data: {
        email: staff.email,
        firstName: staff.firstName,
        fullName: staff.fullName,
        lastName: staff.lastName,
        title: staff.title,
        account_id: staff.account_id,
        middleName: staff.middleName,
      },
    })
    .then(
      () => OkResponse.created(true, "Activated as job seeker"),
      (error) => ErrorResponse.fromError(error)
    )
    .catch((error) => ErrorResponse.fromError(error));
}
