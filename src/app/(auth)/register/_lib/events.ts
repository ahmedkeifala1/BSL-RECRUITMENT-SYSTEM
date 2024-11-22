import Database from "@/lib/core/db-context";
import { hashPassword, signOtp } from "@/lib/core/utils";
import { cookies } from "next/headers";

export async function userRegistered(data: {
  email: string;
  fullName: string;
  password: string;
}) {
  const { password, ...user } = data;
  const maxAge = Date.now() + 15 * 60 * 1000;
  const token = signOtp({ ...user, receiver: user.email });
  cookies().set("token", token, {
    maxAge,
    path: "/",
    expires: maxAge,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });

  const hash = await hashPassword(password);
  await Database.user.create({
    data: {
      ...user,
      password: hash,
    },
  });
}
