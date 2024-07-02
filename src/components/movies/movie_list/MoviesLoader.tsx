export default function MoviesLoader() {
  return (
    <div className="movie-list-container">
      {Array(10)
        .fill(null)
        .map((_, i) => (
          <div key={i} className="movie-card-container"></div>
        ))}
    </div>
  );
}
