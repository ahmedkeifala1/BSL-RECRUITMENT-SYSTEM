import React from "react";
import SortJobsField from "./components/sort-jobs-field";
import { Link } from "@nextui-org/react";
import { getVacancies } from "./_lib/actions";
import { getResponseData } from "@/lib/shared/utils";
import { GridPaginateMeta, ListProps } from "@/lib/shared/types";
import {
  getPaginatedParams,
  getShowingRecordsText,
} from "@/lib/frontend/utils";
import OpenPaging from "./components/open-paging";

type JobsPageProps = ListProps;

export default async function JobsPage({ searchParams }: JobsPageProps) {
  const { skip, o, ...meta } = getPaginatedParams(searchParams);
  const [total, vacanciesData] = await getVacancies({
    orderBy: {
      postedAt: o === "oldest" ? "asc" : "desc",
    },
  });
  const vacancies = getResponseData(vacanciesData, []);

  return (
    <div className="container p-6 sm:px-0 flex-1 space-y-4">
      <header className="border bg-white shadow-sm px-4 py-2 flex items-center justify-between">
        <p className="text-slate-600 font-semibold">
          {getShowingRecordsText({
            l: meta.l,
            skip,
            total,
          } as GridPaginateMeta)}
        </p>

        <SortJobsField />
      </header>

      <main className="shadow border last:border-0">
        {vacancies.map((vacancy) => (
          <Link
            key={vacancy.id}
            href={`jobs/${vacancy.id}`}
            className="border-b flex-col gap-2 items-start cursor-pointer hover:bg-gray-100 p-4"
          >
            <div className="flex gap-3 justify-between items-end w-full">
              <h2 className="text-lg font-semibold">{vacancy.job.title}</h2>
              <p className="text-sm flex gap-1 text-warning">
                <span>Deadline:</span>
                <strong>{vacancy.deadline.toDateString()}</strong>
              </p>
            </div>
            <div className="space-y-3">
              <p className="description">{vacancy.job.description}</p>
              <p className="text-base text-secondary hover:underline">
                See details
              </p>
            </div>
          </Link>
        ))}

        {total > meta.l && (
          <div className="flex justify-end py-2 px-4">
            <OpenPaging meta={{ page: meta.p, limit: meta.l, total }} />
          </div>
        )}
      </main>
    </div>
  );
}
