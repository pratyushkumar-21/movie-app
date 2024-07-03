import { API_HOST, API_KEY } from "./api";

export const getImageUrl = (path: string) =>
  `${API_HOST}/3/discover/movie${path}?api_key=${API_KEY}`;

export const getSlicedString = (str: string, endIndex = 80) =>
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
