import React from "react";
import NavActionButton from "@/components/system/nav-action-button";
import { Icon } from "@/lib/frontend/icons";
import { ListProps } from "@/lib/shared/types";
import { getPaginatedParams } from "@/lib/frontend/utils";
import { getJobSeekerFiles } from "./_lib/actions";
import { getResponseData } from "@/lib/shared/utils";
import FilesList from "./components/files-list";
import UploadDocument from "./components/manage/upload-document";
import RemoveDocument from "./components/manage/remove-document";
import Header from "../../components/header";
import Toolkit from "../../components/datagrid/toolkit";
import { getAuthJobSeeker } from "../../user/_lib/actions";

type FilesPageProps = ListProps;

export default async function FilesPage({ searchParams }: FilesPageProps) {
  const { skip, ...meta } = getPaginatedParams(searchParams);
  const jobSeeker = getResponseData(await getAuthJobSeeker());
  const [total, filesData] = await getJobSeekerFiles(
    { id: jobSeeker.id },
    {
      skip,
      take: meta.l,
      where: !meta.q
        ? undefined
        : {
            document: {
              OR: [
                {
                  name: {
                    contains: meta.q,
                    mode: "insensitive",
                  },
                },
                {
                  type: {
                    contains: meta.q,
                    mode: "insensitive",
                  },
                },
              ],
            },
          },
    }
  );
  const files = getResponseData(filesData, []);

  return (
    <>
      <div className="flex-1 flex flex-col gap-3">
        <Header title="Files" description="Manage your files">
          <NavActionButton
            variant="solid"
            nav={[{ key: "v", value: "upload" }]}
            startContent={<Icon name="PlusIcon" />}
          >
            Upload File
          </NavActionButton>
        </Header>

        <Toolkit />

        <div className="flex-1">
          <FilesList files={files} meta={{ ...meta, skip, total }} />
        </div>
      </div>

      <UploadDocument id={jobSeeker.id} />

      <RemoveDocument />
    </>
  );
}
