"use server";

import { getLoggedUser } from "@/app/auth/_lib/actions";
import Database from "@/lib/backend/database/db-context";
import Response, { ErrorResponse, OkResponse } from "@/lib/shared/response";
import { ApplicantDetail, JobApplication } from "./schema";
import { raise } from "@/lib/backend/utils";
import ApplicationEvents from "./events";
import { ApplicationStatus, Prisma } from "@prisma/client";

export async function getAuthJobSeeker(): Promise<
  Response<ApplicantDetail | null>
> {
  const loggedUser = await getLoggedUser();

  if (loggedUser.isFailure || !loggedUser.data) {
    return ErrorResponse.create(loggedUser.message, loggedUser.code);
  }

  return Database.jobSeeker
    .findUnique({
      where: { email: loggedUser.data.email },
      include: {
        documents: {
          include: {
            document: true,
          },
        },
      },
    })
    .then(
      (user) => OkResponse.create(user),
      (error) => ErrorResponse.fromError(error)
    )
    .catch((error) => ErrorResponse.fromError(error));
}

export async function createApplication(data: JobApplication) {
  const { otherDocumentsId, ...application } = data;
  return Database.application
    .create({
      data: {
        ...application,
        documents: {
          createMany: {
            skipDuplicates: true,
            data: otherDocumentsId.map((id) => ({
              documentId: id,
            })),
          },
        },
      },
      select: {
        jobSeeker: {
          select: {
            email: true,
            fullName: true,
          },
        },
        vacancy: {
          select: {
            job: {
              select: {
                title: true,
              },
            },
          },
        },
      },
    })
    .then(
      ({ vacancy, jobSeeker }) => {
        raise(ApplicationEvents.applicationSubmitted, {
          ...jobSeeker,
          job: vacancy.job.title,
        });

        return OkResponse.created(true, "Application submitted successfully");
      },
      (error) => ErrorResponse.fromError(error)
    )
    .catch((error) => ErrorResponse.fromError(error));
}

export async function updateApplicationStatus(
  where: Prisma.ApplicationWhereUniqueInput,
  status: ApplicationStatus
) {
  return Database.application
    .update({
      where,
      data: {
        status,
      },
      select: {
        jobSeeker: {
          select: {
            email: true,
            fullName: true,
          },
        },
        vacancy: {
          select: {
            job: {
              select: {
                title: true,
              },
            },
          },
        },
      },
    })
    .then(
      ({ vacancy, jobSeeker }) => {
        raise(ApplicationEvents.applicationStatusChanged, {
          ...jobSeeker,
          status,
          job: vacancy.job.title,
        });
        return OkResponse.create(true, {
          message: `Application status change to ${status} successfully`,
        });
      },
      (error) => ErrorResponse.fromError(error)
    )
    .catch((error) => ErrorResponse.fromError(error));
}
