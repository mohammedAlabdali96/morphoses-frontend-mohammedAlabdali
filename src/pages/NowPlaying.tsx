import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies, resetState } from "../store/moviesSlice";
import { RootState, AppDispatch } from "../store";
import MovieCard from "../components/MovieCard";
import useInfiniteScroll from "../hooks/useInfiniteScroll";

const NowPlaying: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { movies, genres, status, loading } = useSelector(
    (state: RootState) => state.movies
  );
  const [page, setPage] = useState(1);

  const handleFetchMore = useCallback(() => {
    setPage((prevPage) => prevPage + 1);
  }, []);

  const [isFetching, setIsFetching] = useInfiniteScroll(handleFetchMore);

  // Handle initial load
  useEffect(() => {
    if (status === "idle" && !loading) {
      dispatch(fetchMovies(page))
        .then(() => {
          setPage((prevPage) => prevPage + 1);
        })
        .catch(() => {
          console.error("Failed to fetch initial movies");
        });
    }
  }, [dispatch, status, page]);

  useEffect(() => {
    if (isFetching && !loading) {
      dispatch(fetchMovies(page))
        .then(() => {
          setIsFetching(false);
        })
        .catch(() => {
          setIsFetching(false);
        });
    }
  }, [dispatch, page, isFetching]);

  if (status === "loading" && page === 1) {
    return <p className="text-center mt-8">Loading movies...</p>;
  }

  if (status === "failed") {
    return (
      <p className="text-center mt-8 text-red-600">
        Failed to load movies. Please try again.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} genres={genres} />
      ))}
      {loading && <p className="text-center mt-4">Loading more movies...</p>}
    </div>
  );
};

export default NowPlaying;
