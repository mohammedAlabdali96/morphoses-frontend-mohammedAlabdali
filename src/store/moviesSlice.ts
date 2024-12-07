import { createSlice } from "@reduxjs/toolkit";
import { fetchMovies } from "./thunks/fetchMovies";
import { fetchSearchResultsThunk } from "./thunks/fetchSearchResults";
import { fetchGenresThunk } from "./thunks/fetchGenres";
import { fetchMovieDetails } from "./thunks/fetchMovieDetails";

import { initialState } from "./initialState";

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    resetMovies(state) {
      state.movies = [];
      state.page = 1;
      state.searchQuery = "";
      state.totalResults = 0;
      state.totalPages = 0;
      state.hasMore = true;
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
      state.page = 1;
      state.movies = [];
      state.totalResults = 0;
      state.totalPages = 0;
      state.hasMore = true;
    },
    incrementPage(state) {
      if (state.page < state.totalPages) {
        state.page += 1;
      } else {
        state.hasMore = false;
      }
    },
    setFetching(state, action) {
      state.isFetching = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchMovies
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.isFetching = false;
        state.totalResults = action.payload.totalResults;
        state.totalPages = action.payload.totalPages;
        state.movies = [...state.movies, ...action.payload.movies];

        if (state.page >= action.payload.totalPages) {
          state.hasMore = false;
        }
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.loading = false;
        state.isFetching = false;
        state.error = "Failed to fetch movies.";
      })

      .addCase(fetchSearchResultsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchResultsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isFetching = false;
        state.totalResults = action.payload.totalResults;
        state.totalPages = action.payload.totalPages;
        state.movies = [...state.movies, ...action.payload.movies];

        if (state.page >= action.payload.totalPages) {
          state.hasMore = false;
        }
      })
      .addCase(fetchSearchResultsThunk.rejected, (state) => {
        state.loading = false;
        state.isFetching = false;
        state.error = "Failed to fetch search results.";
      })

      .addCase(fetchGenresThunk.fulfilled, (state, action) => {
        state.genres = action.payload;
      })
      // Fetch movie preview details
      .addCase(fetchMovieDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedMovie = null;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedMovie = action.payload;
      })
      .addCase(fetchMovieDetails.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch movie details.";
      });
  },
});

export const { resetMovies, setSearchQuery, incrementPage, setFetching } =
  movieSlice.actions;

export default movieSlice.reducer;
