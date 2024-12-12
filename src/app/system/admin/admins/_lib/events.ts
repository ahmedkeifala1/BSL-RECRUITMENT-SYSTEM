import Database from "@/lib/backend/database/db-context";
import { sendMail } from "@/lib/backend/services/mail-services";
import { ErrorResponse, OkResponse } from "@/lib/shared/response";
import { Template } from "@/lib/templates/template";

export default class AdminEvent {
  static async adminCreated(data: {
    email: string;
    fullName: string;
    role: string;
  }) {
    const html = await Template.ADMIN_CREATED.fill([
      {
        key: "fullName",
        value: data.fullName,
      },
      {
        key: "role",
        value: data.role,
      },
    ]);

    await Database.user.update({
      where: {
        email: data.email,
      },
      data: {
        userType: "Admin",
      },
    });

    await sendMail({
      html,
      to: data.email,
      subject: "Congratulations",
    })
      .then(
        () => OkResponse.create(true, { message: "Email sent" }),
        (error) => ErrorResponse.fromError(error)
      )
      .catch((error) => ErrorResponse.fromError(error));
  }

  static async adminDeleted(data: { email: string }) {
    await Database.user
      .update({
        where: {
          email: data.email,
        },
        data: {
          userType: "Staff",
        },
      })
      .then(
        () => OkResponse.create(true),
        (error) => ErrorResponse.fromError(error)
      )
      .catch((error) => ErrorResponse.fromError(error));
  }
}
