import React from "react";
import SortJobsField from "./components/sort-jobs-field";
import Database from "@/lib/core/db-context";

type JobsPageProps = {
  searchParams: { o?: string };
};

export default async function JobsPage({ searchParams }: JobsPageProps) {
  const vacancies = await Database.vacancy.findMany({
    orderBy: {
      postedAt: searchParams.o === "oldest" ? "asc" : "desc",
    },
    include: {
      job: true,
    },
  });

  return (
    <div className="container p-6 sm:px-0 flex-1">
      <header className="border bg-white shadow-sm px-4 py-2 flex items-center justify-between">
        <p className="text-slate-600 font-semibold">
          Showing 1 to 20 of 100 jobs
        </p>

        <SortJobsField />
      </header>

      <main>
        {vacancies.map((vacancy) => (
          <div key={vacancy.id} className="border bg-white shadow-sm p-4 my-4">
            <h2 className="text-lg font-semibold">{vacancy.job.title}</h2>
            <p className="text-sm text-slate-600">{vacancy.job.description}</p>
          </div>
        ))}
      </main>
    </div>
  );
}
