import { promises } from "fs";

export class Template<T> {
  private constructor(public name: string) {}

  async fill(data: { key: T; value: string }[]) {
    let file_content = await promises.readFile(
      `${process.cwd()}/src/lib/templates/${this.name}`,
      "utf-8"
    );

    data.forEach((content) => {
      file_content = file_content.replace(`$${content.key}`, content.value);
    });

    return file_content;
  }

  static readonly EMAIL_OTP = new Template<"email" | "intro" | "otp">(
    "/email/otp.html"
  );

  static readonly RESET_PASSWORD_OTP = new Template<"name" | "otp">(
    "/email/reset-password.html"
  );

  static readonly SMS_OTP = new Template<"otp">("/sms/otp.txt");
}
