"use client";

import Loader from "@/components/loader";
import Response from "@/lib/shared/response";
import React, { PropsWithChildren, ReactNode } from "react";

type DataLoaderProps<T extends object> = PropsWithChildren & {
  isProcessing?: boolean;
  loadingMessage?: string;
  response?: Response<T | null>;
  renderError?: (message: string) => ReactNode;
};

export default function DataLoader<T extends object>({
  children,
  response,
  renderError,
  isProcessing,
  loadingMessage,
}: DataLoaderProps<T>) {
  return !response || isProcessing ? (
    <Loader message={loadingMessage ?? "Loading data..."} />
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
