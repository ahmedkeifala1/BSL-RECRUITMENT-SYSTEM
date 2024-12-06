import Header from "@/app/system/components/header";
import React from "react";
import NavActionButton from "@/components/system/nav-action-button";
import { getLoggedUser } from "@/app/auth/_lib/actions";
import { getVacancyDetails } from "../_lib/actions";
import { getResponseData } from "@/lib/shared/utils";
import VacancyDetails from "./components/vacancy-details";
import { getLoggedAdmin } from "../../_lib/actions";
import ChangeVacancyStatusPage from "../components/manage/change-status-modal";
import { IconButton } from "@/components/custom";

type JobDetailsPageProps = {
  params: { id: string };
  searchParams: { status: string };
};

export default async function JobDetailsPage({
  params,
  searchParams,
}: JobDetailsPageProps) {
  const [userData, adminData, jobData] = await Promise.all([
    getLoggedUser(),
    getLoggedAdmin(),
    getVacancyDetails({ id: params.id }),
  ]);
  const user = getResponseData(userData);
  const vacancy = getResponseData(jobData);
  const admin = getResponseData(adminData);
  const isDirector = admin.role === "Manager";

  return (
    <>
      <Header
        returnUrl="/"
        title={vacancy.job.title}
        returnContent="Back to vacancies"
      >
        <div className="flex gap-2">
          <IconButton
            isIconOnly={false}
            color="primary"
            variant="solid"
            className="font-semibold"
            isDisabled={vacancy.applicants < 1}
            endContent={
              <span className="bg-default px-1 text-foreground rounded-sm">
                {vacancy.applicants}
              </span>
            }
          >
            Applicants
          </IconButton>
          {isDirector && (
            <NavActionButton
              color="warning"
              variant="solid"
              nav={[
                { key: "id", value: vacancy.id },
                { key: "status", value: vacancy.status },
              ]}
            >
              Change status
            </NavActionButton>
          )}
          <NavActionButton
            color="primary"
            variant="flat"
            nav={[
              { key: "v", value: "edit" },
              { key: "id", value: vacancy.id },
            ]}
          >
            Edit
          </NavActionButton>
        </div>
      </Header>

      <VacancyDetails vacancy={vacancy} user={user} />

      {isDirector && searchParams.status && <ChangeVacancyStatusPage />}
    </>
  );
}
