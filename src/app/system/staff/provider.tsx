"use client";

import { createContext, useContext } from "react";
import { LoggedJobSeeker } from "./_lib/schema";

const AuthJobSeekerContext = createContext<LoggedJobSeeker>(
  {} as LoggedJobSeeker
);

export default function AuthJobSeekerProvider({
  jobSeeker,
  children,
}: {
  jobSeeker: LoggedJobSeeker;
  children: React.ReactNode;
}) {
  return (
    <AuthJobSeekerContext.Provider value={jobSeeker}>
      <main className="container flex-1 p-6 sm:px-0">{children}</main>
    </AuthJobSeekerContext.Provider>
  );
}

export function useAuthJobSeeker() {
  const context = useContext(AuthJobSeekerContext);

  if (!context) {
    throw new Error("useAuthJobSeeker must be used within a JobSeekerProvider");
  }

  return context;
}
