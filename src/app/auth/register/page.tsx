import Navbar from "@/components/navbar";
import React from "react";
import { Link } from "@nextui-org/react";
import RegisterForm from "./components/form";

export default async function RegisterUserPage() {
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

      <main className="flex-1 md:bg-zinc-50 flex flex-col md:justify-center items-center py-6">
        <div className="container md:max-w-xl space-y-2 md:shadow md:border bg-white p-6">
          <header className="mb-8">
            <h1 className="text-3xl font-bold">Join Us!</h1>
            <p className="text-slate-600">
              Complete the fields to start your career path
            </p>
          </header>

          <RegisterForm />

          <p className="text-sm">
            Already have an account?{" "}
            <Link
              href="/auth"
              size="sm"
              className="text-blue-500 font-semibold"
            >
              Login
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
