import { Skeleton, SkeletonProps } from "@nextui-org/react";
import React, { PropsWithChildren } from "react";

type WithSkeletonFieldProps = PropsWithChildren & {
  condition?: boolean;
  props?: SkeletonProps;
};

export default function Placeholder({
  props,
  children,
  condition,
}: Readonly<WithSkeletonFieldProps>) {
  return condition ? (
    <Skeleton {...props} className={`h-10 rounded-none ${props?.className}`} />
  ) : (
    children
  );
}
