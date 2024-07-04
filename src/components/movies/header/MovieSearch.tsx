import { useContext, useCallback } from "react";
import InputSearch from "../../common/InputSearch";
import MovieContext from "../movie_list/context";
import { DEFAULT_MOVIE_RELEASE_YEAR } from "../constant";

export default function MovieSearch() {
  const { keywords, setKeywords, setMovieReleaseYears, setMovies } =
    useContext(MovieContext);

  const handleSearch = useCallback(
    (query: string) => {
      if (!setKeywords) return;

      setKeywords(query);

      if (setMovies) setMovies({});

      if (setMovieReleaseYears)
        setMovieReleaseYears([
          DEFAULT_MOVIE_RELEASE_YEAR,
          DEFAULT_MOVIE_RELEASE_YEAR,
        ]);
    },
    [setMovies, setKeywords, setMovieReleaseYears]
  );

  return <InputSearch searchValue={keywords} setSearchValue={handleSearch} />;
}
