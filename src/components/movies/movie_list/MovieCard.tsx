import { useContext } from "react";
import MovieContext from "./context";
import { MovieType } from "../../../utils/api_response_types";
import { getImageUrl, getSlicedString } from "../../../utils/common";

export default function MovieCard(props: MovieType) {
  const { title, backdrop_path, poster_path, overview, genre_ids } = props;
  const { genres } = useContext(MovieContext);

  const genreNames = genres
    .filter((genre) => genre_ids.includes(genre.id))
    .map((genre) => genre.name);

  return (
    <div className="movie-card-container">
      <img
        src="https://picsum.photos/200"
        alt={`poster of ${title}`}
        className="movie-poster"
        loading="lazy"
      />
      <h4>{title}</h4>
      {genreNames.length > 0 && <div>Genre:{genreNames.join(", ")}</div>}
      <p>{getSlicedString(overview)}</p>
    </div>
  );
}
