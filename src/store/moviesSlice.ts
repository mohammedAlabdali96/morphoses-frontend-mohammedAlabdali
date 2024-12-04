import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchNowPlaying, fetchGenres } from "../services/api";
import { Movie } from "../types/api";

interface MoviesState {
  movies: Movie[];
  genres: { [key: number]: string }; // Map of genre ID to name
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: MoviesState = {
  movies: [],
  genres: {},
  status: "idle",
};

interface FetchMoviesResult {
  movies: Movie[];
  genres: { [key: number]: string };
}

export const fetchMovies = createAsyncThunk<FetchMoviesResult>(
  "movies/fetchMovies",
  async () => {
    const [genresResponse, nowPlayingResponse] = await Promise.all([
      fetchGenres(),
      fetchNowPlaying(1),
    ]);

    const genreMap: { [key: number]: string } = {};
    genresResponse.genres.forEach((genre) => {
      genreMap[genre.id] = genre.name;
    });

    return {
      movies: nowPlayingResponse.results,
      genres: genreMap,
    };
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        console.log("Fetching movies: pending");
        state.status = "loading";
      })
      .addCase(
        fetchMovies.fulfilled,
        (state, action: PayloadAction<FetchMoviesResult>) => {
          console.log("Fetching movies: succeeded", action.payload);
          state.status = "succeeded";
          state.movies = action.payload.movies;
          state.genres = action.payload.genres;
        }
      )
      .addCase(fetchMovies.rejected, (state) => {
        console.log("Fetching movies: failed");
        state.status = "failed";
      });
  },
});

export default moviesSlice.reducer;
