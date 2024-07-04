import { memo } from "react";
import { GenreType } from "../../../utils/api_response_types";

interface GenreCardPropsType extends GenreType {
  isActive: boolean;
}

function GenreCard(props: GenreCardPropsType) {
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

export default memo(GenreCard);
