import React from "react";
import Videos from "../components/Videos";
import Reviews from "../components/Reviews";
import SimilarMovies from "../components/SimilarMovies";
import Loading from "../components/Loading";

interface ExpandedMovieDetailsProps {
  movieId: number;
  expandedMovieDetails: any;
  loadingDetails: boolean;
  onClose: () => void;
}

const ExpandedMovieDetails: React.FC<ExpandedMovieDetailsProps> = ({
  movieId,
  expandedMovieDetails,
  loadingDetails,
  onClose,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-md shadow-md p-6 w-full relative">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full shadow-md hover:bg-red-700 transition"
      >
        Close
      </button>

      {/* Scrollable Content */}
      <div className="overflow-y-auto max-h-[400px] p-4">
        {loadingDetails ? (
          <Loading />
        ) : expandedMovieDetails ? (
          <>
            <Videos videos={expandedMovieDetails.videos?.results || []} />
            <Reviews reviews={expandedMovieDetails.reviews?.results || []} />
            <SimilarMovies
              similarMovies={expandedMovieDetails.similar?.results || []}
            />
          </>
        ) : (
          <p className="text-center">No details available.</p>
        )}
      </div>
    </div>
  );
};

export default ExpandedMovieDetails;
