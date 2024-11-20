import SearchJobForm from "@/app/(home)/search/search-job-form";
import React from "react";

export default function HomePage() {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-[url('../assets/home_bg.jpeg')] bg-center bg-cover bg-no-repeat">
        <div className="container px-4 lg:px-0 sm:max-w-4xl flex flex-1 items-center">
          <div className="bg-blue-900 p-6 bg-opacity-85 max-w-xl">
            <header className="space-y-2 text-white">
              <h2 className="font-bold text-3xl">
                Start Building your Career at{" "}
                <abbr title="Bank of Sierra Leone">BSL</abbr>
              </h2>
              <p>
                Are you ready to take the next step in your career? Explore our
                job openings and find the perfect role for you at the Bank of
                Sierra Leone. We are looking for talented and motivated
                individuals to join our team and help us achieve our mission.
              </p>
            </header>

            <div className="mt-3">
              <SearchJobForm />
            </div>
          </div>
        </div>
      </div>

      <div className="container space-y-2 py-12 px-4 lg:px-0 md:max-w-4xl">
        <h5 className="font-bold text-2xl">
          Why Work at the Bank of Sierra Leone?
        </h5>
        <p>
          The Bank of Sierra Leone offers a unique opportunity to contribute to
          the economic development of the country. By joining the Bank, you will
          be part of a team that is dedicated to maintaining monetary stability,
          promoting financial sector development, and ensuring a safe and sound
          banking system. The Bank provides a dynamic and challenging work
          environment, with opportunities for professional growth and
          development. Join us and be a part of the transformation of Sierra
          Leone&squot;s financial landscape.
        </p>
      </div>
    </>
  );
}
