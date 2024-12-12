"use client";

import React from "react";
import { IconButton, InputField, SubmitButton } from "@/components/custom";
import { useForm } from "react-hook-form";
import { VerifyOtp, VerifyOtpSchema } from "../_lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { validateOtp } from "../_lib/action";
import { useMutation } from "@tanstack/react-query";
import { setCookie } from "../../verify-email/_lib/actions";
import { signOut } from "next-auth/react";

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
  const { mutate, isPending } = useMutation({
    mutationFn: () => setCookie("", -1),
    onSuccess() {
      replace("/auth");
    },
  });

  async function onSubmit(data: VerifyOtp) {
    const match = await validateOtp(data);

    if (match.isSuccess && match.data) {
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

      <div className="flex flex-row-reverse gap-2">
        <SubmitButton isLoading={isSubmitting} className="font-semibold">
          Continue
        </SubmitButton>

        <IconButton
          size="lg"
          isIconOnly={false}
          isLoading={isPending}
          className="font-semibold"
          onPress={() => {
            signOut({
              redirect: false,
            });
            mutate();
          }}
        >
          Cancel
        </IconButton>
      </div>
    </form>
  );
}
