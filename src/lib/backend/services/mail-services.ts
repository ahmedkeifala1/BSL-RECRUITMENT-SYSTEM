import nodemailer from "nodemailer";
import { MailOptions } from "nodemailer/lib/json-transport";
import Response, { ErrorResponse, OkResponse } from "../../shared/response";
import { Drop } from "@/lib/shared/types";

const mailer = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  secure: process.env.NODE_ENV !== "development",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendMail(
  mailOptions: Drop<MailOptions, "from">
): Promise<Response<boolean | null>> {
  try {
    const sender = await mailer.sendMail({
      ...mailOptions,
      from: process.env.EMAIL_USER,
    });

    if (sender.rejected.length > 0) {
      return ErrorResponse.badRequest(sender.response);
    }

    return OkResponse.create(true, {
      message: sender.response,
    });
  } catch (error) {
    return ErrorResponse.fromError(error);
  }
}
