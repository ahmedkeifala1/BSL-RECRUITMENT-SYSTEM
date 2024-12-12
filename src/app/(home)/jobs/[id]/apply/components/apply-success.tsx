"use client";

import Popup from "@/components/system/popup";
import useNavigation from "@/lib/frontend/hooks/navigation-hook";
import React from "react";

export default function ApplicationSuccess() {
  const { replace, searchParams } = useNavigation();
  const show = searchParams.get("m") === "success";
  return (
    show && (
      <Popup
        isOpen={show}
        onClose={() => replace("/jobs")}
        hideCloseButton={true}
      >
        <Popup.Header>Application Successful</Popup.Header>
        <Popup.Body>
          <p>
            Thank you for applying for this job. We will get back to you as soon
            as possible.
          </p>
        </Popup.Body>

        <Popup.Footer>
          <Popup.CancelButton>Close</Popup.CancelButton>
        </Popup.Footer>
      </Popup>
    )
  );
}
