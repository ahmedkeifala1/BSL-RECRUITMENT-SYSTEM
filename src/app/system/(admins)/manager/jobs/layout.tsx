import React, { Suspense } from "react";
import CreateJob from "./components/manage/create-job";
import Loader from "@/components/loader";
import EditJob from "./components/manage/edit-job";
import DeleteJob from "./components/manage/delete-job";

export default function JobsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense fallback={<Loader message="Processing...." />}>
        {children}
      </Suspense>

      <CreateJob />

      <EditJob />

      <DeleteJob />
    </>
  );
}
