import { createContext, Dispatch, SetStateAction } from "react";
import { MovieType } from "../../../utils/api_response_types";

export type MoviesStateType = { [key: string]: MovieType[] };

interface MovieContextType {
  movies: MoviesStateType;
  setMovies?: Dispatch<SetStateAction<MoviesStateType>>;
}

const MovieContext = createContext<MovieContextType>({ movies: {} });

export default MovieContext;
