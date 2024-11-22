import { PrismaClient } from "@prisma/client";
import ClientExtensions from "../base/extensions";

function getPrismaClient() {
  return new PrismaClient();
}

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const Database = global.prisma ?? getPrismaClient();

if (process.env.NODE_ENV === "development") {
  global.prisma = Database;
}

export default Database;

export const ClientDatabase = Database.$extends(ClientExtensions);
