import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import Header from "./header";
import MovieList from "./movie_list";
import MovieContext, { MoviesStateType } from "./movie_list/context";
import InfiniteScroll from "../common/InfiniteScroll";
import MoviesLoader from "./movie_list/MoviesLoader";
import { fetchMovies, fetchGenres } from "../../utils/api";
import {
  DEFAULT_MOVIE_RELEASE_YEAR,
  MOVIES_TO_KEEP_FROM_RESULTS,
} from "./constant";
import { GenreType } from "../../utils/api_response_types";

export default function Movies() {
  const [movies, setMovies] = useState<MoviesStateType>({});

  //0th element handle scroll up movie data and 1st element handle scroll down movie date
  const [movieReleaseYears, setMovieReleaseYears] = useState([
    DEFAULT_MOVIE_RELEASE_YEAR - 2,
    DEFAULT_MOVIE_RELEASE_YEAR + 1,
  ]);
  const [movieLoading, setMovieLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [genres, setGenres] = useState<GenreType[]>([]);
  const [genreLoading, setGenreLoading] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<Set<number>>(new Set());
  const [keywords, setKeywords] = useState("");
  const [layout, setLayout] = useState(false);
  const infiniteScrollContainerRef = useRef<HTMLDivElement | null>(null);

  const currentYear = useMemo(() => new Date().getFullYear(), []);

  const loadMovies = useCallback(async () => {
    setMovieLoading(true);

    const commonQueryParam = {
      with_genres: Array.from(selectedGenres),
      with_keywords: keywords,
    };

    //fetching 2011 movies
    const resp1 = await fetchMovies({
      primary_release_year: DEFAULT_MOVIE_RELEASE_YEAR - 1,
      ...commonQueryParam,
    });

    //fetching 2012 movies
    const resp2 = await fetchMovies({
      primary_release_year: DEFAULT_MOVIE_RELEASE_YEAR,
      ...commonQueryParam,
    });

    if (resp1.data && resp2.data) {
      setMovies({
        [DEFAULT_MOVIE_RELEASE_YEAR - 1]: resp1.data.results.slice(
          0,
          MOVIES_TO_KEEP_FROM_RESULTS
        ),
        [DEFAULT_MOVIE_RELEASE_YEAR]: resp2.data.results.slice(
          0,
          MOVIES_TO_KEEP_FROM_RESULTS
        ),
      });
    }
    setLayout(true);
    setMovieLoading(false);
    setMovieReleaseYears([
      DEFAULT_MOVIE_RELEASE_YEAR - 2,
      DEFAULT_MOVIE_RELEASE_YEAR + 1,
    ]);
    setHasMore(true);
  }, [selectedGenres, keywords]);

  const loadMoviesFromInfiniteScroll = useCallback(
    async (isScrollsUp = false) => {
      let releaseYear = movieReleaseYears[1];
      if (isScrollsUp) releaseYear = movieReleaseYears[0];
      if (releaseYear > currentYear) return;

      setMovieLoading(true);

      const resp = await fetchMovies({
        primary_release_year: releaseYear,
        with_genres: Array.from(selectedGenres),
        with_keywords: keywords,
      });

      if (resp?.data) {
        const { results } = resp.data;
        const movieYear = releaseYear.toString();

        if (results.length > 0) {
          const resultsToKeep = results.slice(0, MOVIES_TO_KEEP_FROM_RESULTS);
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
      }

      setMovieLoading(false);
    },
    [movieReleaseYears, selectedGenres, keywords]
  );

  const loadGenres = useCallback(async () => {
    setGenreLoading(true);
    const resp = await fetchGenres();
    if (resp?.data) {
      setGenres([{ id: Infinity, name: "All" }, ...resp?.data.genres]);
    }
    setGenreLoading(false);
  }, []);

  //for initial loading genres data
  useEffect(() => {
    loadGenres();
  }, []);

  // fetch movies intially and also when genre selected or search happens
  useEffect(() => {
    loadMovies();
  }, [selectedGenres, keywords]);

  return (
    <MovieContext.Provider
      value={{
        movies,
        setMovies,
        genres,
        genreLoading,
        setSelectedGenres,
        selectedGenres,
        setKeywords,
        keywords,
        layout,
        setLayout,
        infiniteScrollContainerRef: infiniteScrollContainerRef.current,
      }}
    >
      <Header />
      <InfiniteScroll
        loadMore={loadMoviesFromInfiniteScroll}
        apiCallInitated={movieLoading}
        loader={<MoviesLoader />}
        hasMore={hasMore}
        containerRef={infiniteScrollContainerRef}
      >
        <MovieList />
        {movieReleaseYears[1] > currentYear && (
          <div className="footer">No More Movies 😬!</div>
        )}
      </InfiniteScroll>
    </MovieContext.Provider>
  );
}
