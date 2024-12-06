"use server";

import Database from "@/lib/backend/database/db-context";
import { ErrorResponse, OkResponse } from "@/lib/shared/response";
import { Prisma } from "@prisma/client";
import { AddEditListing } from "../../../jobs/[id]/_lib/schema";

export async function getListing(where: Prisma.JobListingWhereUniqueInput) {
  return Database.jobListing
    .findUniqueOrThrow({
      where,
    })
    .then(
      (data) => OkResponse.create(data),
      (error) => ErrorResponse.fromError(error)
    )
    .catch((error) => ErrorResponse.fromError(error));
}

export async function addListing(data: AddEditListing) {
  return Database.jobListing
    .create({
      data,
      select: {
        type: true,
      },
    })
    .then(
      (created) =>
        OkResponse.created(true, `${created.type} added successfully`),
      (error) => ErrorResponse.fromError(error)
    )
    .catch((error) => ErrorResponse.fromError(error));
}

export async function updateListing(
  where: Prisma.JobListingWhereUniqueInput,
  data: AddEditListing
) {
  return Database.jobListing
    .update({
      where,
      data,
      select: {
        type: true,
      },
    })
    .then(
      (created) =>
        OkResponse.create(true, {
          message: `${created.type} updated successfully`,
        }),
      (error) => ErrorResponse.fromError(error)
    )
    .catch((error) => ErrorResponse.fromError(error));
}

export async function removeListing(where: Prisma.JobListingWhereUniqueInput) {
  return Database.jobListing
    .delete({
      where,
      select: {
        type: true,
      },
    })
    .then(
      (created) =>
        OkResponse.create(true, {
          message: `${created.type} removed successfully`,
        }),
      (error) => ErrorResponse.fromError(error)
    )
    .catch((error) => ErrorResponse.fromError(error));
}
