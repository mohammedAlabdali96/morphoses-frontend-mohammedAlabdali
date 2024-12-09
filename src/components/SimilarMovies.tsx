import React from "react";
import { useNavigate } from "react-router-dom";

interface SimilarMovie {
  id: number;
  title: string;
  poster_path: string;
}

interface SimilarMoviesProps {
  similarMovies: SimilarMovie[];
}

const SimilarMovies: React.FC<SimilarMoviesProps> = ({ similarMovies }) => {
  const navigate = useNavigate();

  if (!similarMovies.length)
    return (
      <section className="mb-8 bg-gray-50 p-6 rounded-md shadow-sm border border-gray-200">
        <h2 className="text-2xl font-semibold mb-4 border-b-4 border-gray-200">
          No similar movies available right now.
        </h2>
      </section>
    );

  return (
    <section className="mb-8 bg-gray-50 p-6 rounded-md shadow-sm border border-gray-200">
      <h2 className="text-2xl font-semibold mb-4 border-b-4 border-gray-200">
        Similar Movies
      </h2>
      <div className="relative">
        {/* Scrollable Container */}
        <div className="flex overflow-x-auto space-x-4 scrollbar-hide justify-center items-start">
          {similarMovies.map((movie) => (
            <div
              key={movie.id}
              className="similar-movie-card cursor-pointer border border-gray-300 p-4 rounded-md shadow-sm hover:shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-gray-100 flex-shrink-0"
              onClick={() => navigate(`/movies/${movie.id}`)}
              style={{ minWidth: "150px", textAlign: "center" }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-40 object-cover rounded-md"
              />
              <p className="text-sm mt-2 font-medium">{movie.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SimilarMovies;
