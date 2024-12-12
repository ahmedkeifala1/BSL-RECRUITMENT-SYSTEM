"use server";

import { Template } from "@/lib/templates/template";
import { ErrorResponse, OkResponse } from "@/lib/shared/response";
import CookieOtpRepo from "../../verify-otp/_lib/repo";
import { sendMail } from "@/lib/backend/services/mail-services";

export async function sendEmailVerificationOtp(email: string) {
  const repo = new CookieOtpRepo({
    receiver: email,
    purpose: "Verify Email",
    nextUrl: "/auth/email-verified",
  });

  const html = await Template.EMAIL_OTP.fill([
    {
      key: "email",
      value: email,
    },
    {
      key: "intro",
      value: "This is to verify that this email belongs to you.",
    },
    {
      key: "otp",
      value: repo.otp,
    },
  ]);

  const sent = await sendMail({
    html,
    to: email,
    subject: "Verify your email",
  });

  if (sent.isSuccess) {
    const token = await repo.sign();
    return OkResponse.create(token, { message: "Otp sent successfully" });
  } else if (sent.isFailure) {
    sent.message =
      "An error was encountered sending the OTP. Please check your connection and try again";
  }

  return ErrorResponse.create(sent.message, sent.code);
}

export async function setCookie(token: string, duration?: number) {
  await CookieOtpRepo.signInCookie(token, duration);
}

// export async function setCookie(token: string, duration?: number) {
//   const maxAge = duration ?? Date.now() + 60 * 24 * 30 * 1000;

//   cookies().set("token", token, {
//     maxAge,
//     path: "/",
//     expires: maxAge,
//     httpOnly: true,
//     sameSite: "strict",
//     secure: process.env.NODE_ENV !== "development",
//   });
// }

// export async function getTokeFromCookie(name?: string) {
//   const token = cookies().get(name ?? "token");

//   if (token && token.value) {
//     return JSON.parse(token.value) as {
//       token: string;
//       receiver: string;
//     };
//   }

//   return null;
// }
