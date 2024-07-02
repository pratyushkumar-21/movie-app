import { useState, useEffect } from "react";
import Header from "./header";
import MovieList from "./movie_list";
import { MovieType } from "../../utils/api_response_types";
import MovieContext from "./movie_list/context";
import { fetchMovies } from "../../utils/api";

export default function Movies() {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const resp = fetchMovies();
      resp.then((data) => {
        if (data?.data) setMovies(data.data.results);
        setLoading(false);
      });
    }, 2000);
  }, []);

  return (
    <MovieContext.Provider value={{ movies, setMovies }}>
      <div>
        <Header />
        <MovieList loading={loading} />
      </div>
    </MovieContext.Provider>
  );
}
