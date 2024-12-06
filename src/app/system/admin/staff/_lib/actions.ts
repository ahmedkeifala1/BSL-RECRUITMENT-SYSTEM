"use server";

import Database from "@/lib/backend/database/db-context";
import { ErrorResponse, OkResponse } from "@/lib/shared/response";
import { Drop } from "@/lib/shared/types";
import { Prisma } from "@prisma/client";
import { AddEditStaff } from "./schema";
import { hashPassword } from "@/lib/backend/utils";

export async function getStaff(where: Prisma.StaffWhereUniqueInput) {
  return Database.staff
    .findUnique({ where })
    .then(
      (staff) => OkResponse.create(staff),
      (error) => ErrorResponse.fromError(error)
    )
    .catch((error) => ErrorResponse.fromError(error));
}

export async function listStaff(
  args?: Drop<Prisma.StaffFindManyArgs, "select" | "include">
) {
  return Promise.all([
    Database.staff.count({ where: args?.where }),
    Database.staff
      .findMany({
        ...args,
        include: {
          admin_details: true,
        },
      })
      .then(
        (staff) =>
          OkResponse.create(
            staff.map(({ admin_details, ...s }) => ({
              ...s,
              isAdmin: !!admin_details,
            }))
          ),
        (error) => ErrorResponse.fromError(error)
      )
      .catch((error) => ErrorResponse.fromError(error)),
  ]);
}

export async function addStaff({ title, ...data }: AddEditStaff) {
  const password = await hashPassword("Staff@2024!");

  return Database.staff
    .create({
      data: {
        ...data,
        title: title || "Mr.",
        account: {
          create: {
            password,
            email: data.email,
            userType: "Staff",
            fullName: data.fullName,
            isEmailVerified: false,
          },
        },
      },
    })
    .then(
      () => OkResponse.created(true, "Staff added successfully"),
      (error) => ErrorResponse.fromError(error)
    )
    .catch((error) => ErrorResponse.fromError(error));
}

export async function updateStaff(
  where: Prisma.StaffWhereUniqueInput,
  data: AddEditStaff
) {
  return Database.staff
    .update({
      where,
      data,
    })
    .then(
      () => OkResponse.create(true, { message: "Staff updated successfully" }),
      (error) => ErrorResponse.fromError(error)
    );
}

export async function removeStaff(where: Prisma.StaffWhereUniqueInput) {
  return Database.staff
    .delete({
      where,
    })
    .then(
      () => OkResponse.create(true, { message: "Staff removed successfully" }),
      (error) => ErrorResponse.fromError(error)
    );
}
