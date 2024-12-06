"use client";

import { Icon } from "@/lib/frontend/icons";
import { cn, InputProps, Link } from "@nextui-org/react";
import React, { useMemo, useState } from "react";

type FileUploadProps = InputProps & {
  setValue?: (file?: File) => void;
};

export default function FileUpload({ setValue, ...props }: FileUploadProps) {
  const [file, setFile] = useState<File>();
  const isPDF = useMemo(
    () => file && file.type.toLowerCase().indexOf("pdf") > -1,
    [file]
  );

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length <= 0) {
      if (setValue) {
        setValue(undefined);
      }
      return setFile(undefined);
    }

    const file = e.target.files[0];

    if (setValue) {
      setValue(file);
    }

    setFile(file);
  }

  return (
    <>
      <div
        className={cn(
          props.isInvalid ? "border-danger" : "border-primary",
          "border-2 border-dashed p-2 bg-slate-100 flex items-center justify-between gap-2"
        )}
      >
        <div className="flex-1 truncate flex gap-2 items-center">
          <Icon
            name={file ? (isPDF ? "FileTextIcon" : "ImageIcon") : "FileUpIcon"}
            size={file ? 28 : 24}
            className={cn(
              props.isInvalid
                ? "text-danger"
                : file
                ? isPDF
                  ? "text-red-500"
                  : "text-success-500"
                : "text-primary"
            )}
          />
          <p
            className={cn(
              "truncate",
              props.isInvalid ? "text-danger" : "text-foreground"
            )}
            title={file ? file.name : "Choose file"}
          >
            {file ? file.name : "Choose file to upload"}
          </p>
        </div>

        <div className="flex gap-1">
          <label
            htmlFor="file"
            className={cn(
              props.isInvalid
                ? "bg-danger-100 text-danger"
                : "bg-primary text-white",
              "p-2 text-xs font-semibold cursor-pointer hover:bg-opacity-75 duration-150"
            )}
          >
            {file ? "Change" : "Upload"} file
          </label>

          {file && (
            <Link
              color="success"
              isExternal={true}
              href={URL.createObjectURL(file)}
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
        id="file"
        onChange={handleFileChange}
        accept=".pdf,image/png,image/jpg,image/jpeg"
      />
      {props.errorMessage && (
        <small className="text-danger">{props.errorMessage.toString()}</small>
      )}
    </>
  );
}
