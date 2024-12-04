import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchNowPlaying, fetchGenres } from '../services/api';


const initialState: any = {
    movies: [],
    genres: {},
    status: 'idle',
  };

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
  const [genres, nowPlaying] = await Promise.all([fetchGenres(), fetchNowPlaying(1)]);
  const genreMap: { [key: number]: string } = {};
  genres.genres.forEach((genre: any) => {
    genreMap[genre.id] = genre.name;
  });
  return { movies: nowPlaying.results, genres: genreMap };
});

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchMovies.pending, (state) => {
          console.log('Fetching movies: pending');
          state.status = 'loading';
        })
        .addCase(fetchMovies.fulfilled, (state, action) => {
          console.log('Fetching movies: succeeded', action.payload);
          state.status = 'succeeded';
          state.movies = action.payload.movies;
          state.genres = action.payload.genres;
        })
        .addCase(fetchMovies.rejected, (state) => {
          console.log('Fetching movies: failed');
          state.status = 'failed';
        });
    },
  });
  

export default moviesSlice.reducer;
