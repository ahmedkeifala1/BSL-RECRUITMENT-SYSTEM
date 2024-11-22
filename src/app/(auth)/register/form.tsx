"use client";

import { EmailField, InputField, SubmitButton } from "@/components/custom";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { registerUser } from "./_lib/actions";
import { NewUser, NewUserSchema } from "./_lib/schemas";
import { useRouter } from "next/navigation";
import PasswordField from "@/components/password-field";

export default function RegisterForm() {
  const { replace } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewUser>({
    resolver: zodResolver(NewUserSchema),
  });

  async function onSubmit(data: NewUser) {
    const res = await registerUser(data);

    if (res.isSuccess) {
      replace("/verify-otp");
    }

    toast(res.message, { type: res.isSuccess ? "success" : "error" });
  }

  return (
    <form
      noValidate={true}
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-4"
    >
      <EmailField
        autoFocus={true}
        label="Email address"
        isInvalid={!!errors.email}
        errorMessage={errors.email?.message}
        {...register("email")}
      />

      <section id="name" className="space-y-1">
        <h5 className="text-sm font-semibold text-slate-600">Name</h5>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="First Name"
            isInvalid={!!errors.firstName}
            errorMessage={errors.firstName?.message}
            {...register("firstName")}
          />

          <InputField
            label="Last Name"
            isInvalid={!!errors.lastName}
            errorMessage={errors.lastName?.message}
            {...register("lastName")}
          />

          <InputField
            label="Other Name(s)"
            isInvalid={!!errors.middleName}
            errorMessage={errors.middleName?.message}
            {...register("middleName")}
          />

          <InputField
            label="Title"
            isInvalid={!!errors.title}
            errorMessage={errors.title?.message}
            list="title-list"
            {...register("title")}
          />
          <datalist id="title-list">
            {["Mr", "Mrs", "Ms", "Dr", "Prof", "Rev", "Fr"].map((value, i) => (
              <option key={`title_${i}`} value={value} />
            ))}
          </datalist>
        </div>
      </section>

      <section id="create-password" className="space-y-1">
        <h5 className="text-sm font-semibold text-slate-600">
          Create password
        </h5>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PasswordField
            props={{
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
        </div>
      </section>

      <SubmitButton
        fullWidth={true}
        isLoading={isSubmitting}
        className="font-semibold gap-1 hover:gap-2 delay-100"
        endContent={<ArrowRight size={18} />}
      >
        Create Account
      </SubmitButton>
    </form>
  );
}
