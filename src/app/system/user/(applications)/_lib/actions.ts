"use server";

import Database from "@/lib/backend/database/db-context";
import Response, { ErrorResponse, OkResponse } from "@/lib/shared/response";
import { Drop } from "@/lib/shared/types";
import { Prisma } from "@prisma/client";
import { UploadJobSeekerDocument } from "./schema";
import { fromFormData } from "@/lib/frontend/utils";
import FileService from "@/lib/backend/services/file-service";
import { ListApplication } from "@/app/system/_lib/schema";

export async function getJobSeekerApplications(
  where: Prisma.JobSeekerWhereUniqueInput,
  args?: Drop<Prisma.ApplicationFindManyArgs, "select" | "include">
): Promise<[number, Response<ListApplication[] | null>]> {
  return Promise.all([
    Database.application.count({
      where: {
        ...args?.where,
        jobSeeker: where,
      },
    }),

    Database.application
      .findMany({
        where: {
          ...args?.where,
          jobSeeker: where,
        },
        include: {
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
        (res) =>
          OkResponse.create(
            res.map<ListApplication>(
              ({ vacancy: { job }, ...application }) => ({
                ...application,
                job: job.title,
              })
            )
          ),
        (error) => ErrorResponse.fromError(error)
      )
      .catch((error) => ErrorResponse.fromError(error)),
  ]);
}

export async function uploadFile(form: FormData) {
  const { file, ...data } = fromFormData<UploadJobSeekerDocument>(form);
  const fileService = new FileService(file);

  return Database.document
    .create({
      data: {
        name: data.name,
        size: file.size,
        type: file.type,
        url: fileService.filePath,
        jobSeekers: {
          create: {
            type: data.type,
            jobSeekerId: data.jobSeekerId,
          },
        },
      },
    })
    .then(
      () => {
        fileService.upload();

        return OkResponse.created(true, "Document uploaded successfully");
      },
      (error) => ErrorResponse.fromError(error)
    )
    .catch((error) => ErrorResponse.fromError(error));
}

export async function removeDocument(
  where: Prisma.JobSeekerDocumentWhereUniqueInput
) {
  return Database.jobSeekerDocument
    .delete({
      where,
      select: {
        document: {
          select: {
            name: true,
            url: true,
          },
        },
      },
    })
    .then(
      (res) => {
        FileService.removeFile(res.document.url);
        return OkResponse.create(true, {
          message: `${res.document.name} remove successfully`,
        });
      },
      (error) => ErrorResponse.fromError(error)
    )
    .catch((error) => ErrorResponse.fromError(error));
}
