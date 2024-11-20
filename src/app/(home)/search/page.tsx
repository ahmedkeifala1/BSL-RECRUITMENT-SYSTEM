import React from "react";
import SearchJobForm from "./search-job-form";
import { Link } from "@nextui-org/react";
import { SearchXIcon } from "lucide-react";

type SearchPageProps = {
  searchParams: { query: string };
};

export function generateMetadata({ searchParams }: SearchPageProps) {
  return {
    title: searchParams.query
      ? `Search results: ${searchParams.query} jobs`
      : "Search jobs",
  };
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  if (!searchParams.query) {
    return (
      <main className="container flex-1 sm:max-w-2xl flex flex-col justify-center px-4 lg:px-0 gap-6">
        <h2 className="text-center text-4xl font-bold text-slate-700">
          Search for your next job
        </h2>
        <SearchJobForm
          inputProps={{
            autoFocus: true,
            placeholder: "E.g Frontend Developer",
          }}
          buttonProps={{
            className: "bg-success text-white font-semibold",
          }}
        />
      </main>
    );
  }

  const jobs = [{ title: "Sample Job" }].filter(
    (job) => job.title.toLowerCase().indexOf(searchParams.query) > -1
  );

  return (
    <div className="container flex flex-col flex-1 max-w-2xl py-8">
      <Link href="/search" className="text-sm text-slate-500">
        ← Back to search
      </Link>

      <h1 className="text-2xl font-semibold text-slate-700">
        Search results for: {searchParams.query}
      </h1>

      {jobs.length > 0 ? (
        <ul>
          {jobs.map((job) => (
            <li key={job.title} className="py-4">
              <h2 className="text-lg font-semibold text-slate-700">
                {job.title}
              </h2>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex-1 flex flex-col justify-center items-center">
          <SearchXIcon size={96} className="text-red-400" />
          <p className="text-red-600 text-lg">No matching jobs found</p>
        </div>
      )}
    </div>
  );
}
