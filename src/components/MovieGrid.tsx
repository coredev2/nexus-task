import type { Movie } from "../types/movie.types";
import { MovieCard } from "./MovieCard";

interface MovieGridProps {
  movies: Movie[];
  onMovieClick: (imdbID: string) => void;
}

export const MovieGrid: React.FC<MovieGridProps> = ({
  movies,
  onMovieClick,
}) => {
  if (movies.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-6xl px-4 mt-8">
      <h2 className="text-2xl font-bold text-white mb-6">
        Search Results ({movies.length})
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} onClick={onMovieClick} />
        ))}
      </div>
    </div>
  );
};
