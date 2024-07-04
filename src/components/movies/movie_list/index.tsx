import { useContext, useRef, useLayoutEffect } from "react";
import MovieCard from "./MovieCard";
import MovieContext from "./context";
import { DEFAULT_MOVIE_RELEASE_YEAR } from "../constant";

export default function MovieList() {
  const { movies, layout, setLayout, infiniteScrollContainerRef } =
    useContext(MovieContext);
  const defaultMovieContainerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (layout) {
      defaultMovieContainerRef.current?.scrollIntoView();
      if (infiniteScrollContainerRef)
        infiniteScrollContainerRef.scrollTop -= 200;

      if (setLayout) setLayout(false);
    }
  }, [layout]);

  return (
    <section className="movie-list-container">
      {Object.keys(movies)?.map((year) => {
        return (
          <div key={year}>
            <h1
              ref={
                parseInt(year) === DEFAULT_MOVIE_RELEASE_YEAR
                  ? defaultMovieContainerRef
                  : null
              }
            >
              {year}
            </h1>
            {movies[year].length > 0 ? (
              <div className="movie-list">
                {movies[year].map((movie) => (
                  <MovieCard key={movie.id} {...movie} />
                ))}
              </div>
            ) : (
              "No Movies Available 😬!"
            )}
          </div>
        );
      })}
    </section>
  );
}
