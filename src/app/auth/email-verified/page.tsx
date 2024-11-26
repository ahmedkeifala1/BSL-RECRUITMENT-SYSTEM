import { verifyJwt } from "@/lib/core/utils";
import { verifyEmail } from "./_lib/action";
import { redirect } from "next/navigation";
import { CookieToken } from "../verify-otp/_lib/schemas";

type EmailVerifiedPageProps = {
  searchParams: { tk: string };
};

export default async function EmailVerifiedPage({
  searchParams,
}: EmailVerifiedPageProps) {
  const token = verifyJwt<CookieToken>(searchParams.tk);

  if (token) {
    const verified = await verifyEmail(token?.receiver as string);
    if (verified.isSuccess) {
      return redirect("/auth/gateway");
    }
  }

  return redirect("/auth/verify-email");
}
