import Navbar from "@/components/navbar";
import React from "react";
import LoginForm from "./form";
import { Link } from "@nextui-org/react";

export default function LoginPage() {
  return (
    <>
      <Navbar className="!bg-white">
        <Link
          size="sm"
          href="/register/employee"
          className="text-blue-500 font-semibold"
        >
          Employee Registration
        </Link>
      </Navbar>

      <main className="flex-1 flex justify-center items-center">
        <div className="container max-w-sm space-y-2">
          <header className="mb-8">
            <h1 className="text-3xl font-bold">Welcome back!</h1>
            <p className="text-slate-600">
              Please provide credentials to login to your account.
            </p>
          </header>

          <LoginForm />

          <p className="text-sm">
            Do not have an account?{" "}
            <Link
              href="/register"
              size="sm"
              className="text-blue-500 font-semibold"
            >
              Register
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
