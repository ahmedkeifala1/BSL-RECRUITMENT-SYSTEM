"use client";

import { EmailField, SubmitButton } from "@/components/custom";
import PasswordField from "@/components/password-field";
import { Credentials, CredentialsSchema } from "@/lib/base/auth/credentials";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogInIcon } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { signIn } from "@/auth";
import { toast } from "react-toastify";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Credentials>({
    resolver: zodResolver(CredentialsSchema),
  });

  async function onSubmit(data: Credentials) {
    const res = await signIn("credentials", {
      ...data,
      redirect: false,
    });

    if (res.ok) {
      return window.location.reload();
    }

    return toast.error(res.error);
  }

  return (
    <form
      noValidate={true}
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-4"
    >
      <EmailField
        label="Email"
        autoFocus={true}
        isInvalid={!!errors.email}
        errorMessage={errors.email?.message}
        {...register("email")}
      />

      <PasswordField
        props={{
          isInvalid: !!errors.password,
          errorMessage: errors.password?.message,
          ...register("password"),
        }}
      />

      <SubmitButton
        fullWidth={true}
        isLoading={isSubmitting}
        className="font-semibold gap-1 hover:gap-2 delay-100"
        endContent={<LogInIcon size={18} />}
      >
        Login
      </SubmitButton>
    </form>
  );
}
