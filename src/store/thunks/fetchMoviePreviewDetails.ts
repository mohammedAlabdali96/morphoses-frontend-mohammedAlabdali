import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMovieVideos } from "../../services/api";
import { fetchMovieReviews } from "../../services/api";
import { fetchSimilarMovies } from "../../services/api";



export const fetchMoviePreviewDetails = createAsyncThunk(
    "movies/fetchMoviePreviewDetails",
    async (movieId: number) => {
      const [videos, reviews, similarMovies] = await Promise.all([
        fetchMovieVideos(movieId),
        fetchMovieReviews(movieId),
        fetchSimilarMovies(movieId),
      ]);
      return {
        movieId,
        videos: videos.results,
        reviews: reviews.results.slice(0, 2), // Limit reviews to 2
        similarMovies: similarMovies.results,
      };
    }
  );
  