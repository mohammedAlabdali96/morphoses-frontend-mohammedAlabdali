import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchNowPlaying, fetchGenres } from "../services/api";
import { Movie } from "../types/api";

interface MoviesState {
  movies: Movie[];
  genres: { [key: number]: string }; // Map of genre ID to name
  status: "idle" | "loading" | "succeeded" | "failed";
  loading: boolean;
}

const initialState: MoviesState = {
  movies: [],
  genres: {},
  status: "idle",
  loading: false,
};

interface FetchMoviesResult {
  movies: Movie[];
  genres: { [key: number]: string };
}

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (page: number, { getState }) => {
    const { movies }: any = getState();
    const genresResponse = movies.genres ? null : await fetchGenres();
    console.log("fetch");
    const nowPlayingResponse = await fetchNowPlaying(page);

    const genreMap: { [key: number]: string } = genresResponse
      ? genresResponse.genres.reduce((map, genre) => {
          map[genre.id] = genre.name;
          return map;
        }, {} as { [key: number]: string })
      : movies.genres;

    return {
      movies: nowPlayingResponse.results,
      genres: genresResponse ? genreMap : movies.genres,
    };
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        if (!state.loading) {
          state.loading = true;
          state.status = "loading";
        }
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.movies = [...state.movies, ...action.payload.movies];
        state.genres = action.payload.genres;
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.loading = false;
        state.status = "failed";
      });
  },
});

export const { resetState } = moviesSlice.actions;
export default moviesSlice.reducer;
