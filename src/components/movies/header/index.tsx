import { useContext } from "react";
import GenreList from "./GenreList";
import MovieSearch from "./MovieSearch";
import MovieContext from "../movie_list/context";

export default function Header() {
  const { keywords, setKeywords } = useContext(MovieContext);

  return (
    <header className="header-container">
      <div className="brand-container">
        <h3 className="brand-name">MOVIEFIX</h3>
        <MovieSearch />
      </div>
      <GenreList />
    </header>
  );
}
