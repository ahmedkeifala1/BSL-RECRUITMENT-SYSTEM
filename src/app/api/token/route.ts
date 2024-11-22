import { sign, verify } from "jsonwebtoken";
import { OTP, NewOtpSchema } from "./_lib/schema";
import { serialize } from "cookie";
import { OkResponse, ErrorResponse } from "@/lib/base/response";
import { cookies } from "next/headers";

const secret = process.env.JWT_SECRET as string;

export async function POST(req: Request) {
  const body = await req.json();

  const validate = await NewOtpSchema.safeParseAsync(body);

  if (validate.error) {
    return Response.json(
      ErrorResponse.badRequest(
        validate.error.errors.map((e) => e.message).join(", ")
      ),
      {
        status: 400,
      }
    );
  }
  const payload = {
    ...body,
    ...validate.data,
    code: Math.floor(100000 + Math.random() * 900000).toString(),
  };
  const token = sign(payload, secret, {
    expiresIn: "15m",
    algorithm: "HS256",
  });

  return Response.json(
    OkResponse.create(true, {
      message: "OTP sent successfully",
    }),
    {
      headers: {
        "Set-Cookie": serialize("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 60 * 15,
          sameSite: "strict",
          path: "/",
        }),
      },
    }
  );
}

export async function GET() {
  const token = cookies().get("token");

  if (!token) {
    return Response.json(ErrorResponse.unauthorized("No token found"), {
      status: 403,
    });
  }

  try {
    const decoded = verify(token.value, secret, {
      algorithms: ["HS256"],
      ignoreExpiration: false,
      ignoreNotBefore: true,
    });
    return Response.json(
      OkResponse.create(decoded as OTP, { message: "Token is valid" }),
      {
        status: 200,
      }
    );
  } catch {
    return Response.json(ErrorResponse.unauthorized("Invalid token"), {
      status: 403,
    });
  }
}
