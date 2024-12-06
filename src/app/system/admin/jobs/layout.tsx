import React from "react";
import CreateJob from "./components/manage/create-job";
import EditJob from "./components/manage/edit-job";
import DeleteJob from "./components/manage/delete-job";

export default function JobsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}

      <CreateJob />

      <EditJob />

      <DeleteJob />
    </>
  );
}
