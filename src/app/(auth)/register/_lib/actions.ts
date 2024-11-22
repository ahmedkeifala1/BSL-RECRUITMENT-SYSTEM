"use server";

import Database from "@/lib/core/db-context";
import { NewUser } from "./schemas";
import { ErrorResponse, OkResponse } from "@/lib/base/response";
import { userRegistered } from "./events";
import { raise } from "@/lib/core/utils";

export async function registerUser(data: NewUser) {
  const { password, confirmPassword, ...user } = data;
  return Database.jobSeeker
    .create({
      data: { ...user, title: user.title ?? "Ms" },
      select: {
        email: true,
        fullName: true,
      },
    })
    .then(
      (res) => {
        raise(userRegistered, {
          ...res,
          password: password || confirmPassword,
        });

        return OkResponse.created(true, "Account created successfully");
      },
      (error) => ErrorResponse.fromError(error)
    )
    .catch((error) => ErrorResponse.fromError(error));
}

export async function verifyOtp(user: NewUser) {
  return new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
    raise(userRegistered, user);
    return OkResponse.created(true, "Account created successfully");
  });
}
