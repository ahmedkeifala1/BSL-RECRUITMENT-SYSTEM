"use client";

import React from "react";
import { InputField, SubmitButton } from "@/components/custom";
import { useForm } from "react-hook-form";
import { VerifyOtp, VerifyOtpSchema } from "../_lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { validateOtp } from "../_lib/action";

export default function VerifyOtpForm() {
  const { replace } = useRouter();
  const {
    setError,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VerifyOtp>({
    resolver: zodResolver(VerifyOtpSchema),
  });

  async function onSubmit(data: VerifyOtp) {
    const match = await validateOtp(data);

    if (match.isSuccess && match.data) {
      // await unsetCookie();

      return replace(`${match.data.nextUrl}?tk=${match.data.jwt}`);
    }

    setError("otp", { message: match.message });
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <InputField
        maxLength={6}
        size="lg"
        placeholder="Enter OTP"
        isInvalid={!!errors.otp}
        errorMessage={errors.otp?.message}
        {...register("otp")}
      />

      <SubmitButton isLoading={isSubmitting} className="font-semibold">
        Continue
      </SubmitButton>
    </form>
  );
}
