import { sendMail } from "@/lib/backend/services/mail-services";
import { ErrorResponse, OkResponse } from "@/lib/shared/response";
import { Template } from "@/lib/templates/template";

export default class UserEvent {
  static async userPasswordReset(data: {
    email: string;
    fullName: string;
    password: string;
  }) {
    const html = await Template.USER_PASSWORD_RESET.fill([
      {
        key: "fullName",
        value: data.fullName,
      },
      {
        key: "password",
        value: data.password,
      },
    ]);

    await sendMail({
      html,
      to: data.email,
      subject: "Password Reset",
    })
      .then(
        () => OkResponse.create(true, { message: "Email sent" }),
        (error) => ErrorResponse.fromError(error)
      )
      .catch((error) => ErrorResponse.fromError(error));
  }
}
