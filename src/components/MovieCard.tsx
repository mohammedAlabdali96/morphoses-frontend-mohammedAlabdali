import React from "react";

const MovieCard: React.FC<any> = ({ movie, genres }) => {
  return (
    <div className="movie-card border p-4 rounded-md shadow-md">
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
        Genres: {movie.genre_ids.map((id: any) => genres[id]).join(", ")}
      </p>
      <p className="text-sm mt-2 line-clamp-3">{movie.overview}</p>
    </div>
  );
};

export default MovieCard;
