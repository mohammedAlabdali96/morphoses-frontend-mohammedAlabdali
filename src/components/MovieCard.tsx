import React from "react";
import { useNavigate } from "react-router-dom";
import { Movie } from "../types/api";

interface MovieCardProps {
  movie: Movie;
  genres: { [key: number]: string };
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, genres }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movies/${movie.id}`);
  };

  return (
    <div
      className="movie-card cursor-pointer border border-gray-300 p-4 rounded-md shadow-sm hover:shadow-lg hover:scale-105 hover:bg-gray-100 transition-transform duration-300"
      onClick={handleClick}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-60 object-cover rounded-md"
      />
      <h3 className="text-lg font-bold mt-2">
        {movie.title} ({new Date(movie.release_date).getFullYear()})
      </h3>
      <p className="text-sm text-gray-600">Rating: {movie.vote_average} / 10</p>
      <p className="text-sm text-gray-500">
        Genres: {movie.genre_ids.map((id) => genres[id]).join(", ")}
      </p>
      <p className="text-sm mt-2 line-clamp-3">{movie.overview}</p>
    </div>
  );
};

export default MovieCard;
