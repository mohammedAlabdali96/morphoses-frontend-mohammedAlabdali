import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../store/moviesSlice";
import { RootState } from "../store";

const SearchBar: React.FC = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state: RootState) => state.movies.searchQuery);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <header className="bg-gray-800 p-4 sticky top-0 z-10">
      <input
        type="text"
        placeholder="Search movies..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="border p-2 rounded-md w-full"
      />
    </header>
  );
};

export default SearchBar;
