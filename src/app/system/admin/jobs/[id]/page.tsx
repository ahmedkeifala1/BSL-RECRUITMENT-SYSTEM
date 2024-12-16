import Header from "@/app/system/components/header";
import React from "react";
import { getJobDetails } from "../_lib/actions";
import NavActionButton from "@/components/system/nav-action-button";
import JobDetails from "./components/job-details";
import { getLoggedUser } from "@/app/auth/_lib/actions";
import { getResponseData } from "@/lib/shared/utils";
import { getLoggedAdmin } from "../../_lib/actions";
import ChangeJobStatusPage from "../components/manage/change-status-modal";
import ChangeStatusButton from "../../components/change-status-button";

type JobDetailsPageProps = {
  params: { id: string };
};

export default async function JobDetailsPage({ params }: JobDetailsPageProps) {
  const [userData, adminData, jobData] = await Promise.all([
    getLoggedUser(),
    getLoggedAdmin(),
    getJobDetails({ id: params.id }),
  ]);
  const job = getResponseData(jobData);
  const user = getResponseData(userData);
  const admin = getResponseData(adminData);

  return (
    <>
      <Header returnUrl="/" title={job.title} returnContent="Back to jobs">
        <div className="flex gap-2">
          <ChangeStatusButton
            role={admin.role}
            nav={[
              { key: "id", value: job.id },
              { key: "status", value: job.status },
            ]}
          >
            <ChangeJobStatusPage />
          </ChangeStatusButton>

          <NavActionButton
            color="primary"
            variant="flat"
            nav={[
              { key: "v", value: "edit" },
              { key: "id", value: job.id },
            ]}
          >
            Edit
          </NavActionButton>
        </div>
      </Header>

      <JobDetails job={job} user={user} />
    </>
  );
}
