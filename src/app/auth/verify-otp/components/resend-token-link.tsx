"use client";

import React, { useState } from "react";
import {
  sendEmailVerificationOtp,
  setCookie,
} from "../../verify-email/_lib/actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";

export default function ResendTokenLink({ receiver }: { receiver: string }) {
  const { refresh } = useRouter();
  const [isSending, setIsSending] = useState<boolean>(false);

  async function handleResend() {
    setIsSending(true);
    const sent = await sendEmailVerificationOtp(receiver).finally(() =>
      setIsSending(false)
    );

    if (sent.isSuccess) {
      await setCookie(sent.data as string);

      refresh();
    }

    toast(sent.message, { type: sent.isSuccess ? "success" : "error" });
  }

  return (
    <Button
      size="sm"
      radius="none"
      variant="light"
      isLoading={isSending}
      onPress={handleResend}
      className="font-semibold text-sm text-blue-600"
    >
      Resend
    </Button>
  );
}
