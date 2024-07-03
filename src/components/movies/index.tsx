import { useState, useEffect, useCallback, useMemo } from "react";
import Header from "./header";
import MovieList from "./movie_list";
import MovieContext, { MoviesStateType } from "./movie_list/context";
import InfiniteScroll from "../common/InfiniteScroll";
import MoviesLoader from "./movie_list/MoviesLoader";
import { fetchMovies, fetchGenres } from "../../utils/api";
import { DEFAULT_MOVIE_RELEASE_YEAR } from "./constant";
import { GenreType } from "../../utils/api_response_types";

export default function Movies() {
  const [movies, setMovies] = useState<MoviesStateType>({});

  //0th element handle scroll up movie data and 1st element handle scroll down movie date
  const [movieReleaseYears, setMovieReleaseYears] = useState([
    DEFAULT_MOVIE_RELEASE_YEAR - 1,
    DEFAULT_MOVIE_RELEASE_YEAR,
  ]);
  const [movieLoading, setMovieLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [genres, setGenres] = useState<GenreType[]>([]);
  const [genreLoading, setGenreLoading] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<Set<number>>(new Set());

  const currentYear = useMemo(() => new Date().getFullYear(), []);

  const loadMovies = useCallback(
    (isScrollsUp = false) => {
      let releaseYear = movieReleaseYears[1];
      if (isScrollsUp) releaseYear = movieReleaseYears[0];
      if (releaseYear > currentYear) return;
      setMovieLoading(true);

      const resp = fetchMovies({
        primary_release_year: releaseYear,
        with_genres: Array.from(selectedGenres),
      });

      resp.then((data) => {
        if (data.data) {
          const { results } = data.data;
          const movieYear = releaseYear.toString();

          if (results.length > 0) {
            const resultsToKeep = results.slice(0, 20);
            setMovies((prevMovies) => {
              if (isScrollsUp)
                return {
                  [movieYear]: resultsToKeep,
                  ...prevMovies,
                };

              return {
                ...prevMovies,
                [movieYear]: resultsToKeep,
              };
            });

            setMovieReleaseYears((year) =>
              isScrollsUp ? [year[0] - 1, year[1]] : [year[0], year[1] + 1]
            );
          } else setHasMore(false);

          setMovieLoading(false);
        }
      });
    },
    [movieReleaseYears, selectedGenres]
  );

  const loadGenres = useCallback(async () => {
    setGenreLoading(true);
    const resp = fetchGenres();
    resp.then((data) => {
      if (data?.data) {
        setGenres([{ id: Infinity, name: "All" }, ...data.data.genres]);
      }
      setGenreLoading(false);
    });
  }, []);

  //for initial loading genres data
  useEffect(() => {
    loadGenres();
  }, []);

  //fetch movies intially and also when genre selected
  useEffect(() => {
    loadMovies();
  }, [selectedGenres]);

  return (
    <MovieContext.Provider
      value={{
        movies,
        setMovies,
        genres,
        genreLoading,
        setMovieReleaseYears,
        setSelectedGenres,
        selectedGenres,
      }}
    >
      <Header />
      <InfiniteScroll
        loadMore={loadMovies}
        apiCallInitated={movieLoading}
        loader={<MoviesLoader />}
        hasMore={hasMore}
      >
        <MovieList />
        {(!hasMore || movieReleaseYears[1] > currentYear) && (
          <div className="footer">No More Movies 😬!</div>
        )}
      </InfiniteScroll>
    </MovieContext.Provider>
  );
}
