"use client";

import React from "react";

export default function ErrorPage({ error }: { error?: Error }) {
  return (
    <div className="min-h-full items-center justify-center">
      <h4 className="font-bold text-danger">Error</h4>

      <p className="text-lg text-danger-400">{error?.message}</p>
    </div>
  );
}
