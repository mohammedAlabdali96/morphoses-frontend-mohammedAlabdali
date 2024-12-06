import React from "react";

interface ErrorProps {
  message?: string;
}

const Error: React.FC<ErrorProps> = ({ message }) => {
  return (
    <div className="text-center text-red-600 mt-8">
      <p>{message || "Something went wrong. Please try again later."}</p>
    </div>
  );
};

export default Error;
