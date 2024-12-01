import Header from "@/app/system/components/header";
import React from "react";
import { getJobDetails } from "../_lib/actions";
import { getResponseData } from "@/lib/core/functions";
import NavActionButton from "@/components/system/nav-action-button";
import JobDetails from "./components/job-details";
import { getLoggedUser } from "@/app/auth/_lib/actions";

type JobDetailsPageProps = {
  params: { id: string };
};

export default async function JobDetailsPage({ params }: JobDetailsPageProps) {
  const user = await getLoggedUser();
  const res = await getJobDetails({ id: params.id });
  const job = getResponseData(res);

  return (
    <>
      <Header returnUrl="/" title={job.title} returnContent="Back to jobs">
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
      </Header>

      <JobDetails job={job} user={getResponseData(user)} />
    </>
  );
}
