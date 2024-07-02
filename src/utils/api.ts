import { ApiResponseType, MovieListResponseType } from "./api_response_types";

const API_HOST = "https://api.themoviedb.org/";
const API_KEY = "2dca580c2a14b55200e784d157207b4d";
const FETCH_MOVIES = "3/discover/movie";

async function fetcher<T>(url: string): Promise<ApiResponseType<T>> {
  try {
    const resp = await fetch(`${API_HOST}${url}`);

    //this will handle if response is not OK
    if (!resp.ok) {
      const errorMessage = resp.text();
      return { error: `${errorMessage}` };
    }

    const data: T = await resp.json();
    return { data };
  } catch (error) {
    //this will handle network errors
    return { error: `${error}` };
  }
}

export const fetchMovies = async () => {
  const endPoint = `${FETCH_MOVIES}?api_key=${API_KEY}`;
  const resp = await fetcher<MovieListResponseType>(endPoint);

  return resp;
};
