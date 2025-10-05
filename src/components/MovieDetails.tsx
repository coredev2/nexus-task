import type { MovieDetails as MovieDetailsType } from "../types/movie.types";
import { getMoviePosterUrl, handleImageError } from "../utils/imageHelpers";

interface MovieDetailsProps {
  movie: MovieDetailsType;
  onBack: () => void;
}

export const MovieDetails: React.FC<MovieDetailsProps> = ({
  movie,
  onBack,
}) => {
  return (
    <div className="w-full max-w-6xl py-8 animate-fade-in">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-white hover:text-purple-400 transition duration-200 mb-6 group"
      >
        <svg
          className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-200"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        <span className="font-semibold">Back to Results</span>
      </button>

      {/* Movie Details Content */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50">
        <div className="grid md:grid-cols-[180px,1fr] lg:grid-cols-[220px,1fr] gap-6 md:gap-8 p-6 md:p-8">
          {/* Poster */}
          <div className="flex justify-center items-center md:items-start">
            <img
              src={getMoviePosterUrl(movie.Poster)}
              alt={movie.Title}
              onError={handleImageError}
              className="rounded-lg shadow-xl w-full max-w-[150px] md:max-w-min h-auto object-cover"
            />
          </div>

          {/* Details */}
          <div className="space-y-6">
            {/* Title and Year */}
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                {movie.Title}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-gray-300">
                <span className="text-lg">{movie.Year}</span>
                <span>•</span>
                <span>{movie.Rated}</span>
                <span>•</span>
                <span>{movie.Runtime}</span>
              </div>
            </div>

            {/* Genre */}
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Genre
              </h3>
              <div className="flex flex-wrap gap-2">
                {movie.Genre.split(", ").map((genre, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-purple-600/30 border border-purple-500/50 text-purple-200 rounded-full text-sm"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>

            {/* Ratings */}
            {movie.imdbRating !== "N/A" && (
              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Rating
                </h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-400 text-2xl">⭐</span>
                    <span className="text-2xl font-bold text-white">
                      {movie.imdbRating}
                    </span>
                    <span className="text-gray-400">/10</span>
                  </div>
                  {movie.imdbVotes !== "N/A" && (
                    <span className="text-sm text-gray-400">
                      ({movie.imdbVotes} votes)
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Plot */}
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Plot
              </h3>
              <p className="text-gray-300 leading-relaxed">{movie.Plot}</p>
            </div>

            {/* Additional Info */}
            <div className="grid sm:grid-cols-2 gap-4">
              {movie.Director !== "N/A" && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-400 mb-1">
                    Director
                  </h4>
                  <p className="text-white">{movie.Director}</p>
                </div>
              )}
              {movie.Actors !== "N/A" && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-400 mb-1">
                    Actors
                  </h4>
                  <p className="text-white">{movie.Actors}</p>
                </div>
              )}
              {movie.Language !== "N/A" && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-400 mb-1">
                    Language
                  </h4>
                  <p className="text-white">{movie.Language}</p>
                </div>
              )}
              {movie.Country !== "N/A" && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-400 mb-1">
                    Country
                  </h4>
                  <p className="text-white">{movie.Country}</p>
                </div>
              )}
              {movie.Awards !== "N/A" && (
                <div className="sm:col-span-2">
                  <h4 className="text-sm font-semibold text-gray-400 mb-1">
                    Awards
                  </h4>
                  <p className="text-white">{movie.Awards}</p>
                </div>
              )}
            </div>

            {/* Box Office */}
            {movie.BoxOffice && movie.BoxOffice !== "N/A" && (
              <div>
                <h4 className="text-sm font-semibold text-gray-400 mb-1">
                  Box Office
                </h4>
                <p className="text-white text-lg font-semibold">
                  {movie.BoxOffice}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
