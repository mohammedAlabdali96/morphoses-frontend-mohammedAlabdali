import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchNowPlaying,
  fetchSearchResults,
  fetchGenres,
} from "../services/api";
import { Movie } from "../types/api";

interface MovieState {
  movies: Movie[];
  genres: { [key: number]: string }; // Map of genre ID to name
  page: number; // Tracks the current page for infinite scroll
  searchQuery: string; // Current search query
  isFetching: boolean; // Tracks if data is being fetched
  loading: boolean; // General loading state
  error: null | string;
  totalResults: number; // Total results from the API
  totalPages: number; // Total pages from the API
  hasMore: boolean; // Tracks if there are more pages to fetch
}

const initialState: MovieState = {
  movies: [],
  genres: {},
  page: 1,
  searchQuery: "",
  isFetching: false,
  loading: false,
  error: null,
  totalResults: 0,
  totalPages: 0,
  hasMore: true,
};

// Fetch "Now Playing" movies
export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (page: number) => {
    const response = await fetchNowPlaying(page);
    return {
      movies: response.results,
      totalResults: response.total_results,
      totalPages: response.total_pages,
    };
  }
);

// Fetch search results
export const fetchSearchResultsThunk = createAsyncThunk(
  "movies/fetchSearchResults",
  async ({ query, page }: { query: string; page: number }) => {
    const response = await fetchSearchResults(query, page);
    return {
      movies: response.results,
      totalResults: response.total_results,
      totalPages: response.total_pages,
    };
  }
);

// Fetch genres
export const fetchGenresThunk = createAsyncThunk(
  "movies/fetchGenres",
  async () => {
    const response = await fetchGenres();
    return response.genres.reduce((map, genre) => {
      map[genre.id] = genre.name;
      return map;
    }, {} as { [key: number]: string });
  }
);

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
      });
  },
});

export const { resetMovies, setSearchQuery, incrementPage, setFetching } =
  movieSlice.actions;

export default movieSlice.reducer;
