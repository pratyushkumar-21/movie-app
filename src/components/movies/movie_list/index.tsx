import { useContext } from "react";
import MovieCard from "./MovieCard";
import MovieContext from "./context";
import MoviesLoader from "./MoviesLoader";

type MovieListPropsType = { loading: boolean };

export default function MovieList({ loading }: MovieListPropsType) {
  const { movies } = useContext(MovieContext);

  if (loading) return <MoviesLoader />;

  return (
    <section className="movie-list-container">
      {movies?.map((movie) => (
        <MovieCard key={movie.id} {...movie} />
      ))}
    </section>
  );
}
