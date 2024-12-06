import Image, { ImageProps } from "next/image";
import React from "react";
import logo from "../assets/logo.png";
import { Drop } from "@/lib/shared/types";

export default function Logo(props?: Drop<ImageProps, "src" | "alt">) {
  return <Image src={logo} width={35} height={35} {...props} alt="BSL" />;
}
