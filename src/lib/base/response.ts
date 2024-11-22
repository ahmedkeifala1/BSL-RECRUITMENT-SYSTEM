import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextApiResponse } from "next";

export default class Response<T> {
  isFailure: boolean;

  protected constructor(
    public data: T,
    public code: number,
    public message: string,
    public isSuccess: boolean
  ) {
    this.isFailure = !isSuccess;
  }
}

export class OkResponse<T> extends Response<T> {
  private constructor(data: T, options: { message: string; code?: number }) {
    super(data, options?.code ?? 200, options.message, true);
  }

  static create<T>(data: T, options?: { message?: string; code?: number }) {
    const res = new OkResponse(data, {
      code: options?.code,
      message: options?.message ?? "Success",
    });

    return { ...res };
  }

  static created<T>(data: T, message: string) {
    return this.create(data, { message, code: 201 });
  }
}

export class ErrorResponse extends Response<null> {
  private constructor(message: string, code?: number) {
    super(null, code ?? 500, message, false);
  }

  static create(message: string, code?: number) {
    const error = new ErrorResponse(message, code);

    return { ...error };
  }

  static badRequest(message: string) {
    return this.create(message, 400);
  }

  static unauthorized(message: string) {
    return this.create(message, 401);
  }

  static forbidden(message: string) {
    return this.create(message, 403);
  }

  static notFound(message: string) {
    return this.create(message, 404);
  }

  static conflict(message: string) {
    return this.create(message, 409);
  }

  static fromError(error: unknown) {
    let code = 500;
    let message = "An error occurred";

    if (error instanceof PrismaClientKnownRequestError) {
      const codes: Record<string, number> = {
        P2002: 409,
        P2025: 404,
      };

      code = codes[error.code] ?? 500;
      message = (error.meta?.message as string) ?? error.message;
    } else if (error instanceof Error) {
      message = error.message;
    }

    return this.create(message, code);
  }
}

export type ApiResponse<T> = NextApiResponse<Response<T>>;
