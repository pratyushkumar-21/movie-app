import { MovieType } from "../../../utils/api_response_types";

export default function MovieCard(props: MovieType) {
  const { title } = props;

  return <div className="movie-card-container">{title}</div>;
}
