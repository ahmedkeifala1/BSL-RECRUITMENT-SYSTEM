import { genSalt, hash } from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import { PaginatedParams, PaginationParams } from "./types";

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

export function isExpired(date: number | string | Date) {
  const currentDate = new Date();
  const expiryDate = date instanceof Date ? date : new Date(date);

  return currentDate > expiryDate;
}

export function getPaginatedParams<T extends object>(
  params: PaginationParams<T>,
  defaultValue?: T
): PaginatedParams<T> {
  const res = {
    ...defaultValue,
    ...params,
    l: params.l ?? 10,
    p: params.p ?? 1,
  };

  return {
    ...res,
    skip: (res.p - 1) * res.l,
    order: res?.o ? { [res.o as string]: res.om ?? "asc" } : undefined,
  };
}
