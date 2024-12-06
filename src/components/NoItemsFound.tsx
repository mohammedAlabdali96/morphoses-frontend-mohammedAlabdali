import React from "react";

const NoItemsFound: React.FC = () => {
  return (
    <div className="text-center text-gray-500 mt-8">
      <p>No items found. Try adjusting your search.</p>
    </div>
  );
};

export default NoItemsFound;
