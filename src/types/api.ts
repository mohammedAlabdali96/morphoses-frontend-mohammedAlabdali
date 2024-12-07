export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  genre_ids: number[];
  release_date: string;
  vote_average: number;
  videos?: {
    results: Video[];
  };
  reviews?: {
    page: number;
    results: Review[];
    total_pages: number;
    total_results: number;
  };
  similar?: {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
  };
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

export interface Review {
  author: string;
  content: string;
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

//dsds

export interface Video {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
}

export interface Review {
  author: string;
  content: string;
  id: string;
  url: string;
  author_details: {
    name: string;
    username: string;
    avatar_path: string | null;
    rating: number | null;
  };
  created_at: string;
  updated_at: string;
}

export interface SimilarMovie extends Movie {
  popularity: number;
  vote_count: number;
}

export interface MovieDetailsResponse extends Movie {
  budget: number;
  revenue: number;
  homepage: string | null;
  status: string;
  tagline: string | null;
}
