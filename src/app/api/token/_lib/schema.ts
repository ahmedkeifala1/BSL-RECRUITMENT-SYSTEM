import { z } from "zod";

export const NewOtpSchema = z.object({
  receiver: z.string({
    required_error: "Provide an email or phone number as ID for the OTP",
  }),
});
export type NewOtp<T extends object = object> = T &
  z.infer<typeof NewOtpSchema>;

export type OTP<T extends NewOtp = { receiver: string }> = T & {
  code: string;
};
