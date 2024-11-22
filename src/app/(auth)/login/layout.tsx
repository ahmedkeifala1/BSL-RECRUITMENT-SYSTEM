import { verifyOtp } from "@/lib/core/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function LoginLayout({
  children,
}: {
  children: ReactNode;
}) {
  const otp = verifyOtp(cookies().get("token")?.value as string);

  if (otp) {
    return redirect("/verify-otp");
  }

  return children;
}
