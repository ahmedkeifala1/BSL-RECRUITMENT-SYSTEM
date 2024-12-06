import { getVacancyDetails } from "@/app/system/admin/vacancies/_lib/actions";
import { getResponseData } from "@/lib/shared/utils";
import React from "react";
import { getAuthJobSeeker } from "./_lib/actions";
import ApplicationForm from "./components/apply-form";
import UploadDocument from "@/app/system/user/files/components/manage/upload-document";
import ApplicationSuccess from "./components/apply-success";

type JobApplicationProps = {
  params: { id: string };
};

export default async function JobApplication({ params }: JobApplicationProps) {
  const [userData, jobData] = await Promise.all([
    getAuthJobSeeker(),
    getVacancyDetails({ id: params.id }),
  ]);
  const user = getResponseData(userData);

  if (!jobData.data || jobData.isFailure) {
    return <>Job not found</>;
  }
  const job = getResponseData(jobData);

  return (
    <>
      <header className="bg-blue-800 text-slate-200 p-4 sm:px-0">
        <div className="container text-center">
          <h1 className="font-bold text-xl">
            Applying for {job.job.title} Position
          </h1>
          <p className="text-slate-700"></p>
        </div>
      </header>

      <main className="container my-6 md:max-w-5xl space-y-4 px-6 md:p-0">
        <section id="job-details" className="border shadow p-6">
          <div className="grid grid.col-1 md:grid-cols-3">
            <p className="flex gap-3">
              <span>Employment type:</span>
              <strong>{job.employmentType.replaceAll("_", " ")}</strong>
            </p>
            <p className="flex gap-3">
              <span>Profession:</span>
              <strong>{job.profession}</strong>
            </p>
            <p className="flex gap-3">
              <span>Role:</span>
              <strong>{job.roleType.replaceAll("_", " ")}</strong>
            </p>
          </div>
        </section>

        <section id="personal-details" className="border shadow p-6">
          <h5 className="font-semibold text-sm text-slate-60">
            Applicant Details
          </h5>

          <div className="grid grid.col-1 md:grid-cols-3">
            <p className="flex gap-3">
              <span>Full name:</span>
              <strong>{user.fullName}</strong>
            </p>
            <p className="flex gap-3">
              <span>Email:</span>
              <strong>{user.email}</strong>
            </p>
          </div>
        </section>

        <section id="application-form">
          <ApplicationForm jobSeekerId={user.id} vacancyId={job.id} />
        </section>
      </main>

      <UploadDocument id={user.id} />

      <ApplicationSuccess />
    </>
  );
}
