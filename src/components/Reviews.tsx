import React from "react";

interface Review {
  author: string;
  content: string;
}

interface ReviewsProps {
  reviews: Review[];
}

const Reviews: React.FC<ReviewsProps> = ({ reviews }) => {
  if (!reviews.length)
    return (
      <section className="mb-8 bg-gray-50 p-6 rounded-md shadow-sm border border-gray-200">
        <h2 className="text-2xl font-semibold mb-4 border-b-4 border-gray-200">
          No reviews available right now.
        </h2>
      </section>
    );

  return (
    <section className="mb-8 bg-gray-50 p-6 rounded-md shadow-sm border border-gray-200">
      <h2 className="text-2xl font-semibold mb-4 border-b-4 border-gray-200">
        Review
      </h2>
      <div className="reviews mt-4">
        {reviews.slice(0, 2).map((review, index) => (
          <div
            key={index}
            className="review p-4 border border-gray-200 rounded-md shadow-md mb-4"
          >
            <p className="font-semibold text-lg">Author: {review.author}</p>
            <p className="text-gray-700 mt-2">{review.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;
