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
import ChangeStatusButton from "../../components/change-status-button";
import { Link } from "@nextui-org/react";

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

  return (
    <>
      <Header
        returnUrl="/"
        title={`${vacancy.job.title} (${vacancy.type})`}
        returnContent="Back to vacancies"
      >
        <div className="flex gap-2">
          <IconButton
            isIconOnly={false}
            color="primary"
            variant="solid"
            className="font-semibold"
            isDisabled={vacancy.applicants < 1}
            as={Link}
            href={`${vacancy.id}/applicants`}
            endContent={
              <span className="bg-default px-1 text-foreground rounded-sm">
                {vacancy.applicants}
              </span>
            }
          >
            Applicants
          </IconButton>
          <ChangeStatusButton
            role={admin.role}
            nav={[
              { key: "id", value: vacancy.id },
              { key: "status", value: vacancy.status },
            ]}
            showChildrenCondition={!!searchParams.status}
          >
            <ChangeVacancyStatusPage />
          </ChangeStatusButton>

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
    </>
  );
}
