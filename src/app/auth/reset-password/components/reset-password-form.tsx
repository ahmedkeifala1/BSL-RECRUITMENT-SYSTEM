"use client";

import { SubmitButton } from "@/components/custom";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { ResetPassword, ResetPasswordSchema } from "../_lib/schemas";
import { resetPassword } from "../_lib/actions";
import PasswordField from "@/components/password-field";

export default function ResetPasswordForm({ email }: { email: string }) {
  const { replace } = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPassword>({
    defaultValues: { email },
    resolver: zodResolver(ResetPasswordSchema),
  });

  async function onSubmit(data: ResetPassword) {
    const res = await resetPassword(data);

    if (res.isSuccess) {
      replace("/auth");
    }

    toast(res.message, { type: res.isSuccess ? "success" : "error" });
  }

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
      noValidate={true}
    >
      <PasswordField
        props={{
          autoFocus: true,
          label: "New password",
          isInvalid: !!errors.password,
          errorMessage: errors.password?.message,
          ...register("password"),
        }}
      />

      <PasswordField
        props={{
          label: "Confirm new password",
          isInvalid: !!errors.confirmPassword,
          errorMessage: errors.confirmPassword?.message,
          ...register("confirmPassword"),
        }}
      />

      <SubmitButton
        isLoading={isSubmitting}
        className="font-semibold gap-1 hover:gap-2"
        endContent={<ArrowRight size={20} />}
      >
        Reset password
      </SubmitButton>
    </form>
  );
}
