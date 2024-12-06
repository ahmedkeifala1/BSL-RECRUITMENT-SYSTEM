"use client";

import React from "react";
import { LoggedUser } from "@/app/auth/_lib/schemas";
import { VacancyDetail } from "../../_lib/schemas";
import JobDetails from "../../../jobs/[id]/components/job-details";

type VacancyDetailsProps = {
  vacancy: VacancyDetail;
  user?: LoggedUser;
};

export default function VacancyDetails({ vacancy, user }: VacancyDetailsProps) {
  const isAdmin = user?.userType === "Admin";

  return (
    <>
      <div className="py-6 space-y-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <p className="flex gap-2">
            <span className="font-semibold text-slate-700">Date posted:</span>
            <strong>{vacancy.postedAt.toDateString()}</strong>
          </p>

          {isAdmin && (
            <p className="flex gap-2">
              <span className="font-semibold text-slate-700">Status:</span>
              <strong>{vacancy.status.replaceAll("_", " ")}</strong>
            </p>
          )}

          <p className="flex gap-2">
            <span className="font-semibold text-slate-700">
              Employment type:
            </span>
            <strong>{vacancy.employmentType.replaceAll("_", " ")}</strong>
          </p>

          <p className="flex gap-2">
            <span className="font-semibold text-slate-700">Role type:</span>
            <strong>{vacancy.roleType.replaceAll("_", " ")}</strong>
          </p>

          <p className="flex gap-2">
            <span className="font-semibold text-slate-700">Profession:</span>
            <strong>{vacancy.profession}</strong>
          </p>

          <p className="flex gap-2">
            <span className="font-semibold text-slate-700">Date posted:</span>
            <strong>{vacancy.deadline.toDateString()}</strong>
          </p>
        </div>
      </div>

      <JobDetails job={vacancy.job} user={user} showDescription={false} />
    </>
  );
}
