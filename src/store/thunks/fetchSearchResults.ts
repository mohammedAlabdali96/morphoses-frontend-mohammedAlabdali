import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchSearchResults } from "../../services/api";

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
