import { getToken } from "next-auth/jwt";
import { NextURL } from "next/dist/server/web/next-url";
import { NextRequest, NextResponse } from "next/server";

function returnToLogin(url: NextURL) {
  if (url.pathname !== "/auth") {
    url.pathname = "/auth";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const logged = await getToken({ req });
  const expired = logged?.exp && (logged.exp as number) < Date.now() / 1000;

  if (!logged || expired) {
    return returnToLogin(nextUrl);
  }
  const path = `/system/${(
    (logged.role ?? logged.type) as string
  ).toLowerCase()}`;

  if (nextUrl.pathname.startsWith(path)) {
    return NextResponse.next();
  }

  nextUrl.pathname = path;

  return NextResponse.redirect(nextUrl);
}

export const config = {
  matcher: [
    "/auth",
    "/auth/((?!verify-email|email-verified|verify-otp|locked|forgot-password|reset-password).*)",
    "/system/(.*)",
  ],
};
