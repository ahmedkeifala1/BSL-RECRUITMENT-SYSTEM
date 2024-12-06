import {
  getPaginatedParams,
  getShowingRecordsText,
} from "@/lib/frontend/utils";
import { GridPaginateMeta, ListProps } from "@/lib/shared/types";
import React from "react";
import { getVacancyApplicants } from "../../_lib/actions";
import { getResponseData } from "@/lib/shared/utils";
import Header from "@/app/system/components/header";

type VacancyApplicantsPageProps = ListProps & {
  params: { id: string };
};

export default async function VacancyApplicantsPage({
  params,
  searchParams,
}: VacancyApplicantsPageProps) {
  const { skip, ...meta } = getPaginatedParams(searchParams);
  const vacancyData = await getVacancyApplicants(
    { id: params.id },
    {
      skip,
      take: 1,
      where: {
        status: {
          notIn: ["Hired", "Shortlisted"],
        },
        OR: !meta.q
          ? undefined
          : [
              {
                jobSeeker: {
                  OR: [
                    { email: { mode: "insensitive", contains: meta.q } },
                    { firstName: { mode: "insensitive", contains: meta.q } },
                  ],
                },
              },
            ],
      },
    }
  );
  const { total, vacancy } = getResponseData(vacancyData);

  return (
    <div className="space-y-4">
      <Header
        title={`${vacancy.job.title} Applicants`}
        description={`Manage all applicants for the ${vacancy.job.title} vacancy`}
      >
        Pagination controls here
        <div className="flex">
          <p>
            {getShowingRecordsText({ l: 1, skip, total } as GridPaginateMeta)}
          </p>
        </div>
      </Header>
    </div>
  );
}
