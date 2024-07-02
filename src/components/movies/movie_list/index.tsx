import MovieCard from "./MovieCard";
import { MovieType } from "../../../utils/api_response_types";

type MovieListPropsType = { movies: MovieType[] };

export default function MovieList(props: MovieListPropsType) {
  return <div>MovieList</div>;
}
