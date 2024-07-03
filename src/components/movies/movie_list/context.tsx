import { createContext, Dispatch, SetStateAction } from "react";
import { MovieType, GenreType } from "../../../utils/api_response_types";

export type MoviesStateType = { [key: string]: MovieType[] };
export interface GenresStateType extends GenreType {
  isActive?: boolean;
}

interface MovieContextType {
  movies: MoviesStateType;
  setMovies?: Dispatch<SetStateAction<MoviesStateType>>;
  genres: GenresStateType[];
  setGenres?: Dispatch<SetStateAction<GenresStateType[]>>;
  genreLoading: boolean;
}

const MovieContext = createContext<MovieContextType>({
  movies: {},
  genres: [],
  genreLoading: false,
});

export default MovieContext;
