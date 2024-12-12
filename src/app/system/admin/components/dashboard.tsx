"use client";

import React, { useEffect, useState } from "react";
import { LoggedUser } from "@/app/auth/_lib/schemas";
import { AdminRole } from "@prisma/client";

function greet(date?: Date) {
  date = date ?? new Date();
  let time = "Evening";

  if (date.getHours() < 12) {
    time = "Morning";
  } else if (date.getHours() < 17) {
    time = "Afternoon";
  }

  return `Good ${time}`;
}

export default function DashboardComponent({
  user,
  role,
}: {
  user: LoggedUser;
  role: AdminRole;
}) {
  const [dateTime, setDateTime] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    dateTime && (
      <>
        <div className="flex-1 gap-8 flex justify-center flex-col items-center pt-8 relative">
          <div className="">
            <p>{greet(dateTime)}</p>
            <h1 className="text-slate-600 font-semibold text-4xl">
              {user.fullName}
            </h1>
          </div>

          <div className="flex flex-col items-center justify-center">
            <h5 className="font-bold tracking-widest text-6xl">
              {dateTime.toLocaleTimeString()}
            </h5>
            <p className="text-lg text-slate-700">{dateTime.toDateString()}</p>
          </div>
        </div>

        <div className="fixed top-0 left-0 h-screen w-screen opacity-5 -z-10">
          <div className="flex items-center justify-center h-full w-full">
            <h5 className="text-[12rem]">{role}</h5>
          </div>
        </div>
      </>
    )
  );
}
