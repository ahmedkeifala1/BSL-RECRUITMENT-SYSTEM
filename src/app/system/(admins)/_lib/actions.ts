"use server";

import { getServerSideSession } from "@/app/auth/_lib/options";
import { ErrorResponse, OkResponse } from "@/lib/base/response";
import Database from "@/lib/core/db-context";

export async function getLoggedAdmin(loggedId?: string) {
  const session = await getServerSideSession();

  if (!session || !session.user) {
    return ErrorResponse.unauthorized("Not authorised");
  }

  return Database.admin
    .findFirst({
      where: {
        staff: {
          account_id: loggedId ?? session.user.id,
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
