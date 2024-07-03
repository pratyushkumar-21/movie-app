import { useState, useEffect, useCallback } from "react";
import Header from "./header";
import MovieList from "./movie_list";
import MovieContext, {
  MoviesStateType,
  GenresStateType,
} from "./movie_list/context";
import InfiniteScroll from "../common/InfiniteScroll";
import MoviesLoader from "./movie_list/MoviesLoader";
import { fetchMovies, fetchGenres } from "../../utils/api";

export default function Movies() {
  const [movies, setMovies] = useState<MoviesStateType>({});
  const [releaseYear, setReleaseYear] = useState(2012);
  const [movieLoading, setMovieLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [genres, setGenres] = useState<GenresStateType[]>([]);
  const [genreLoading, setGenreLoading] = useState(false);

  const loadMovies = useCallback(() => {
    setMovieLoading(true);

    const resp = fetchMovies({ primary_release_year: releaseYear });
    resp.then((data) => {
      if (data?.data) {
        const { results } = data.data;
        const movieYear = releaseYear.toString();

        if (results.length > 0) {
          setMovies((prevMovies) => ({
            ...prevMovies,
            [movieYear]: results.slice(0, 20),
          }));

          setReleaseYear((releaseYear) => releaseYear + 1);
        } else setHasMore(false);

        setMovieLoading(false);
      }
    });
  }, [releaseYear]);

  const loadGenres = useCallback(async () => {
    setGenreLoading(true);
    const resp = fetchGenres();
    resp.then((data) => {
      if (data?.data) {
        setGenres(
          data.data.genres.map((genre) => ({ ...genre, isActive: false }))
        );
      }
      setGenreLoading(false);
    });
  }, []);

  useEffect(() => {
    loadMovies();
    loadGenres();
  }, []);

  return (
    <MovieContext.Provider
      value={{ movies, setMovies, genres, setGenres, genreLoading }}
    >
      <Header />
      <InfiniteScroll
        loadMore={loadMovies}
        apiCallInitated={movieLoading}
        loader={<MoviesLoader />}
        hasMore={hasMore}
      >
        <MovieList />
        {!hasMore && <div className="footer">Movie List Ended!</div>}
      </InfiniteScroll>
    </MovieContext.Provider>
  );
}
