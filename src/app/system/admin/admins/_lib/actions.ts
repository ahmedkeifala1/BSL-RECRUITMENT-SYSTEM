"use server";

import Response, { ErrorResponse, OkResponse } from "@/lib/shared/response";
import Database from "@/lib/backend/database/db-context";
import { AdminRole, Prisma } from "@prisma/client";
import { Drop } from "@/lib/shared/types";
import { ListAdmin, NewAdmin } from "./schema";
import { raise } from "@/lib/backend/utils";
import AdminEvent from "./events";

export async function listAdmins(
  args?: Drop<Prisma.AdminFindManyArgs, "select" | "include">
): Promise<[number, Response<ListAdmin[] | null>]> {
  return Promise.all([
    Database.admin
      .count({
        where: args?.where,
      })
      .catch(() => 0),
    Database.admin
      .findMany({
        ...args,
        include: {
          staff: {
            select: {
              fullName: true,
              designation: true,
            },
          },
        },
      })
      .then(
        (res) =>
          OkResponse.create(
            res.map(({ staff, ...admin }) => ({ ...admin, ...staff }))
          ),
        (error) => ErrorResponse.fromError(error)
      )
      .catch((error) => ErrorResponse.fromError(error)),
  ]);
}

export async function getAdmin(where: Prisma.AdminWhereUniqueInput) {
  return Database.admin
    .findUniqueOrThrow({
      where,
      include: {
        staff: {
          omit: {
            id: true,
          },
        },
      },
    })
    .then(
      ({ staff, ...admin }) => OkResponse.create({ ...admin, ...staff }),
      (error) => ErrorResponse.fromError(error)
    )
    .catch((error) => ErrorResponse.fromError(error));
}

export async function createAdmin(data: NewAdmin) {
  return Database.admin
    .create({
      data,
      select: {
        staff: {
          select: {
            fullName: true,
            email: true,
          },
        },
      },
    })
    .then(
      ({ staff }) => {
        raise(AdminEvent.adminCreated, { ...staff, role: data.role });

        return OkResponse.created(
          true,
          `${staff.fullName} made admin successfully`
        );
      },
      (error) => ErrorResponse.fromError(error)
    )
    .catch((error) => ErrorResponse.fromError(error));
}

export async function changeRole(
  where: Prisma.AdminWhereUniqueInput,
  role: AdminRole
) {
  return Database.admin
    .update({
      where,
      data: {
        role,
      },
      select: {
        staff: {
          select: {
            fullName: true,
          },
        },
      },
    })
    .then(
      (updated) =>
        OkResponse.create(true, {
          message: `${updated.staff.fullName} role change to ${role} successfully`,
        }),
      (error) => ErrorResponse.fromError(error)
    )
    .catch((error) => ErrorResponse.fromError(error));
}

export async function deleteAdmin(where: Prisma.AdminWhereUniqueInput) {
  return Database.admin
    .delete({
      where,
      select: {
        staff: {
          select: {
            email: true,
            fullName: true,
          },
        },
      },
    })
    .then(
      ({ staff }) => {
        raise(AdminEvent.adminDeleted, { email: staff.email });

        return OkResponse.create(true, {
          message: `${staff.fullName} deleted successfully`,
        });
      },
      (error) => ErrorResponse.fromError(error)
    )
    .catch((error) => ErrorResponse.fromError(error));
}
