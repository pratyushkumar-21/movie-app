import { useContext, MouseEvent, memo, useCallback } from "react";
import MovieContext from "../movie_list/context";
import GenreCard from "./GenreCard";
import GenreLoader from "./GenreLoader";

function GenreList() {
  const { genres, genreLoading, setMovies, setSelectedGenres, selectedGenres } =
    useContext(MovieContext);

  const handleGenreClick = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      const target = e.target;

      if (target instanceof HTMLElement) {
        const genreIdStr = target.dataset.genreId;
        const genreId = genreIdStr ? parseFloat(genreIdStr) : null;

        if (genreId) {
          if (setSelectedGenres)
            setSelectedGenres((genreSet) => {
              const updatedSelectedGenres =
                genreId === Infinity
                  ? new Set<number>()
                  : genreSet.delete(genreId)
                  ? genreSet
                  : genreSet.add(genreId);

              return new Set(updatedSelectedGenres);
            });

          if (setMovies) setMovies({});
        }
      }
    },
    [setMovies, setSelectedGenres]
  );

  if (genreLoading) return <GenreLoader />;

  return (
    <section className="genre-list-container" onClick={handleGenreClick}>
      {genres.map((genre) => (
        <GenreCard
          key={genre.id}
          {...genre}
          isActive={
            selectedGenres.size == 0 && genre.id === Infinity
              ? true
              : selectedGenres.has(genre.id)
          }
        />
      ))}
    </section>
  );
}

export default memo(GenreList);
