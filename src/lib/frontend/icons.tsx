import * as LucideIcons from "lucide-react";

export function Icon({
  name,
  ...props
}: {
  size?: number;
  className?: string;
  name: keyof typeof LucideIcons;
}) {
  const GotIcon = LucideIcons[name] as typeof LucideIcons.InfoIcon;

  return <GotIcon size={15} {...props} />;
}

export type IconKey = keyof typeof LucideIcons;

export const IconNames = Object.keys(
  LucideIcons
) as (keyof typeof LucideIcons)[];

export default LucideIcons;
