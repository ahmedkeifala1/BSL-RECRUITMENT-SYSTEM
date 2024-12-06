import Response from "./response";

export function isExpired(date: number | string | Date) {
  const currentDate = new Date();
  const expiryDate = date instanceof Date ? date : new Date(date);

  return currentDate > expiryDate;
}

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

export function pluralise(word: string) {
  if (word.endsWith("y")) {
    return `${word.slice(0, -1)}ies`;
  }

  return `${word}s`;
}

export function getResponseData<T>(res?: Response<T | null>, defaultValue?: T) {
  return res?.data ? res.data : (defaultValue as T);
}
