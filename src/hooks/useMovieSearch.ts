import { useState, useCallback, useRef } from "react";
import { searchMovies, getMovieDetails } from "../services/movieApi";
import type { Movie, MovieDetails } from "../types/movie.types";

interface UseMovieSearchReturn {
  movies: Movie[];
  selectedMovie: MovieDetails | null;
  loading: boolean;
  loadingDetails: boolean;
  error: string | null;
  searchMovies: (query: string) => Promise<void>;
  selectMovie: (imdbID: string) => Promise<void>;
  clearSelection: () => void;
  clearError: () => void;
}

export const useMovieSearch = (): UseMovieSearchReturn => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  const handleSearchMovies = useCallback(async (query: string) => {
    if (!query.trim()) {
      setMovies([]);
      setError(null);
      return;
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

    setLoading(true);
    setError(null);
    setMovies([]);
    setSelectedMovie(null);

    try {
      const results = await searchMovies(
        query,
        abortControllerRef.current.signal
      );
      setMovies(results);
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") {
        return;
      }

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSelectMovie = useCallback(async (imdbID: string) => {
    setLoadingDetails(true);
    setError(null);

    try {
      const details = await getMovieDetails(imdbID);
      setSelectedMovie(details);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoadingDetails(false);
    }
  }, []);

  const handleClearSelection = useCallback(() => {
    setSelectedMovie(null);
    setError(null);
  }, []);

  const handleClearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    movies,
    selectedMovie,
    loading,
    loadingDetails,
    error,
    searchMovies: handleSearchMovies,
    selectMovie: handleSelectMovie,
    clearSelection: handleClearSelection,
    clearError: handleClearError,
  };
};
