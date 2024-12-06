import { genSalt, hash } from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import { headers } from "next/headers";

export function getPathname() {
  const header = headers();
  const url =
    (((header.get("referer") as string) ?? "").split(
      (header.get("host") as string) ?? ""
    )[1] as string) ?? "";

  return url.split("?")[0];
}

export async function hashPassword(password: string): Promise<string> {
  const salt = await genSalt(10);
  return hash(password, salt);
}

export async function raise<T>(fun: (data: T) => Promise<void>, data?: T) {
  if (data) {
    return fun(data);
  }

  return fun;
}

export function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function signJwt<T extends object>(payload: T, duration?: string) {
  return sign(payload, process.env.JWT_SECRET as string, {
    algorithm: "HS256",
    expiresIn: duration ?? "15m",
  });
}

export function verifyJwt<T extends object>(token: string) {
  try {
    return verify(token, process.env.JWT_SECRET as string, {
      algorithms: ["HS256"],
    }) as T;
  } catch {
    return null;
  }
}
