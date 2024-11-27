"use client";

import { Button, cn, Link } from "@nextui-org/react";
import React from "react";
import * as Icons from "lucide-react";
import { usePathname } from "next/navigation";
import { Route } from "../(admins)/_lib/schema";

ToolBar.Button = function ToolBarButton({
  route,
  baseUrl,
}: {
  route: Route;
  baseUrl: string;
}) {
  const pathname = usePathname();
  const Icon = Icons[route.icon] as typeof Icons.InfoIcon;
  const active =
    route.href === baseUrl
      ? pathname === baseUrl
      : pathname.replace(baseUrl, "").startsWith(route.href);

  return (
    <Button
      as={Link}
      radius="none"
      color="primary"
      startContent={<Icon size={17} />}
      variant={active ? "bordered" : "light"}
      className={cn(
        "border-y-0 max-h-fit py-[0.4rem]",
        active ? "bg-white" : "border-transparent"
      )}
      href={
        route.href.indexOf(baseUrl) < 0 ? `${baseUrl}${route.href}` : route.href
      }
    >
      {route.title}
    </Button>
  );
};

type ToolBarProps = {
  routes: Route[];
  baseUrl: string;
};

export default function ToolBar({ routes, baseUrl }: ToolBarProps) {
  return (
    <div className="bg-primary-50">
      <div className="container">
        <ToolBar.Button
          route={{
            href: baseUrl,
            icon: "HomeIcon",
            title: "Dashboard",
          }}
          baseUrl={baseUrl}
        />

        {routes.map((route, index) => (
          <ToolBar.Button key={index} route={route} baseUrl={baseUrl} />
        ))}
      </div>
    </div>
  );
}
