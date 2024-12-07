import { MovieState } from "./types";

export const initialState: MovieState = {
  movies: [],
  selectedMovie: null,
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
