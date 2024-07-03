import { useContext, MouseEvent } from "react";
import MovieContext from "../movie_list/context";
import GenreCard from "./GenreCard";
import GenreLoader from "./GenreLoader";

export default function GenreList() {
  const { genres, setGenres, genreLoading } = useContext(MovieContext);

  const handleGenreClick = (e: MouseEvent<HTMLElement>) => {
    const target = e.target;

    if (target instanceof HTMLElement) {
      const genreIdStr = target.dataset.genreId;
      const genreId = genreIdStr ? parseInt(genreIdStr) : null;

      if (setGenres)
        setGenres((prevGneres) =>
          prevGneres.map((genre) =>
            genre.id === genreId
              ? { ...genre, isActive: !genre.isActive }
              : genre
          )
        );
    }
  };

  if (genreLoading) return <GenreLoader />;

  return (
    <section className="genre-list-container" onClick={handleGenreClick}>
      {genres.map((genre) => (
        <GenreCard key={genre.id} {...genre} />
      ))}
    </section>
  );
}
