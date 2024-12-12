"use server";

import { ForgotPassword } from "./schemas";
import { Template } from "@/lib/templates/template";
import Database from "@/lib/backend/database/db-context";
import { ErrorResponse, OkResponse } from "@/lib/shared/response";
import CookieOtpRepo from "../../verify-otp/_lib/repo";
import { sendMail } from "@/lib/backend/services/mail-services";

export async function sendPasswordResetCode(data: ForgotPassword) {
  return await Database.user
    .findUnique({
      where: { email: data.email },
      select: {
        email: true,
        fullName: true,
      },
    })
    .then(
      async (user) => {
        if (!user) {
          return ErrorResponse.notFound("No user with email address found");
        }

        const repo = new CookieOtpRepo({
          receiver: user.email,
          purpose: "Reset Password",
          nextUrl: "/auth/reset-password",
        });

        const token = await repo.signCookie();
        const html = await Template.RECOVER_PASSWORD_OTP.fill([
          {
            key: "name",
            value: user.fullName,
          },
          {
            key: "otp",
            value: repo.otp,
          },
        ]);

        const sent = await sendMail({
          html,
          to: user.email,
          subject: "Reset Password",
        });

        if (sent.isFailure) {
          return ErrorResponse.create(
            "An error was encountered sending the OTP. Please check your connection and try again"
          );
        }

        return OkResponse.create(token, { message: "Otp sent successfully" });
      },
      (error) => ErrorResponse.fromError(error)
    )
    .catch((error) => ErrorResponse.fromError(error));
}
