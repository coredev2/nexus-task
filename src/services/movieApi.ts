import { OMDB_API_URL, OMDB_API_KEY } from "../constants/config";
import type {
  Movie,
  MovieDetails,
  MovieSearchResponse,
  MovieDetailsResponse,
} from "../types/movie.types";

export const searchMovies = async (
  query: string,
  signal?: AbortSignal
): Promise<Movie[]> => {
  const response = await fetch(
    `${OMDB_API_URL}?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(query)}`,
    { signal }
  );

  if (!response.ok) {
    if (response.status === 429) {
      throw new Error("API rate limit exceeded. Please try again in a moment.");
    }
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data: MovieSearchResponse = await response.json();

  if (data.Response === "False") {
    if (data.Error?.includes("too many results")) {
      throw new Error("Too many results found. Please be more specific.");
    } else if (data.Error?.includes("limit reached")) {
      throw new Error("API limit reached. Please try again later.");
    } else {
      throw new Error(data.Error || "No movies found. Try a different search.");
    }
  }

  return data.Search || [];
};

export const getMovieDetails = async (
  imdbID: string
): Promise<MovieDetails> => {
  const response = await fetch(
    `${OMDB_API_URL}?apikey=${OMDB_API_KEY}&i=${imdbID}&plot=full`
  );

  if (!response.ok) {
    if (response.status === 429) {
      throw new Error("API rate limit exceeded. Please try again in a moment.");
    }
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data: MovieDetailsResponse = await response.json();

  if (data.Response === "False") {
    throw new Error(data.Error || "Failed to load movie details.");
  }

  return data;
};
