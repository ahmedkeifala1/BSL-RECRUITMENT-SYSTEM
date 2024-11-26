"use server";

import { compare } from "bcrypt";
import { CookieToken, VerifyOtp } from "./schemas";
import { ErrorResponse, OkResponse } from "@/lib/base/response";
import { signJwt } from "@/lib/core/utils";
import CookieOtpRepo from "./repo";

export async function validateOtp(data: VerifyOtp) {
  const cookie = await CookieOtpRepo.getCookieToken();

  if (!cookie?.data || cookie?.isFailure) {
    return ErrorResponse.create(cookie.message, cookie.code);
  }
  const otp = cookie.data;

  const match = await compare(data.otp.toString(), otp.otp);

  if (!match) {
    return ErrorResponse.badRequest("Invalid token");
  }
  const payload: CookieToken = {
    validated: true,
    receiver: otp.receiver,
    purpose: otp.purpose,
  };
  const jwt = signJwt(payload, "30m");

  return OkResponse.create(
    {
      jwt,
      nextUrl: otp.nextUrl,
    },
    { message: "OTP validated successfully" }
  );
}

export async function unsetCookie() {
  return CookieOtpRepo.signInCookie("", 1);
}

// export async function signOtp<T extends object>(
//   payload: CreateCookieOtp<T>,
//   callback: (otp: string) => Promise<void>
// ) {
//   const otp = Math.floor(100000 + Math.random() * 900000).toString();
//   const hashedOtp = await hashPassword(otp);

//   await callback(otp);

//   return signJwt<CookieOtp<T>>({
//     ...payload,
//     otp: hashedOtp,
//     expires: Date.now() + 60 * 15 * 1000,
//   });
// }
