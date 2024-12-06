"use client";

import Popup from "@/components/system/popup";
import useNavigation from "@/lib/frontend/hooks/navigation-hook";
import React from "react";
import FileView from "../app/system/components/file-view";
import { Icon } from "@/lib/frontend/icons";

export default function PreviewDocument() {
  const { route, searchParams } = useNavigation();
  const show = searchParams.has("preview");

  return (
    show && (
      <Popup
        size="full"
        isOpen={show}
        onClose={route}
        hideCloseButton={true}
        placement="top-center"
        scrollBehavior="inside"
        classNames={{
          base: "bg-transparent p-0",
        }}
      >
        <Popup.Body className="p-0 relative">
          <FileView filePath={searchParams.get("preview") as string} />

          <div className="absolute left-0 bottom-2 flex justify-center w-full">
            <Popup.CancelButton
              isIconOnly={true}
              className="rounded-full bg-black text-white bg-opacity-45 hover:opacity-100 hover:bg-opacity-100"
            >
              <Icon name="XIcon" />
            </Popup.CancelButton>
          </div>
        </Popup.Body>
      </Popup>
    )
  );
}
