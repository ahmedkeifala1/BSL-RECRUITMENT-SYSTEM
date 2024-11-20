export function capitalise(
  str: string,
  options?: { lowerRest?: boolean; separator?: string }
): string {
  if (options?.lowerRest) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
  const split = options?.separator ?? " ";
  return str
    .split(split)
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(split);
}
