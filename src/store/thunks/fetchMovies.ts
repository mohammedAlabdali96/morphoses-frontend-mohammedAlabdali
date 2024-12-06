import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchNowPlaying } from "../../services/api";

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
