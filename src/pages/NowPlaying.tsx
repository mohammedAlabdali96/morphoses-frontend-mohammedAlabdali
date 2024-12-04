import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies } from "../store/moviesSlice";
import { RootState, AppDispatch } from "../store";
import MovieCard from "../components/MovieCard";

const NowPlaying: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { movies, genres, status } = useSelector(
    (state: RootState) => state.movies
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchMovies());
    }
  }, [dispatch, status]);

  if (status === "loading") {
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
    </div>
  );
};

export default NowPlaying;
