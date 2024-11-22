"use server";

import { Credentials } from "@/lib/base/auth/credentials";
import { ErrorResponse, OkResponse } from "@/lib/base/response";
import { ClientDatabase } from "@/lib/core/db-context";
import { UserStatus } from "@prisma/client";
import { compare } from "bcrypt";

export async function credentialsSignIn(credentials: Credentials) {
  return ClientDatabase.user
    .findUnique({ where: { email: credentials.email } })
    .then(
      async (res) => {
        if (res) {
          const { password, ...user } = res;
          const match = await compare(credentials.password, password);

          if (match) {
            if (!user.isEmailVerified) {
              return ErrorResponse.unauthorized(
                "Email address is not verified"
              );
            } else if (user.status !== UserStatus.Active) {
              return ErrorResponse.unauthorized(
                `User account is ${user.status}`
              );
            }

            return OkResponse.create(user);
          }
        }

        return;
      },
      () => ErrorResponse.forbidden("Incorrect email address or password")
    )
    .catch((error) => ErrorResponse.fromError(error));
}
