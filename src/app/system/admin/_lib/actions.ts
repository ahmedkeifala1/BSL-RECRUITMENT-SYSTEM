"use server";

import { getLoggedUser } from "@/app/auth/_lib/actions";
import { ErrorResponse, OkResponse } from "@/lib/shared/response";
import Database from "@/lib/backend/database/db-context";

export async function getLoggedAdmin(loggedId?: string) {
  if (!loggedId) {
    const logged = await getLoggedUser();

    if (!logged.data || logged.isFailure) {
      return ErrorResponse.forbidden("Not authenticated");
    }

    loggedId = logged.data.id;
  }

  return Database.admin
    .findFirstOrThrow({
      where: {
        staff: {
          account_id: loggedId,
        },
      },
      include: {
        staff: true,
      },
    })
    .then(
      (admin) => OkResponse.create(admin),
      (error) => ErrorResponse.fromError(error)
    )
    .catch((error) => ErrorResponse.fromError(error));
}
