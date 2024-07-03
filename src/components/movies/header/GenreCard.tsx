import { GenresStateType } from "../movie_list/context";

export default function GenreCard(props: GenresStateType) {
  const { name, isActive, id } = props;
  return (
    <div
      className={`genre-card-container ${isActive ? "active-genre" : ""}`}
      data-genre-id={id}
    >
      {name}
    </div>
  );
}
