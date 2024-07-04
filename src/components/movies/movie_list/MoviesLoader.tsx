export default function MoviesLoader() {
  return (
    <div className="movie-list-container movie-list">
      {Array(8)
        .fill(null)
        .map((_, i) => (
          <div key={i} className="movie-card-container"></div>
        ))}
    </div>
  );
}
