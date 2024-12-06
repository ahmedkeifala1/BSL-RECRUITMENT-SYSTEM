"use client";

import { Image } from "@nextui-org/react";
import React, { useMemo } from "react";

export default function FileView({ filePath }: { filePath: string }) {
  const fileType: "PDF" | "IMAGE" | null = useMemo(() => {
    if (filePath.toLowerCase().endsWith(".pdf")) {
      return "PDF";
    } else if (filePath.toLowerCase().match(/\.(png|jpg|jpeg)$/)) {
      return "IMAGE";
    }

    return null;
  }, [filePath]);

  return (
    <div className="shadow bg-slate-50 h-screen max-h-screen flex flex-col items-center justify-center">
      {!fileType ? (
        <>Unsupported file</>
      ) : fileType === "PDF" ? (
        <object
          data={filePath}
          type="application/pdf"
          className="w-full min-h-full"
        >
          <p>PDF cannot be displayed.</p>
        </object>
      ) : (
        fileType === "IMAGE" && (
          <Image
            src={filePath}
            alt="Preview"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        )
      )}
    </div>
  );
}
