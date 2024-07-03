import { createContext, Dispatch, SetStateAction } from "react";
import { MovieType, GenreType } from "../../../utils/api_response_types";

export type MoviesStateType = { [key: string]: MovieType[] };

interface MovieContextType {
  movies: MoviesStateType;
  genres: GenreType[];
  genreLoading: boolean;
  selectedGenres: Set<number>;
  setMovies?: Dispatch<SetStateAction<MoviesStateType>>;
  setMovieReleaseYears?: Dispatch<SetStateAction<number[]>>;
  setSelectedGenres?: Dispatch<SetStateAction<Set<number>>>;
}

const MovieContext = createContext<MovieContextType>({
  movies: {},
  genres: [],
  genreLoading: false,
  selectedGenres: new Set(),
});

export default MovieContext;
