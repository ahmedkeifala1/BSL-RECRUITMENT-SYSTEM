"use client";

import { EmailField, SubmitButton } from "@/components/custom";
import Navbar from "@/components/navbar";
import { Link } from "@nextui-org/react";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { ForgotPassword, ForgotPasswordSchema } from "./_lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendPasswordResetCode } from "./_lib/actions";
import { toast } from "react-toastify";

export default function ForgotPasswordPage() {
  const { replace } = useRouter();
  const {
    setError,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPassword>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  async function onSubmit(data: ForgotPassword) {
    const res = await sendPasswordResetCode(data);

    if (res.isSuccess) {
      return replace("/auth/verify-otp");
    } else if (res.code === 404) {
      return setError("email", {
        message: res.message,
      });
    }

    toast.error(res.message);
  }
  return (
    <>
      <Navbar className="!bg-white items-center">
        <p className="text-sm font-semibold text-slate-600">
          Need help?{" "}
          <Link size="sm" href="/help" className="text-blue-500 font-semibold">
            Contact us
          </Link>
        </p>
      </Navbar>

      <main className="flex-1 md:bg-zinc-50 flex flex-col md:justify-center items-center py-6">
        <div className="container md:max-w-xl space-y-2 md:shadow md:border bg-white p-6">
          <header className="mb-8">
            <h1 className="text-3xl font-bold">Forgot your password?</h1>
            <p className="text-slate-600 text-sm">
              Enter your email address below and we will send you an{" "}
              <abbr title="One Time Password">OTP</abbr> to reset your password.
            </p>
          </header>

          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
            noValidate={true}
          >
            <EmailField
              size="lg"
              autoFocus={true}
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message}
              placeholder="Enter your email address"
              {...register("email")}
            />

            <SubmitButton
              isLoading={isSubmitting}
              className="font-semibold gap-1 hover:gap-2"
              endContent={<ArrowRight size={20} />}
            >
              Send OTP
            </SubmitButton>
          </form>

          <p className="text-sm">
            Remembered your password?{" "}
            <Link href="/auth" size="sm">
              Login
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
