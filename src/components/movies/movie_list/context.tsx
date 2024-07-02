import { createContext, Dispatch, SetStateAction } from "react";
import { MovieType } from "../../../utils/api_response_types";

interface MovieContextType {
  movies: MovieType[];
  setMovies?: Dispatch<SetStateAction<MovieType[]>>;
}

const MovieContext = createContext<MovieContextType>({ movies: [] });

export default MovieContext;
