import { verifyEmail } from "./_lib/action";
import { redirect } from "next/navigation";
import { CookieToken } from "../verify-otp/_lib/schemas";
import { verifyJwt } from "@/lib/backend/utils";

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
      return redirect("/auth");
    }
  }

  return redirect("/auth/verify-email");
}
