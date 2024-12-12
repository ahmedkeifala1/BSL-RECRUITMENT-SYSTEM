import { promises } from "fs";

export class Template<T> {
  private constructor(public name: string) {}

  async fill(data: { key: T; value: string }[]) {
    let file_content = await promises.readFile(
      `${process.cwd()}/src/lib/templates/${this.name}`,
      "utf-8"
    );

    data.forEach((content) => {
      file_content = file_content.replaceAll(`$${content.key}`, content.value);
    });

    return file_content;
  }

  static readonly EMAIL_OTP = new Template<"email" | "intro" | "otp">(
    "/email/otp.html"
  );

  static readonly RECOVER_PASSWORD_OTP = new Template<"name" | "otp">(
    "/email/recover-password.html"
  );

  static readonly SMS_OTP = new Template<"otp">("/sms/otp.txt");

  static readonly APPLICATION_SUBMITTED = new Template<"applicant" | "job">(
    "/email/application-submitted.html"
  );

  static readonly APPLICATION_STATUS_CHANGED = new Template<
    "applicant" | "job" | "status"
  >("/email/application-status-changed.html");

  static readonly STAFF_CREATED = new Template<
    "fullName" | "designation" | "password" | "email" | "url"
  >("/email/staff-created.html");

  static readonly USER_PASSWORD_RESET = new Template<"fullName" | "password">(
    "/email/reset-password.html"
  );

  static readonly ADMIN_CREATED = new Template<"fullName" | "role">(
    "/email/admin-created.html"
  );
}
