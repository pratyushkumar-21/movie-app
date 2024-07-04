import { useContext, useCallback } from "react";
import InputSearch from "../../common/InputSearch";
import MovieContext from "../movie_list/context";

export default function MovieSearch() {
  const { keywords, setKeywords, setMovies } = useContext(MovieContext);

  const handleSearch = useCallback(
    (query: string) => {
      if (!setKeywords) return;

      setKeywords(query);
      if (setMovies) setMovies({});
    },
    [setMovies, setKeywords]
  );

  return <InputSearch searchValue={keywords} setSearchValue={handleSearch} />;
}
