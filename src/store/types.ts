import { Movie } from "../types/api";

export interface MovieState {
  movies: Movie[];
  genres: { [key: number]: string };
  page: number;
  searchQuery: string;
  isFetching: boolean;
  loading: boolean;
  error: null | string;
  totalResults: number;
  totalPages: number;
  hasMore: boolean;
}
