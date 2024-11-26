import React from "react";
import { getServerSideSession } from "../_lib/options";
import { redirect } from "next/navigation";
import SendVerificationOtp from "./components/verify-email-modal";
import { sendEmailVerificationOtp } from "./_lib/actions";

export default async function VerifyEmailPage() {
  const session = await getServerSideSession();

  if (!session) {
    return redirect("/auth");
  }

  const sent = await sendEmailVerificationOtp(session.user.email as string);

  return <SendVerificationOtp res={sent} />;
}
