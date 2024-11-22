import { Prisma } from "@prisma/client";

const ClientExtensions = Prisma.defineExtension((client) => {
  return client.$extends({
    name: "ClientExtensions",
    model: {
      $allModels: {
        exists<T>(
          this: T,
          args: Prisma.Args<T, "findFirst">
        ): Promise<boolean> {
          const context = Prisma.getExtensionContext(this);

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return (context as any).findFirst(args);
        },
      },
    },
  });
});

export default ClientExtensions;
