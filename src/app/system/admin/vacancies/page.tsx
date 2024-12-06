import { PlusIcon } from "lucide-react";
import React from "react";
import NavActionButton from "@/components/system/nav-action-button";
import { countVacancies, listVacancies } from "./_lib/actions";
import { getPaginatedParams } from "@/lib/frontend/utils";
import { ListProps } from "@/lib/shared/types";
import VacancyStatusButton from "./components/vacancy-status-button";
import Header from "@/app/system/components/header";
import ListVacancies from "./components/vacancies-list";
import { VacancyStatus, Prisma } from "@prisma/client";
import Toolkit from "@/app/system/components/datagrid/toolkit";
import { getResponseData } from "@/lib/shared/utils";

type VacanciesPageProps = ListProps<{ f: VacancyStatus }>;

export default async function VacanciesPage({
  searchParams,
}: VacanciesPageProps) {
  const { f, skip, order, ...meta } = getPaginatedParams(searchParams);
  const where: Prisma.VacancyWhereInput = {
    job: { title: { mode: "insensitive", contains: meta.q } },
  };

  const [vacanciesData, totalsData] = await Promise.all([
    listVacancies({
      skip,
      take: meta.l,
      orderBy: order,
      where: {
        status: f as VacancyStatus,
        OR: !meta.q ? undefined : [{ ...where }],
      },
    }),
    countVacancies(where),
  ]);

  const vacancies = getResponseData(vacanciesData, []);
  const totals = getResponseData(totalsData, []);
  const total = totals
    .filter((t) => (f ? f === t.status : true))
    .reduce((a, b) => a + b.total, 0);

  return (
    <div className="space-y-4">
      <Header
        title="Vacancies"
        description="Manage all jobs available as vacancies"
      >
        <NavActionButton
          color="primary"
          variant="solid"
          className="gap-1 font-semibold"
          nav={[{ key: "v", value: "create" }]}
          startContent={<PlusIcon size={15} />}
        >
          New Vacancy
        </NavActionButton>
      </Header>

      <Toolkit>
        <div className="space-x-2">
          <VacancyStatusButton
            isActive={!f}
            title="All Vacancies"
            total={totals.reduce((a, b) => a + b.total, 0)}
          />

          {Object.keys(VacancyStatus)
            .sort((a, b) => a.localeCompare(b))
            .map((status) => (
              <VacancyStatusButton
                id={status}
                key={status}
                isActive={status === f}
                title={status.replaceAll("_", " ")}
                total={totals.find((t) => t.status === status)?.total ?? 0}
              />
            ))}
        </div>
      </Toolkit>

      <div className="flex-1">
        <ListVacancies vacancies={vacancies} meta={{ ...meta, skip, total }} />
      </div>
    </div>
  );
}
