export interface Movie {
  id: number;
  title: string;
  release_date: string;
  genre_ids: number[];
  poster_path: string;
  vote_average: number;
  overview: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface NowPlayingResponse {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}

export interface GenreResponse {
  genres: Genre[];
}
