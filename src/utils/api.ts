import { API_HOST, API_KEY } from "../config";
import {
  ApiResponseType,
  MovieListResponseType,
  GenreResponseType,
} from "./api_response_types";
import { makeQueryParams } from "./common";

const FETCH_MOVIES = "3/discover/movie";
const FETCH_GENRES = "3/genre/movie/list";

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
  with_genres?: number[];
  with_keywords?: string;
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

  const url = `${FETCH_MOVIES}?${params}`;
  const resp = await fetcher<MovieListResponseType>(url);

  return resp;
};

export const fetchGenres = async () => {
  const url = `${FETCH_GENRES}?api_key=${API_KEY}`;
  const resp = await fetcher<GenreResponseType>(url);

  return resp;
};
