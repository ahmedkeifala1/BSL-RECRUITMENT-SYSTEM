"use server";

import Database from "@/lib/backend/database/db-context";
import { ChangeApplicationStatus } from "./schema";
import { ErrorResponse, OkResponse } from "@/lib/shared/response";

export async function changeApplicationStatus(data: ChangeApplicationStatus) {
  return Database.application
    .update({
      where: {
        id: data.id,
      },
      data: {
        status: data.status,
      },
    })
    .then(
      () =>
        OkResponse.create(true, {
          message: "Application status changed successfully",
        }),
      (error) => ErrorResponse.fromError(error)
    )
    .catch((error) => ErrorResponse.fromError(error));
}
