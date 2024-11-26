"use server";

import { ErrorResponse, OkResponse } from "@/lib/base/response";
import Database from "@/lib/core/db-context";
import { UserStatus } from "@prisma/client";

export async function verifyEmail(email: string) {
  return Database.user
    .update({
      where: { email },
      data: {
        isEmailVerified: true,
        status: UserStatus.Active,
      },
    })
    .then(
      () => OkResponse.create(true, { message: "Email verified successfully" }),
      (error) => ErrorResponse.fromError(error)
    )
    .catch((error) => ErrorResponse.fromError(error));
}
