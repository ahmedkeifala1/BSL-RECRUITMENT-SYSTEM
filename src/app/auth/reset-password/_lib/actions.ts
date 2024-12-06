"use server";

import Database from "@/lib/backend/database/db-context";
import { ResetPassword } from "./schemas";
import { ErrorResponse, OkResponse } from "@/lib/shared/response";
import { hashPassword } from "@/lib/backend/utils";

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
