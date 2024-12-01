"use server";

import Database from "@/lib/core/db-context";
import { AddEditJob, JobDetail, ListJob } from "./schemas";
import Response, { ErrorResponse, OkResponse } from "@/lib/base/response";
import { Drop } from "@/lib/core/types";
import { JobListingType, Prisma } from "@prisma/client";
import { JobListings } from "../[id]/_lib/schema";
import { SelectObject } from "@/components/system/dynamic-select-field";

export async function getSelectJobs(
  args?: Drop<Prisma.JobFindManyArgs, "select" | "include">
): Promise<Response<SelectObject[] | null>> {
  return Database.job
    .findMany({
      ...args,
      select: {
        id: true,
        title: true,
      },
    })
    .then(
      (jobs) =>
        OkResponse.create(
          jobs.map(({ title, ...job }) => ({ ...job, name: title }))
        ),
      (error) => ErrorResponse.fromError(error)
    )
    .catch((error) => ErrorResponse.fromError(error));
}

export async function getJobDetails(
  where: Prisma.JobWhereUniqueInput
): Promise<Response<JobDetail | null>> {
  return Database.job
    .findUniqueOrThrow({
      where,
      include: {
        listings: true,
      },
    })
    .then(
      ({ listings, ...job }) => {
        const grouped = Object.keys(JobListingType).map<JobListings>((key) => ({
          key: key as JobListingType,
          listings: listings.filter((l) => l.type === key),
        }));

        return OkResponse.create({
          ...job,
          listings: grouped,
        });
      },
      (error) => ErrorResponse.fromError(error)
    )
    .catch((error) => ErrorResponse.fromError(error));
}

export async function getJob(where: Prisma.JobWhereUniqueInput) {
  return Database.job
    .findUniqueOrThrow({
      where,
      omit: {
        updatedAt: true,
        createdAt: true,
      },
    })
    .then(
      (job) => OkResponse.create(job),
      (error) => ErrorResponse.fromError(error)
    )
    .catch((error) => ErrorResponse.fromError(error));
}

export async function addJob(data: AddEditJob) {
  return Database.job
    .create({
      data,
    })
    .then(
      () => OkResponse.created(true, "New Job created successfully"),
      (error) => ErrorResponse.fromError(error)
    )
    .catch((error) => ErrorResponse.fromError(error));
}

export async function updateJob(
  where: Prisma.JobWhereUniqueInput,
  data: AddEditJob
) {
  return Database.job
    .update({
      where,
      data,
    })
    .then(
      () => OkResponse.created(true, "Job updated successfully"),
      (error) => ErrorResponse.fromError(error)
    )
    .catch((error) => ErrorResponse.fromError(error));
}

export async function deleteJob(where: Prisma.JobWhereUniqueInput) {
  return Database.job
    .delete({
      where,
    })
    .then(
      () => OkResponse.created(true, "Job deleted successfully"),
      (error) => ErrorResponse.fromError(error)
    )
    .catch((error) => ErrorResponse.fromError(error));
}

export async function listJobs(
  args?: Drop<Prisma.JobFindManyArgs, "select" | "include">
): Promise<Response<ListJob[] | null>> {
  return Database.job
    .findMany({
      ...args,
      omit: {
        updatedAt: true,
      },
      include: {
        _count: {
          select: {
            vacancies: true,
          },
        },
      },
    })
    .then(
      (jobs) =>
        OkResponse.create(
          jobs.map(({ _count, ...job }) => ({
            ...job,
            vacancies: _count.vacancies,
          }))
        ),
      (error) => ErrorResponse.fromError(error)
    )
    .catch((error) => ErrorResponse.fromError(error));
}

export async function countJobs(where?: Prisma.JobWhereInput) {
  return Database.job
    .groupBy({
      where,
      by: "status",
      orderBy: {
        status: "asc",
      },
      _count: true,
    })
    .then(
      (res) =>
        OkResponse.create(
          res.map(({ _count, ...count }) => ({ ...count, total: _count }))
        ),
      (error) => ErrorResponse.fromError(error)
    )
    .catch((error) => ErrorResponse.fromError(error));
}
