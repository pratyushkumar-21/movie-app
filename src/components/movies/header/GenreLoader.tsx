export default function GenreLoader() {
  return (
    <div className="genre-list-container">
      {Array(5)
        .fill(null)
        .map((_, i) => (
          <div
            key={i}
            className="genre-card-container genre-shimmer-card"
          ></div>
        ))}
    </div>
  );
}
