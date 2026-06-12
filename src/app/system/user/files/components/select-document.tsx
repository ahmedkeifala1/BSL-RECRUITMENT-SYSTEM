"use client";

import { Prisma } from "@prisma/client";
import React, { PropsWithChildren } from "react";
import { getJobSeekerFiles, removeDocument } from "../_lib/actions";
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
import { toast } from "react-toastify";
import ConfirmModal from "@/app/system/components/confirm-modal";

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
  onDelete?: () => void;
  props: React.ComponentProps<"input">;
};

function SelectDocumentItem({
  children,
  description,
  onDelete,
  props: { className, ref: externalRef, ...props },
}: CustomRadioProps) {
  const id = props.id ?? props.name?.replace(" ", "-");
  const internalRef = React.useRef<HTMLInputElement>(null);

  // Merge refs - use the external ref from react-hook-form if available
  const mergedRef = React.useCallback((node: HTMLInputElement | null) => {
    if (externalRef) {
      if (typeof externalRef === 'function') {
        externalRef(node);
      } else {
        externalRef.current = node;
      }
    }
    internalRef.current = node;
  }, [externalRef]);

  return (
    <div className="flex flex-col relative group">
      <input {...props} ref={mergedRef} id={id} hidden={true} className="peer" />

      <label
        htmlFor={id}
        className={cn(
          className,
          "peer-checked:border-primary rounded",
          "cursor-pointer border-2 max-w-[96px] truncate p-1 text-center hover:bg-content2 relative"
        )}
      >
        {children}
        <small className="text-slate-400 block">{description}</small>
      </label>
      
      {onDelete && (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            onDelete();
          }}
          className="absolute -top-2 -right-2 bg-danger text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
          title="Delete this document"
        >
          <Icon name="Trash2Icon" size={14} />
        </button>
      )}
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
    refetchOnWindowFocus: true,
    refetchOnMount: "stale",
  });
  const files = getResponseData(data?.[1], []);
  const [deleteTarget, setDeleteTarget] = React.useState<{
    id: string;
    name: string;
  } | null>(null);

  // Refetch when the upload dialog closes (v param removed from URL)
  React.useEffect(() => {
    const handleDocumentUploaded = () => refetch();
    window.addEventListener("documentUploaded", handleDocumentUploaded);
    return () => window.removeEventListener("documentUploaded", handleDocumentUploaded);
  }, [refetch]);

  // Auto-select the last uploaded document once the file list updates
  React.useEffect(() => {
    const lastUploaded = sessionStorage.getItem("lastUploadedDocument");
    if (!lastUploaded || files.length === 0) return;

    const matchedFile = files.find((f) => f.name === lastUploaded);
    if (!matchedFile) return;

    const fileInput = document.getElementById(matchedFile.id) as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
      toast.success(`${lastUploaded} selected automatically`);
      sessionStorage.removeItem("lastUploadedDocument");
    }
  }, [files]);

  async function handleDelete(fileId: string, fileName: string) {
    setDeleteTarget({ id: fileId, name: fileName });
  }

  async function confirmDelete() {
    if (!deleteTarget) return;

    const res = await removeDocument({ id: deleteTarget.id });

    if (res.isSuccess) {
      toast.success(`${deleteTarget.name} deleted successfully`);
      refetch();
    } else {
      toast.error(res.message || "Failed to delete document");
    }

    setDeleteTarget(null);
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-end">
        <div>
          <p className="text-sm font-semibold">{props?.title}</p>
          <small className="text-slate-400 text-xs">
            {type === "radio" ? "Select one document" : "Select multiple documents"} • Hover to delete
          </small>
        </div>
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
              onDelete={() => handleDelete(file.id, file.name)}
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

      {deleteTarget && (
        <ConfirmModal
          entity={deleteTarget.name}
          action="Delete"
          actionFn={confirmDelete}
          onHide={() => setDeleteTarget(null)}
          show={!!deleteTarget}
        />
      )}
    </div>
  );
}
