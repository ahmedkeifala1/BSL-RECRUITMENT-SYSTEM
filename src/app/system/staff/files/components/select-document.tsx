"use client";

import { Prisma } from "@prisma/client";
import React, { PropsWithChildren } from "react";
import { getJobSeekerFiles } from "../_lib/actions";
import { getResponseData } from "@/lib/shared/utils";
import { useQuery } from "@tanstack/react-query";
import Placeholder from "@/components/placeholder";
import { cn, InputProps, Link } from "@nextui-org/react";
import DocumentIcon from "@/app/system/components/document-icon";
import { Drop } from "@/lib/shared/types";
import { JobSeekerDocumentDetail } from "../../_lib/schema";
import NavActionButton from "@/components/system/nav-action-button";
import { Icon } from "@/lib/frontend/icons";
import { IconButton } from "@/components/custom";

type DocumentsRadioProps = {
  jobSeekerId: string;
  type: "radio" | "checkbox";
  valueKey?: keyof JobSeekerDocumentDetail;
  where?: Prisma.JobSeekerDocumentWhereInput;
  props?: Drop<React.ComponentProps<"input">, "type">;
  invalid?: Pick<InputProps, "isInvalid" | "errorMessage">;
};

type CustomRadioProps = PropsWithChildren & {
  description?: string;
  props: React.ComponentProps<"input">;
};

function SelectDocumentItem({
  children,
  description,
  props: { className, ...props },
}: CustomRadioProps) {
  const id = props.id ?? props.name?.replace(" ", "-");

  return (
    <div className="flex flex-col">
      <input {...props} id={id} hidden={true} className="peer" />

      <label
        htmlFor={id}
        className={cn(
          className,
          "peer-checked:border-primary rounded",
          "cursor-pointer border-2 max-w-[96px] truncate p-1 text-center hover:bg-content2"
        )}
      >
        {children}
        <small className="text-slate-400">{description}</small>
      </label>
    </div>
  );
}

export default function SelectDocument({
  type,
  where,
  invalid,
  jobSeekerId,
  valueKey = "id",
  props,
}: DocumentsRadioProps) {
  const { data, refetch, isLoading, isFetching } = useQuery({
    enabled: jobSeekerId?.length > 0,
    queryKey: [jobSeekerId, where],
    queryFn: () => getJobSeekerFiles({ id: jobSeekerId }, { where }),
  });
  const files = getResponseData(data?.[1], []);

  return (
    <div className="space-y-1">
      <div className="flex justify-between items-end">
        <p className="text-sm font-semibold">{props?.title}</p>
        <IconButton onPress={() => refetch()} color="primary">
          Refresh
        </IconButton>
      </div>

      <Placeholder condition={!data || isLoading || isFetching}>
        <div className="flex gap-3 flex-wrap items-center">
          {files.map((file) => (
            <SelectDocumentItem
              key={file.id}
              description={file.name}
              props={{
                ...props,
                type,
                id: file.id,
                value: file[valueKey].toString(),
              }}
            >
              <div>
                <DocumentIcon type={file.documentType} size={90} />
                <Link
                  href={`?preview=${file.url}`}
                  className="text-sm underline"
                >
                  View
                </Link>
              </div>
            </SelectDocumentItem>
          ))}

          <NavActionButton
            nav={[
              {
                key: "v",
                value: "upload",
              },
            ]}
            className="rounded-full gap-1 font-bold"
            startContent={<Icon name="PlusIcon" />}
          >
            New
          </NavActionButton>
        </div>
      </Placeholder>

      {invalid && invalid.isInvalid && (
        <small className="text-danger">
          {invalid?.errorMessage?.toString()}
        </small>
      )}
    </div>
  );
}
