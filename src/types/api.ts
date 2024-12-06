export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  genre_ids: number[];
  release_date: string;
  vote_average: number;
  preview: {
    videos: Video[];
    reviews: Review[];
    similarMovies: Movie[];
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
