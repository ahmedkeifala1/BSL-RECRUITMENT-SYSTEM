"use server";

import Database from "@/lib/backend/database/db-context";
import Response, { ErrorResponse, OkResponse } from "@/lib/shared/response";
import { Drop } from "@/lib/shared/types";
import { Prisma } from "@prisma/client";
import { AddEditStaff } from "./schema";
import { generateOtp, hashPassword, raise } from "@/lib/backend/utils";
import StaffEvent from "./events";
import { SelectObject } from "@/components/system/dynamic-select-field";

export async function getSelectStaff(
  args?: Drop<Prisma.StaffFindManyArgs, "select" | "include">
): Promise<Response<SelectObject[] | null>> {
  return Database.staff
    .findMany({
      ...args,
      select: {
        id: true,
        fullName: true,
      },
    })
    .then(
      (jobs) =>
        OkResponse.create(
          jobs.map(({ fullName, ...job }) => ({ ...job, name: fullName }))
        ),
      (error) => ErrorResponse.fromError(error)
    )
    .catch((error) => ErrorResponse.fromError(error));
}

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
  const plain = generateOtp();
  const password = await hashPassword(plain);

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
      select: {
        designation: true,
        email: true,
        fullName: true,
      },
    })
    .then(
      (created) => {
        raise(StaffEvent.staffCreated, { ...created, password: plain });
        return OkResponse.created(true, "Staff added successfully");
      },
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
      select: {
        email: true,
      },
    })
    .then(
      (deleted) => {
        raise(StaffEvent.staffDeleted, deleted);

        return OkResponse.create(true, {
          message: "Staff removed successfully",
        });
      },
      (error) => ErrorResponse.fromError(error)
    );
}
