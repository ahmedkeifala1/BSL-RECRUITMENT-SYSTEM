import React from "react";
import CreateVacancy from "./components/manage/create-vacancy";
import EditVacancy from "./components/manage/edit-vacancy";
import DeleteVacancy from "./components/manage/delete-vacancy";

export default function VacanciesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}

      <CreateVacancy />

      <EditVacancy />

      <DeleteVacancy />
    </>
  );
}
