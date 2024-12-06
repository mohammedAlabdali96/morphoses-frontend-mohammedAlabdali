import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementPage,
  setFetching,
} from "../store/moviesSlice";
import { fetchMovies } from "../store/thunks/fetchMovies";
import { fetchSearchResultsThunk } from "../store/thunks/fetchSearchResults";
import { fetchGenresThunk } from "../store/thunks/fetchGenres";
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


  useEffect(() => {
    if (Object.keys(genres).length === 0) {
      dispatch(fetchGenresThunk());
    }
    // check if it last page
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

  return (
    <div>
      <SearchBar />

      {loading && <Loading />}

      {error && <Error message={error} />}

      {!loading && movies.length === 0 && searchQuery && <NoItemsFound />}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {movies.map((movie, index) => (
          <MovieCard key={index} movie={movie} genres={genres} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
