"use server";

import Database from "@/lib/core/db-context";
import { ResetPassword } from "./schemas";
import { hashPassword } from "@/lib/core/utils";
import { ErrorResponse, OkResponse } from "@/lib/base/response";

export async function resetPassword(data: ResetPassword) {
  const hash = await hashPassword(data.password);

  return Database.user
    .update({
      where: { email: data.email },
      data: {
        password: hash,
      },
    })
    .then(
      () => OkResponse.create(true, { message: "Password reset successfully" }),
      (error) => ErrorResponse.fromError(error)
    )
    .catch((error) => ErrorResponse.fromError(error));
}
