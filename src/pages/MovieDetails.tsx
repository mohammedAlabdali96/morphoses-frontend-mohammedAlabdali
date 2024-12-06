import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchMoviePreviewDetails } from "../store/thunks/fetchMoviePreviewDetails";
import { RootState, AppDispatch } from "../store";
import { Movie } from "../types/api";

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Movie ID from the URL
  const dispatch = useDispatch<AppDispatch>();
  const { movies, genres } = useSelector((state: RootState) => state.movies);

  const movie: Movie | undefined = movies.find((m) => m.id === Number(id));

  useEffect(() => {
    if (!movie || !movie.preview) {
      dispatch(fetchMoviePreviewDetails(Number(id)));
    }
  }, [dispatch, id, movie]);

  if (!movie) {
    return <p className="text-center mt-8">Movie not found.</p>;
  }

  return (
    <div className="movie-details p-4">
      <h1 className="text-3xl font-bold">{movie.title}</h1>
      <p>{movie.overview}</p>

      {/* Trailer */}
      {movie.preview?.videos.length > 0 && (
        <iframe
          width="100%"
          height="315"
          src={`https://www.youtube.com/embed/${movie.preview.videos[0].key}`}
          title="Trailer"
          allowFullScreen
        ></iframe>
      )}

      {/* Reviews */}
      {movie.preview?.reviews.map((review, index) => (
        <div key={index} className="review mt-2">
          <p className="font-semibold">{review.author}</p>
          <p>{review.content}</p>
        </div>
      ))}

      {/* Similar Movies */}
      <div className="similar-movies mt-4">
        <h4 className="text-lg font-bold mb-2">Similar Movies</h4>
        <div className="flex overflow-x-auto space-x-4">
          {movie.preview?.similarMovies.map((similarMovie) => (
            <div key={similarMovie.id} className="similar-movie-card w-40">
              <img
                src={`https://image.tmdb.org/t/p/w200${similarMovie.poster_path}`}
                alt={similarMovie.title}
                className="w-full h-auto rounded-md"
              />
              <p className="text-sm mt-1 text-center">{similarMovie.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
