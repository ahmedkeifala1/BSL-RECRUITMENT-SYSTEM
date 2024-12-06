import { sendMail } from "@/lib/backend/services/mail-services";
import { ErrorResponse, OkResponse } from "@/lib/shared/response";
import { Template } from "@/lib/templates/template";
import { ApplicationStatus } from "@prisma/client";

export default class ApplicationEvents {
  static async applicationSubmitted({
    job,
    email,
    fullName,
  }: {
    job: string;
    fullName: string;
    email: string;
  }) {
    const html = await Template.APPLICATION_SUBMITTED.fill([
      {
        key: "applicant",
        value: fullName,
      },
      {
        key: "job",
        value: job,
      },
    ]);

    await sendMail({
      html,
      to: email,
      subject: "Application Success",
    })
      .then(
        () => OkResponse.create(true, { message: "Email sent" }),
        (error) => ErrorResponse.fromError(error)
      )
      .catch((error) => ErrorResponse.fromError(error));
  }

  static async applicationStatusChanged({
    job,
    email,
    fullName,
    status,
  }: {
    job: string;
    fullName: string;
    email: string;
    status: ApplicationStatus;
  }) {
    const html = await Template.APPLICATION_STATUS_CHANGED.fill([
      {
        key: "applicant",
        value: fullName,
      },
      {
        key: "job",
        value: job,
      },
      {
        key: "status",
        value: status,
      },
    ]);

    await sendMail({
      html,
      to: email,
      subject: "Application Success",
    })
      .then(
        () => OkResponse.create(true, { message: "Email sent" }),
        (error) => ErrorResponse.fromError(error)
      )
      .catch((error) => ErrorResponse.fromError(error));
  }
}
