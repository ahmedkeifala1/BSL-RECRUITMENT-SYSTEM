"use server";

import Response, { ErrorResponse, OkResponse } from "@/lib/shared/response";
import Database from "@/lib/backend/database/db-context";
import { Prisma, UserStatus } from "@prisma/client";
import { Drop } from "@/lib/shared/types";
import { ListUser } from "./schema";
import { generateOtp, hashPassword, raise } from "@/lib/backend/utils";
import UserEvent from "./events";

export async function listUsers(
  args?: Drop<Prisma.UserFindManyArgs, "select" | "include">
): Promise<[number, Response<ListUser[] | null>]> {
  return Promise.all([
    Database.user
      .count({
        where: args?.where,
      })
      .catch(() => 0),
    Database.user
      .findMany({
        ...args,
        omit: {
          password: true,
          ...args?.omit,
        },
      })
      .then(
        (res) => OkResponse.create(res),
        (error) => ErrorResponse.fromError(error)
      )
      .catch((error) => ErrorResponse.fromError(error)),
  ]);
}

export async function changeUserStatus(
  where: Prisma.UserWhereUniqueInput,
  status: UserStatus
) {
  return Database.user
    .update({
      where,
      data: {
        status,
      },
    })
    .then(
      () =>
        OkResponse.create(true, {
          message: `User status changed to ${status} successfully`,
        }),
      (error) => ErrorResponse.fromError(error)
    )
    .catch((error) => ErrorResponse.fromError(error));
}

export async function resetPassword(where: Prisma.UserWhereUniqueInput) {
  const plain = generateOtp();
  const password = await hashPassword(plain);

  return Database.user
    .update({
      where,
      data: {
        password,
      },
      select: {
        email: true,
        fullName: true,
      },
    })
    .then(
      (res) => {
        raise(UserEvent.userPasswordReset, { ...res, password });

        return OkResponse.create(true, {
          message: "User password reset successfully",
        });
      },
      (error) => ErrorResponse.fromError(error)
    )
    .catch((error) => ErrorResponse.fromError(error));
}
