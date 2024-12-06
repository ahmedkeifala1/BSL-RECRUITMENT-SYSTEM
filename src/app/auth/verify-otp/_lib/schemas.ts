import { Drop } from "@/lib/shared/types";
import { z } from "zod";

export const NewOtpSchema = z.object({
  receiver: z.string({
    required_error: "Provide an email or phone number as ID for the OTP",
  }),
});

export type CreateCookieOtp<T extends object = object> = T & {
  nextUrl: string;
  receiver: string;
  purpose: "Reset Password" | "Verify Email" | "Verify Phone Number";
};

export type CookieOtp<T extends object = object> = CreateCookieOtp<
  T & {
    otp: string;
    expires: number;
  }
>;

export type CookieToken<T extends object = object> = Drop<
  CreateCookieOtp<T & { validated: boolean }>,
  "nextUrl"
>;

export const VerifyOtpSchema = z.object({
  otp: z.coerce
    .number({ required_error: "OTP is required" })
    .min(1, "OTP is required"),
});
export type VerifyOtp = z.infer<typeof VerifyOtpSchema>;
