"use client";

import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Provider({ children }: { children: React.ReactNode }) {
  const { push } = useRouter();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
      mutations: {
        retry: false,
      },
    },
  });

  return (
    <NextUIProvider navigate={push}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </NextUIProvider>
  );
}
