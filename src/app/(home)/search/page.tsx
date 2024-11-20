import React from "react";
import SearchJobForm from "./search-job-form";

type SearchPageProps = {
  searchParams: { query: string };
};

export function generateMetadata({ searchParams }: SearchPageProps) {
  return {
    title: `Search results: ${searchParams.query} jobs`,
  };
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  return (
    <div className="container py-8">
      <div className="">
        <SearchJobForm
          defaultValue={searchParams.query}
          buttonProps={{
            className: "bg-success text-white font-semibold",
          }}
        />
      </div>
      <h1>Search results for: {searchParams.query}</h1>
    </div>
  );
}
