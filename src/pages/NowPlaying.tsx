import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { incrementPage, setFetching } from "../store/moviesSlice";
import { fetchMovies } from "../store/thunks/fetchMovies";
import { fetchSearchResultsThunk } from "../store/thunks/fetchSearchResults";
import { fetchGenresThunk } from "../store/thunks/fetchGenres";
import { fetchMovieById } from "../services/api";
import { RootState, AppDispatch } from "../store";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import Loading from "../components/Loading";
import Error from "../components/Error";
import NoItemsFound from "../components/NoItemsFound";
import ExpandedMovieDetails from "../components/ExpandedMovieDetails";

const MovieList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    movies,
    genres,
    page,
    searchQuery,
    isFetching,
    loading,
    error,
    hasMore,
  } = useSelector((state: RootState) => state.movies);

  const [expandedMovieId, setExpandedMovieId] = useState<number | null>(null);
  const [expandedMovieDetails, setExpandedMovieDetails] = useState<any>(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  useEffect(() => {
    if (Object.keys(genres).length === 0) {
      dispatch(fetchGenresThunk());
    }
    if (!hasMore) return;

    if (!isFetching && movies.length) return;
    if (searchQuery.trim()) {
      dispatch(fetchSearchResultsThunk({ query: searchQuery, page })).finally(
        () => dispatch(setFetching(false))
      );
    } else {
      dispatch(fetchMovies(page)).finally(() => dispatch(setFetching(false)));
    }
  }, [dispatch, isFetching, searchQuery, page]);

  useInfiniteScroll({
    isFetching,
    loading,
    onScrollEnd: () => {
      dispatch(setFetching(true));
      dispatch(incrementPage());
    },
  });

  const handleExpandMovie = async (movieId: number) => {
    if (expandedMovieId === movieId) {
      setExpandedMovieId(null);
      setExpandedMovieDetails(null);
      return;
    }
    setExpandedMovieId(movieId);
    setLoadingDetails(true);
    try {
      const details = await fetchMovieById(movieId);
      setExpandedMovieDetails(details);
    } catch (error) {
      console.error("Failed to fetch movie details:", error);
    } finally {
      setLoadingDetails(false);
    }
  };

  // Group movies into rows dynamically
  const rows = movies.reduce((acc: any[][], movie, index) => {
    if (index % 3 === 0) acc.push([]); // 3 cards per row
    acc[acc.length - 1].push(movie);
    return acc;
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="sticky top-0 bg-gray-800 z-10 p-4">
        <SearchBar />
      </header>

      <main className="p-6">
        {loading && <Loading />}
        {error && <Error message={error} />}
        {!loading && movies.length === 0 && searchQuery && <NoItemsFound />}

        {rows.map((row, rowIndex) => (
          <React.Fragment key={rowIndex}>
            {/* Row of other movies */}
            <div className="flex justify-center gap-6 mb-6">
              {row.map(
                (movie) =>
                  expandedMovieId !== movie.id && (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      genres={genres}
                      onClick={() => handleExpandMovie(movie.id)}
                    />
                  )
              )}
            </div>

            {expandedMovieId &&
              row.some((movie) => movie.id === expandedMovieId) && (
                <ExpandedMovieDetails
                  key={expandedMovieId}
                  movieId={expandedMovieId}
                  expandedMovieDetails={expandedMovieDetails}
                  loadingDetails={loadingDetails}
                  onClose={() => setExpandedMovieId(null)}
                />
              )}
          </React.Fragment>
        ))}
      </main>
    </div>
  );
};

export default MovieList;
