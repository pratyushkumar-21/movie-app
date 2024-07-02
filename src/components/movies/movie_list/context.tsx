import { createContext } from "react";
import { MovieType } from "../../../utils/api_response_types";

interface MovieContextType {
  movies: MovieType[];
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export default MovieContext;
