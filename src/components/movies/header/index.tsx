import { memo } from "react";
import GenreList from "./GenreList";
import MovieSearch from "./MovieSearch";

function Header() {
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

export default memo(Header);
