import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchGenres } from "../../services/api";

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
