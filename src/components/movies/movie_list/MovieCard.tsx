import { MovieType } from "../../../utils/api_response_types";
import { getImageUrl, getSlicedString } from "../../../utils/common";

export default function MovieCard(props: MovieType) {
  const { title, backdrop_path, poster_path, overview } = props;

  return (
    <div className="movie-card-container">
      <img
        src="https://picsum.photos/200"
        alt={`poster of ${title}`}
        className="movie-poster"
        loading="lazy"
      />
      <h4>{title}</h4>
      <p>Genre: PENDING</p>
      <p>{getSlicedString(overview)}</p>
    </div>
  );
}
