import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchMovieDetails } from "../store/thunks/fetchMovieDetails";
import { RootState, AppDispatch } from "../store";
import Loading from "../components/Loading";
import Error from "../components/Error";
import NoItemsFound from "../components/NoItemsFound";
import Videos from "../components/Videos";
import Reviews from "../components/Reviews";
import SimilarMovies from "../components/SimilarMovies";

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { selectedMovie, loading, error } = useSelector(
    (state: RootState) => state.movies
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchMovieDetails(Number(id)));
    }
  }, [dispatch, id]);

  return (
    <div className="movie-details p-6 bg-gray-100 min-h-screen">
      {loading && <Loading />}
      {error && <Error message={error} />}
      {!loading && !selectedMovie && <NoItemsFound />}

      {selectedMovie && (
        <>
          <section className="mb-8 bg-white p-6 rounded-md shadow-sm border border-gray-200">
            <h1 className="text-3xl font-bold mb-4">{selectedMovie.title}</h1>
            <p className="text-lg text-gray-700 leading-relaxed">
              {selectedMovie.overview}
            </p>
          </section>
          <Videos videos={selectedMovie.videos?.results || []} />

          <Reviews reviews={selectedMovie.reviews?.results || []} />

          <SimilarMovies similarMovies={selectedMovie.similar?.results || []} />
        </>
      )}
    </div>
  );
};

export default MovieDetails;
