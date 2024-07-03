import { useState, useEffect, useCallback } from "react";
import Header from "./header";
import MovieList from "./movie_list";
import MovieContext, { MoviesStateType } from "./movie_list/context";
import InfiniteScroll from "../common/InfiniteScroll";
import MoviesLoader from "./movie_list/MoviesLoader";
import { fetchMovies } from "../../utils/api";

export default function Movies() {
  const [movies, setMovies] = useState<MoviesStateType>({});
  const [releaseYear, setReleaseYear] = useState(2012);
  const [movieLoading, setMovieLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

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

  useEffect(() => {
    loadMovies();
  }, []);

  return (
    <MovieContext.Provider value={{ movies, setMovies }}>
      <div>
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
      </div>
    </MovieContext.Provider>
  );
}
