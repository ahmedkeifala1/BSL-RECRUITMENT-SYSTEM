"use server";

import Database from "@/lib/backend/database/db-context";
import {
  AddEditVacancy,
  VacancyDetail,
  ListVacancy,
  ChangeVacancyStatus,
} from "./schemas";
import Response, { ErrorResponse, OkResponse } from "@/lib/shared/response";
import { Drop } from "@/lib/shared/types";
import { JobListingType, Prisma } from "@prisma/client";
import { JobListings } from "../../jobs/[id]/_lib/schema";

export async function getVacancyDetails(
  where: Prisma.VacancyWhereUniqueInput
): Promise<Response<VacancyDetail | null>> {
  return Database.vacancy
    .findUniqueOrThrow({
      where,
      include: {
        job: {
          include: {
            listings: true,
          },
        },
        _count: {
          select: {
            applicants: true,
          },
        },
      },
    })
    .then(
      ({ _count, job: { listings, ...job }, ...vacancy }) => {
        const grouped = Object.keys(JobListingType).map<JobListings>((key) => ({
          key: key as JobListingType,
          listings: listings.filter((l) => l.type === key),
        }));

        return OkResponse.create({
          ...vacancy,
          applicants: _count.applicants,
          job: {
            ...job,
            listings: grouped,
          },
        });
      },
      (error) => ErrorResponse.fromError(error)
    )
    .catch((error) => ErrorResponse.fromError(error));
}

export async function getVacancy(where: Prisma.VacancyWhereUniqueInput) {
  return Database.vacancy
    .findUniqueOrThrow({
      where,
    })
    .then(
      (vacancy) => OkResponse.create(vacancy),
      (error) => ErrorResponse.fromError(error)
    )
    .catch((error) => ErrorResponse.fromError(error));
}

export async function addVacancy(data: AddEditVacancy) {
  return Database.vacancy
    .create({
      data,
    })
    .then(
      () => OkResponse.created(true, "New Vacancy created successfully"),
      (error) => ErrorResponse.fromError(error)
    )
    .catch((error) => ErrorResponse.fromError(error));
}

export async function updateVacancy(
  where: Prisma.VacancyWhereUniqueInput,
  data: AddEditVacancy
) {
  return Database.vacancy
    .update({
      where,
      data,
    })
    .then(
      () => OkResponse.created(true, "Vacancy updated successfully"),
      (error) => ErrorResponse.fromError(error)
    )
    .catch((error) => ErrorResponse.fromError(error));
}

export async function deleteVacancy(where: Prisma.VacancyWhereUniqueInput) {
  return Database.vacancy
    .delete({
      where,
    })
    .then(
      () => OkResponse.created(true, "Vacancy deleted successfully"),
      (error) => ErrorResponse.fromError(error)
    )
    .catch((error) => ErrorResponse.fromError(error));
}

export async function listVacancies(
  args?: Drop<Prisma.VacancyFindManyArgs, "select" | "include">
): Promise<Response<ListVacancy[] | null>> {
  return Database.vacancy
    .findMany({
      ...args,
      include: {
        _count: {
          select: {
            applicants: true,
          },
        },
        job: {
          select: {
            title: true,
          },
        },
      },
    })
    .then(
      (vacancies) =>
        OkResponse.create(
          vacancies.map<ListVacancy>(({ _count, job, ...vacancy }) => ({
            ...vacancy,
            job: job.title,
            applicants: _count.applicants,
          }))
        ),
      (error) => ErrorResponse.fromError(error)
    )
    .catch((error) => ErrorResponse.fromError(error));
}

export async function countVacancies(where?: Prisma.VacancyWhereInput) {
  return Database.vacancy
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

export async function changeVacancyStatus(
  where: Prisma.VacancyWhereUniqueInput,
  data: ChangeVacancyStatus
) {
  return Database.vacancy
    .update({
      where,
      data,
    })
    .then(
      () =>
        OkResponse.create(true, {
          message: `Vacancy status change to ${data.status} successfully`,
        }),
      (error) => ErrorResponse.fromError(error)
    )
    .catch((error) => ErrorResponse.fromError(error));
}

export async function getVacancyApplicants(
  where: Prisma.VacancyWhereUniqueInput,
  args?: Prisma.ApplicationFindManyArgs
) {
  return Promise.all([
    Database.application.count({
      where: {
        ...args?.where,
        vacancy: where,
      },
    }),
    Database.vacancy
      .findUniqueOrThrow({
        where,
        select: {
          roleType: true,
          employmentType: true,
          job: {
            select: {
              title: true,
            },
          },
          applicants: {
            ...args,
            orderBy: args?.orderBy ?? [
              { matchScore: { sort: "desc", nulls: "last" } },
            ],
            include: {
              coverLetter: true,
              documents: {
                include: {
                  document: true,
                },
              },
              cv: {
                include: {
                  document: true,
                },
              },
              jobSeeker: true,
            },
          },
        },
      })
      .then(
        (vacancy) => OkResponse.create(vacancy),
        (error) => ErrorResponse.fromError(error)
      )
      .catch((error) => ErrorResponse.fromError(error)),
  ]);
}
