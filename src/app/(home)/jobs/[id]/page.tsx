import Header from "@/app/system/components/header";
import VacancyDetails from "@/app/system/admin/vacancies/[id]/components/vacancy-details";
import { getVacancyDetails } from "@/app/system/admin/vacancies/_lib/actions";
import { getResponseData } from "@/lib/shared/utils";
import React from "react";
import ApplyButton from "./components/apply-button";

type OpenJobDetailsProps = {
  params: { id: string };
};

export default async function OpenJobDetails({ params }: OpenJobDetailsProps) {
  const vacancyData = await getVacancyDetails({ id: params.id });
  const vacancy = getResponseData(vacancyData);

  return (
    <main className="container flex-1 my-6 p-6 border shadow">
      <Header
        returnUrl="/"
        title={vacancy.job.title}
        returnContent="Back to jobs"
      >
        <ApplyButton vacancyId={vacancy.id} />
      </Header>

      <div className="my-4">
        <VacancyDetails vacancy={vacancy} />

        <ApplyButton vacancyId={vacancy.id} />
      </div>
    </main>
  );
}
