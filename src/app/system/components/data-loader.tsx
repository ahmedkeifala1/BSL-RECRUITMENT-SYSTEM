"use client";

import Loader from "@/components/loader";
import Response from "@/lib/base/response";
import React, { PropsWithChildren, ReactNode } from "react";

type DataLoaderProps<T extends object> = PropsWithChildren & {
  isProcessing?: boolean;
  response?: Response<T | null>;
  renderError?: (message: string) => ReactNode;
};

export default function DataLoader<T extends object>({
  children,
  response,
  renderError,
  isProcessing,
}: DataLoaderProps<T>) {
  return !response || isProcessing ? (
    <Loader message="Loading data..." />
  ) : !response.data || response.isFailure ? (
    renderError ? (
      renderError(response.message)
    ) : (
      <div className="bg-red-100 text-red-500 py-1 px-3">
        {response.message}
      </div>
    )
  ) : (
    children
  );
}
