import { hashPassword, isExpired, signJwt, verifyJwt } from "@/lib/core/utils";
import { CookieOtp, CreateCookieOtp } from "./schemas";
import { cookies } from "next/headers";
import { ErrorResponse, OkResponse } from "@/lib/base/response";

export default class CookieOtpRepo<T extends object> {
  otp: string;

  constructor(private payload: CreateCookieOtp<T>) {
    this.otp = Math.floor(100000 + Math.random() * 900000).toString();
  }

  async sign() {
    const hashedOtp = await hashPassword(this.otp);

    return signJwt<CookieOtp<T>>({
      ...this.payload,
      otp: hashedOtp,
      expires: Date.now() + 60 * 15 * 1000,
    });
  }

  async signCookie(duration?: number) {
    const token = await this.sign();

    await CookieOtpRepo.signInCookie(token, duration);

    return token;
  }

  static async signInCookie(token: string, duration?: number) {
    const maxAge = duration ?? Date.now() + 60 * 24 * 30 * 1000;

    cookies().set("token", token, {
      maxAge,
      path: "/",
      expires: maxAge,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    });
  }

  static async getCookieToken() {
    const cookie = cookies().get("token");

    if (!cookie) {
      return ErrorResponse.notFound("No OTP found");
    }

    const otp = verifyJwt<CookieOtp>(cookie.value);

    if (!otp || isExpired(otp.expires)) {
      return ErrorResponse.badRequest(
        "Token has expired, please request a new one"
      );
    }

    return OkResponse.create(otp, { message: "OTP valid" });
  }
}
