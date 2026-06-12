"use client";

import { Icon } from "@/lib/frontend/icons";
import { cn, InputProps, Link } from "@nextui-org/react";
import React, { useId, useMemo, useState } from "react";
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from "@/app/system/user/files/_lib/schema";

type FileUploadProps = InputProps & {
  setValue?: (file?: File) => void;
};

export default function FileUpload({ setValue, ...props }: FileUploadProps) {
  const inputId = useId();
  const [file, setFile] = useState<File>();
  const [objectUrl, setObjectUrl] = useState<string>();
  const [error, setError] = useState<string>();

  const isPDF = useMemo(
    () => file && file.type.toLowerCase().indexOf("pdf") > -1,
    [file]
  );

  const fileSizeInMB = useMemo(
    () => file ? (file.size / (1024 * 1024)).toFixed(2) : null,
    [file]
  );

  function clearFile() {
    if (objectUrl) URL.revokeObjectURL(objectUrl);
    setObjectUrl(undefined);
    setFile(undefined);
    setValue?.(undefined);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length <= 0) {
      clearFile();
      setError(undefined);
      return;
    }

    const selectedFile = e.target.files[0];

    if (!ALLOWED_FILE_TYPES.includes(selectedFile.type)) {
      setError("Only PDF and DOC/DOCX files are allowed");
      clearFile();
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      setError(`File size must be less than 5MB. Current: ${(selectedFile.size / (1024 * 1024)).toFixed(2)}MB`);
      clearFile();
      return;
    }

    if (objectUrl) URL.revokeObjectURL(objectUrl);
    const newUrl = URL.createObjectURL(selectedFile);
    setError(undefined);
    setObjectUrl(newUrl);
    setFile(selectedFile);
    setValue?.(selectedFile);
  }

  return (
    <>
      <div
        className={cn(
          error || props.isInvalid ? "border-danger" : "border-primary",
          "border-2 border-dashed p-2 bg-slate-100 flex items-center justify-between gap-2"
        )}
      >
        <div className="flex-1 truncate flex gap-2 items-center">
          <Icon
            name={file ? (isPDF ? "FileTextIcon" : "FileIcon") : "FileUpIcon"}
            size={file ? 28 : 24}
            className={cn(
              error || props.isInvalid
                ? "text-danger"
                : file
                ? isPDF
                  ? "text-red-500"
                  : "text-blue-500"
                : "text-primary"
            )}
          />
          <div className="flex-1">
            <p
              className={cn(
                "truncate text-sm",
                error || props.isInvalid ? "text-danger" : "text-foreground"
              )}
              title={file ? file.name : "Choose file"}
            >
              {file ? file.name : "Choose file to upload"}
            </p>
            {file && fileSizeInMB && (
              <small className="text-slate-500">{fileSizeInMB}MB</small>
            )}
          </div>
        </div>

        <div className="flex gap-1">
          <label
            htmlFor={inputId}
            className={cn(
              error || props.isInvalid
                ? "bg-danger-100 text-danger"
                : "bg-primary text-white",
              "p-2 text-xs font-semibold cursor-pointer hover:bg-opacity-75 duration-150"
            )}
          >
            {file ? "Change" : "Upload"} file
          </label>

          {objectUrl && !error && !props.isInvalid && (
            <Link
              color="success"
              isExternal={true}
              href={objectUrl}
              className="bg-success bg-opacity-15 text-success p-2 text-xs font-semibold cursor-pointer hover:bg-opacity-20 duration-150"
            >
              Preview
            </Link>
          )}
        </div>
      </div>

      <input
        type="file"
        hidden
        name="file"
        id={inputId}
        onChange={handleFileChange}
        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      />
      {(error || props.errorMessage) && (
        <small className="text-danger">{error || props.errorMessage?.toString()}</small>
      )}
    </>
  );
}
