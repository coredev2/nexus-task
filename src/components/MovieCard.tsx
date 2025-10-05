import type { Movie } from "../types/movie.types";
import { getMoviePosterUrl, handleImageError } from "../utils/imageHelpers";

interface MovieCardProps {
  movie: Movie;
  onClick: (imdbID: string) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  return (
    <div
      onClick={() => onClick(movie.imdbID)}
      className="group cursor-pointer transform transition duration-300 hover:scale-105"
    >
      <div className="relative overflow-hidden rounded-lg shadow-lg bg-slate-800">
        <img
          src={getMoviePosterUrl(movie.Poster)}
          alt={movie.Title}
          onError={handleImageError}
          className="w-full h-auto aspect-[2/3] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">
              {movie.Title}
            </h3>
            <p className="text-gray-300 text-xs">
              {movie.Year} • {movie.Type}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-2 md:hidden">
        <h3 className="text-white font-semibold text-sm line-clamp-2">
          {movie.Title}
        </h3>
        <p className="text-gray-400 text-xs">{movie.Year}</p>
      </div>
    </div>
  );
};
