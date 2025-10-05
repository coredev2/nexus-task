import "./App.css";
import { useMovieSearch } from "./hooks/useMovieSearch";
import {
  Logo,
  SearchBar,
  MovieGrid,
  MovieDetails,
  ErrorMessage,
  LoadingSpinner,
} from "./components";

function App() {
  const {
    movies,
    selectedMovie,
    loading,
    loadingDetails,
    error,
    searchMovies,
    selectMovie,
    clearSelection,
  } = useMovieSearch();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4">
      {selectedMovie ? (
        <MovieDetails movie={selectedMovie} onBack={clearSelection} />
      ) : (
        <>
          <Logo />
          <SearchBar onSearch={searchMovies} isLoading={loading} />

          {error && <ErrorMessage message={error} />}

          <MovieGrid movies={movies} onMovieClick={selectMovie} />

          {(loading || loadingDetails) && (
            <LoadingSpinner
              message={
                loadingDetails
                  ? "Loading movie details..."
                  : "Searching for movies..."
              }
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
