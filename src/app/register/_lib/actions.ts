"use server";

import Database from "@/lib/backend/database/db-context";
import { NewJobSeeker } from "./schemas";
import { ErrorResponse, OkResponse } from "@/lib/shared/response";
import {
  sendEmailVerificationOtp,
  setCookie,
} from "../../auth/verify-email/_lib/actions";
import { hashPassword } from "@/lib/backend/utils";

export async function registerJobSeeker(data: NewJobSeeker) {
  const { password, confirmPassword, ...user } = data;
  const hash = await hashPassword(password || confirmPassword);

  return Database.jobSeeker
    .create({
      data: {
        ...user,
        title: user.title ?? "Ms",
        account: {
          create: {
            email: user.email,
            fullName: user.fullName,
            password: hash,
          },
        },
      },
      select: {
        email: true,
        fullName: true,
      },
    })
    .then(
      async (created) => {
        const sent = await sendEmailVerificationOtp(created.email);

        if (sent.isSuccess) {
          setCookie(sent.data as string);
        }

        return OkResponse.created(true, "Account created successfully");
      },
      (error) => ErrorResponse.fromError(error)
    )
    .catch((error) => ErrorResponse.fromError(error));
}
