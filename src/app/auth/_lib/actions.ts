"use server";

import { Credentials, LoggedUser } from "@/app/auth/_lib/schemas";
import Response, { ErrorResponse, OkResponse } from "@/lib/shared/response";
import { ClientDatabase } from "@/lib/backend/database/db-context";
import { compare } from "bcrypt";
import { getServerSideSession } from "./options";
import { UserStatus } from "@prisma/client";

export async function credentialsSignIn(credentials: Credentials) {
  return ClientDatabase.user
    .findUnique({ where: { email: credentials.email } })
    .then(
      async (res) => {
        if (res) {
          const { password, ...user } = res;
          const match = await compare(credentials.password, password);

          if (match) {
            return OkResponse.create(user);
          }
        }

        return ErrorResponse.unauthorized(
          "Incorrect email address or password"
        );
      },
      () => ErrorResponse.unauthorized("Incorrect email address or password")
    )
    .catch((error) => ErrorResponse.fromError(error));
}

export async function getLoggedUser(): Promise<Response<LoggedUser | null>> {
  return getServerSideSession().then((session) => {
    if (!session) {
      return ErrorResponse.unauthorized("Unauthorized");
    }
    return ClientDatabase.user
      .findUnique({
        where: { email: session.user.email as string },
        omit: { password: true },
      })
      .then(
        async (res) => {
          if (!res) {
            return ErrorResponse.unauthorized("Unauthorized");
          } else if (!res.isEmailVerified) {
            return ErrorResponse.forbidden("Email not verified");
          } else if (res.status !== UserStatus.Active) {
            return ErrorResponse.locked(`User has been ${res.status}`);
          }

          return OkResponse.create(res);
        },
        () => ErrorResponse.unauthorized("Incorrect email address or password")
      )
      .catch((error) => ErrorResponse.fromError(error));
  });
}
