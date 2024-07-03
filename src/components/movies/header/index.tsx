import GenreList from "./GenreList";

export default function Header() {
  return (
    <header className="header-container">
      <h3 className="brand-name">MOVIEFIX</h3>
      <GenreList />
    </header>
  );
}
