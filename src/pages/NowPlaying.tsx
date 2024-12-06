import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMovies,
  fetchSearchResultsThunk,
  fetchGenresThunk,
  incrementPage,
  setFetching,
} from "../store/moviesSlice";
import { RootState, AppDispatch } from "../store";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import Loading from "../components/Loading";
import Error from "../components/Error";
import NoItemsFound from "../components/NoItemsFound";

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

  // Fetch genres once on component load
  useEffect(() => {
    if (hasMore) {
      if (Object.keys(genres).length === 0) {
        dispatch(fetchGenresThunk());
      }
    }
  }, [dispatch, genres]);

  // Fetch movies or search results on query/page changes
  useEffect(() => {
    if (hasMore) {
      if (searchQuery.trim()) {
        if (!isFetching && movies.length) return;
        dispatch(fetchSearchResultsThunk({ query: searchQuery, page })).finally(
          () => dispatch(setFetching(false))
        );
      } else {
        if (!isFetching && movies.length) return;
        dispatch(fetchMovies(page)).finally(() => dispatch(setFetching(false)));
      }
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

  return (
    <div>
      {/* Search Bar */}
      <SearchBar />

      {/* Loading */}
      {loading && <Loading />}

      {/* Error */}
      {error && <Error message={error} />}

      {/* No Items Found */}
      {!loading && movies.length === 0 && searchQuery && <NoItemsFound />}

      {/* Movie Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} genres={genres} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
