import { NewOtp, OTP } from "@/app/api/token/_lib/schema";
import { genSalt, hash } from "bcrypt";
import { sign, verify } from "jsonwebtoken";

export function capitalise(
  str: string,
  options?: { lowerRest?: boolean; separator?: string }
): string {
  if (options?.lowerRest) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
  const split = options?.separator ?? " ";
  return str
    .split(split)
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(split);
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

export function signOtp<T extends object>(payload: NewOtp<T>) {
  const otp = generateOtp();

  return sign({ ...payload, otp }, process.env.JWT_SECRET as string, {
    expiresIn: "15m",
    algorithm: "HS256",
  });
}

export function verifyOtp<T extends NewOtp>(token: string) {
  try {
    return verify(token, process.env.JWT_SECRET as string, {
      algorithms: ["HS256"],
    }) as OTP<T>;
  } catch {
    return null;
  }
}
