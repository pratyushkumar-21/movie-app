import { IMAGE_API_HOST } from "./api";

export const getImageUrl = (path: string) => `${IMAGE_API_HOST}/${path}`;

export const truncateText = (str: string, endIndex = 80) =>
  `${str.slice(0, endIndex)}${str.length > endIndex ? "..." : ""}`;

export const makeQueryParams = (paramsObject: { [key: string]: any }) => {
  //converting values to string
  for (let key in paramsObject) {
    if (typeof paramsObject[key] !== "string") {
      paramsObject[key] = paramsObject[key].toString();
    }
  }

  const params = new URLSearchParams(paramsObject);
  return params.toString();
};

export function debounce(cb: Function, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (...args: any[]) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      cb(...args);
    }, delay);
  };
}
