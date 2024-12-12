import Database from "@/lib/backend/database/db-context";
import { sendMail } from "@/lib/backend/services/mail-services";
import { ErrorResponse, OkResponse } from "@/lib/shared/response";
import { Template } from "@/lib/templates/template";

export default class StaffEvent {
  static async staffCreated(data: {
    email: string;
    fullName: string;
    designation: string;
    password: string;
  }) {
    const html = await Template.STAFF_CREATED.fill([
      {
        key: "designation",
        value: data.designation,
      },
      {
        key: "email",
        value: data.email,
      },
      {
        key: "fullName",
        value: data.fullName,
      },
      {
        key: "password",
        value: data.password,
      },
      {
        key: "url",
        value: `${process.env.NEXTAUTH_URL}/auth`,
      },
    ]);

    await sendMail({
      html,
      to: data.email,
      subject: "Welcome",
    })
      .then(
        () => OkResponse.create(true, { message: "Email sent" }),
        (error) => ErrorResponse.fromError(error)
      )
      .catch((error) => ErrorResponse.fromError(error));
  }
  static async staffDeleted(data: { email: string }) {
    await Database.user
      .delete({
        where: {
          email: data.email,
        },
      })
      .then(
        () => OkResponse.create(true),
        (error) => ErrorResponse.fromError(error)
      )
      .catch((error) => ErrorResponse.fromError(error));
  }
}
