import { useState, useEffect } from "react";
import Header from "./header";
import MovieList from "./movie_list";
import { MovieType } from "../../utils/api_response_types";
import { fetchMovies } from "../../utils/api";

export default function Movies() {
  const [movies, setMovies] = useState<MovieType[]>([]);

  useEffect(() => {
    const resp = fetchMovies();
    resp.then((data) => {
      if (data?.data) setMovies(data.data.results);
    });
  }, []);

  return (
    <div>
      <Header />
      <MovieList movies={movies} />
    </div>
  );
}
