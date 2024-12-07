import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMovieById } from "../../services/api";

export const fetchMovieDetails = createAsyncThunk(
  "movies/fetchMovieDetails",
  async (movieId: number) => {
    const response = await fetchMovieById(movieId);
    return response; // Contains videos, reviews, similar movies, and details
  }
);
