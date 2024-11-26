import { getLoggedUser } from "@/app/auth/_lib/actions";
import CookieOtpRepo from "@/app/auth/verify-otp/_lib/repo";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function LoginLayout({
  children,
}: {
  children: ReactNode;
}) {
  const otp = await CookieOtpRepo.getCookieToken();

  if (otp) {
    return redirect("/verify-otp");
  }

  const logged = await getLoggedUser();

  if (!logged.data || logged.isFailure) {
    switch (logged.code) {
      case 401:
        return redirect("/auth");
      case 403:
        return redirect("/auth/verify-email");
      case 423:
        return redirect("/auth/locked");
    }
  }

  return children;
}
