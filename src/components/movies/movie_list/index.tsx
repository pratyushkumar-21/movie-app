import { useContext } from "react";
import MovieCard from "./MovieCard";
import MovieContext from "./context";

export default function MovieList() {
  const { movies } = useContext(MovieContext);

  return (
    <section className="movie-list-container">
      {Object.keys(movies)?.map((year) => {
        return (
          <div key={year}>
            <h1>{year}</h1>
            <div className="movie-list">
              {movies[year].map((movie) => (
                <MovieCard key={movie.id} {...movie} />
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
