import { createContext, Dispatch, SetStateAction } from "react";
import { MovieType, GenreType } from "../../../utils/api_response_types";

export type MoviesStateType = { [key: string]: MovieType[] };

interface MovieContextType {
  movies: MoviesStateType;
  genres: GenreType[];
  genreLoading: boolean;
  selectedGenres: Set<number>;
  keywords: string;
  setMovies?: Dispatch<SetStateAction<MoviesStateType>>;
  setMovieReleaseYears?: Dispatch<SetStateAction<number[]>>;
  setSelectedGenres?: Dispatch<SetStateAction<Set<number>>>;
  setKeywords?: Dispatch<SetStateAction<string>>;
}

const MovieContext = createContext<MovieContextType>({
  movies: {},
  genres: [],
  genreLoading: false,
  selectedGenres: new Set(),
  keywords: "",
});

export default MovieContext;
