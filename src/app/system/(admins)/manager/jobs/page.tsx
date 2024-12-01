import { PlusIcon } from "lucide-react";
import React from "react";
import NavActionButton from "@/components/system/nav-action-button";
import { countJobs, listJobs } from "./_lib/actions";
import { getPaginatedParams } from "@/lib/core/utils";
import { ListProps } from "@/lib/core/types";
import JobStatusButton from "./components/job-status-button";
import Header from "@/app/system/components/header";
import ListJobs from "./components/list";
import { JobStatus } from "@prisma/client";
import Toolkit from "@/app/system/components/datagrid/toolkit";
import { getResponseData } from "@/lib/core/functions";

type JobsPageProps = ListProps<{ f: JobStatus }>;

export default async function JobsPage({ searchParams }: JobsPageProps) {
  const { f, skip, order, ...meta } = getPaginatedParams(searchParams);

  const res = await listJobs({
    skip,
    orderBy: order,
    take: meta.l,
    where: {
      status: f as JobStatus,
    },
  });
  const jobs = getResponseData(res);
  const counts = await countJobs();
  const totals = getResponseData(counts);
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
          <JobStatusButton
            isActive={!f}
            title="All Jobs"
            total={totals.reduce((a, b) => a + b.total, 0)}
          />

          {Object.keys(JobStatus)
            .sort((a, b) => a.localeCompare(b))
            .map((status) => (
              <JobStatusButton
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
        <ListJobs jobs={jobs} meta={{ ...meta, skip, total }} />
      </div>
    </div>
  );
}
