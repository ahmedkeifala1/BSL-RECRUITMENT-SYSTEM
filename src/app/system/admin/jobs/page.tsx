import { PlusIcon } from "lucide-react";
import React from "react";
import NavActionButton from "@/components/system/nav-action-button";
import { countJobs, listJobs } from "./_lib/actions";
import { getPaginatedParams } from "@/lib/frontend/utils";
import { ListProps } from "@/lib/shared/types";
import CategoryButton from "../../components/category-button";
import Header from "@/app/system/components/header";
import JobsList from "./components/jobs-list";
import { JobStatus, Prisma } from "@prisma/client";
import Toolkit from "@/app/system/components/datagrid/toolkit";
import { getResponseData } from "@/lib/shared/utils";

type JobsPageProps = ListProps<{ f: JobStatus }>;

export default async function JobsPage({ searchParams }: JobsPageProps) {
  const { f, skip, order, ...meta } = getPaginatedParams(searchParams);
  const where: Prisma.JobWhereInput = {
    title: { mode: "insensitive", contains: meta.q },
  };

  const [jobsData, totalsData] = await Promise.all([
    listJobs({
      skip,
      take: meta.l,
      orderBy: order,
      where: {
        status: f as JobStatus,
        OR: !meta.q ? undefined : [{ ...where }],
      },
    }),
    countJobs(where),
  ]);

  const jobs = getResponseData(jobsData);
  const totals = getResponseData(totalsData, []);
  const total = totals
    .filter((t) => (f ? f === t.status : true))
    .reduce((a, b) => a + b.total, 0);

  return (
    <div className="space-y-4">
      <Header title="Jobs" description="Manage all positions available as jobs">
        <NavActionButton
          color="primary"
          variant="solid"
          className="gap-1 font-semibold"
          nav={[{ key: "v", value: "create" }]}
          startContent={<PlusIcon size={15} />}
        >
          New Job
        </NavActionButton>
      </Header>

      <Toolkit>
        <div className="space-x-2">
          <CategoryButton
            isActive={!f}
            title="All Jobs"
            total={totals.reduce((a, b) => a + b.total, 0)}
          />

          {Object.keys(JobStatus)
            .sort((a, b) => a.localeCompare(b))
            .map((status) => (
              <CategoryButton
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
        <JobsList jobs={jobs} meta={{ ...meta, skip, total }} />
      </div>
    </div>
  );
}
