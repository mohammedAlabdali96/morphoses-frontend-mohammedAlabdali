import axios from "axios";
import {
  NowPlayingResponse,
  GenreResponse,
  MovieDetailsResponse,
} from "../types/api";

const API_KEY = "eb46c700349d0bc443b533a821cec5db";
const BASE_URL = "https://api.themoviedb.org/3";

const fetchData = async (
  endpoint: string,
  params: Record<string, any> = {}
) => {
  const response = await axios.get(`${BASE_URL}${endpoint}`, {
    params: { api_key: API_KEY, ...params },
  });
  return response.data;
};

export const fetchNowPlaying = async (
  page: number
): Promise<NowPlayingResponse> => {
  return fetchData("/movie/now_playing", { page });
};

export const fetchGenres = async (): Promise<GenreResponse> => {
  return fetchData("/genre/movie/list");
};

export const fetchSearchResults = async (
  query: string,
  page: number
): Promise<NowPlayingResponse> => {
  return fetchData("/search/movie", { query: encodeURIComponent(query), page });
};

export const fetchMovieById = async (
  movieId: number
): Promise<MovieDetailsResponse> => {
  return fetchData(`/movie/${movieId}`, {
    append_to_response: "videos,reviews,similar",
  });
};
