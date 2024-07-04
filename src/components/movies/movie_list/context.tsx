import { createContext, Dispatch, SetStateAction } from "react";
import { MovieType, GenreType } from "../../../utils/api_response_types";

export type MoviesStateType = { [key: string]: MovieType[] };

interface MovieContextType {
  movies: MoviesStateType;
  genres: GenreType[];
  genreLoading: boolean;
  selectedGenres: Set<number>;
  keywords: string;
  layout: boolean;
  setMovies?: Dispatch<SetStateAction<MoviesStateType>>;
  setSelectedGenres?: Dispatch<SetStateAction<Set<number>>>;
  setKeywords?: Dispatch<SetStateAction<string>>;
  setLayout?: Dispatch<SetStateAction<boolean>>;
  infiniteScrollContainerRef?: HTMLDivElement | null;
}

const MovieContext = createContext<MovieContextType>({
  movies: {},
  genres: [],
  genreLoading: false,
  selectedGenres: new Set(),
  keywords: "",
  layout: false,
});

export default MovieContext;
