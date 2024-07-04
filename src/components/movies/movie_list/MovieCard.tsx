import { useContext } from "react";
import MovieContext from "./context";
import { MovieType } from "../../../utils/api_response_types";
import { getImageUrl, truncateText } from "../../../utils/common";

export default function MovieCard(props: MovieType) {
  const {
    title,
    poster_path,
    overview,
    genre_ids,
    release_date,
    vote_average,
    popularity,
  } = props;
  const { genres } = useContext(MovieContext);

  const genreNames = genres
    .filter((genre) => genre_ids.includes(genre.id))
    .map((genre) => genre.name);

  return (
    <div className="movie-card-container">
      <div className="movie-poster">
        <img
          src={getImageUrl(poster_path)}
          alt={`poster of ${title}`}
          loading="lazy"
        />
      </div>
      <div className="movie-card-body">
        <div className="movie-card-body-header">
          <div>
            <h3 className="movie-title">{title}</h3>
            <div className="movie-date">{release_date}</div>
          </div>
          <div className="vote-average-container">
            <div className="vote-average">{vote_average.toFixed(1)}</div>
          </div>
        </div>
        <div>{genreNames.join(", ")}</div>
        <div>
          Popularity Score - <strong>{popularity.toFixed(2)}</strong>
        </div>
        <div>{truncateText(overview)}</div>
      </div>
    </div>
  );
}
