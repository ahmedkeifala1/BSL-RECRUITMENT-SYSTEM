import React from "react";
import Header from "../../components/header";
import { Icon } from "@/lib/frontend/icons";
import Toolkit from "../../components/datagrid/toolkit";
import { getResponseData } from "@/lib/shared/utils";
import { getPaginatedParams } from "@/lib/frontend/utils";
import { ListProps } from "@/lib/shared/types";
import { getAuthJobSeeker } from "../_lib/actions";
import { getJobSeekerApplications } from "./_lib/actions";
import { ApplicationStatus } from "@prisma/client";
import ApplicationsList from "./components/list-application";
import { IconButton } from "@/components/custom";
import { Link } from "@nextui-org/react";

type ApplicationsPageProps = ListProps;

export default async function ApplicationsPage({
  searchParams,
}: ApplicationsPageProps) {
  const { skip, ...meta } = getPaginatedParams(searchParams);
  const jobSeeker = getResponseData(await getAuthJobSeeker());
  const [total, applicationsData] = await getJobSeekerApplications(
    { id: jobSeeker?.id || "" },
    {
      skip,
      take: meta.l,
      where: !meta.q
        ? undefined
        : {
            OR: [
              {
                status: {
                  equals: meta.q as ApplicationStatus,
                },
              },
              {
                vacancy: {
                  job: {
                    title: {
                      mode: "insensitive",
                      contains: meta.q,
                    },
                  },
                },
              },
            ],
          },
    }
  );
  const applications = getResponseData(applicationsData, []);

  return (
    <>
      <div className="flex-1 flex flex-col gap-3">
        <Header
          title="Applications"
          description="Manage applications you have submitted"
        >
          <IconButton
            as={Link}
            href="/jobs"
            color="success"
            variant="solid"
            isIconOnly={false}
            startContent={<Icon name="PlusIcon" />}
            className="gap-0 font-semibold"
          >
            Apply
          </IconButton>
        </Header>

        <Toolkit />

        <div className="flex-1">
          <ApplicationsList
            applications={applications}
            meta={{ ...meta, skip, total }}
          />
        </div>
      </div>
    </>
  );
}
