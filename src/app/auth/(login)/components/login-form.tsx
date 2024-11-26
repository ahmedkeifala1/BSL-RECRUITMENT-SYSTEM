"use client";

import { EmailField, SubmitButton } from "@/components/custom";
import PasswordField from "@/components/password-field";
import { Credentials, CredentialsSchema } from "@/app/auth/_lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogInIcon } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Link } from "@nextui-org/react";

export default function LoginForm() {
  const { replace } = useRouter();
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

    if (res && res.ok && !res.error) {
      return replace("/auth/gateway");
    }

    return toast.error(res?.error);
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

      <fieldset>
        <PasswordField
          props={{
            isInvalid: !!errors.password,
            errorMessage: errors.password?.message,
            ...register("password"),
          }}
        />

        <Link color="warning" href="/auth/forgot-password">
          Forgot password?
        </Link>
      </fieldset>

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
