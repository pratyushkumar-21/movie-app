import { ApiResponseType, MovieListResponseType } from "./api_response_types";
import { makeQueryParams } from "./common";

export const API_HOST = "https://api.themoviedb.org";
export const API_KEY = "2dca580c2a14b55200e784d157207b4d";
const FETCH_MOVIES = "3/discover/movie";

async function fetcher<T>(url: string): Promise<ApiResponseType<T>> {
  try {
    const resp = await fetch(`${API_HOST}/${url}`);

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

type fetchMoviesParamType = {
  page?: number;
  sort_by?: string;
  primary_release_year?: number;
  vote_count_gte?: number;
};

export const fetchMovies = async ({
  page = 1,
  vote_count_gte = 100,
  sort_by = "popularity.desc",
  ...rest
}: fetchMoviesParamType) => {
  const params = makeQueryParams({
    api_key: API_KEY,
    page,
    vote_count_gte,
    sort_by,
    ...rest,
  });

  const endPoint = `${FETCH_MOVIES}?${params}`;
  const resp = await fetcher<MovieListResponseType>(endPoint);

  return resp;
};
