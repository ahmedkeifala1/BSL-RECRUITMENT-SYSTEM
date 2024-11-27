import * as Icons from "lucide-react";

export type Route = {
  title: string;
  href: string;
  icon: keyof typeof Icons;
};
