import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../store/moviesSlice";
import { RootState } from "../store";

const SearchBar: React.FC = () => {
  const dispatch = useDispatch();
  const { searchQuery } = useSelector((state: RootState) => state.movies);

  const [localQuery, setLocalQuery] = useState(searchQuery);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (localQuery !== searchQuery) {
        dispatch(setSearchQuery(localQuery));
      }
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [localQuery, searchQuery, dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalQuery(e.target.value);
  };

  return (
    <div className="bg-gray-800 p-4 sticky top-0 z-10">
      <input
        type="text"
        placeholder="Search movies..."
        value={localQuery}
        onChange={handleInputChange}
        className="border p-2 rounded-md w-full"
      />
    </div>
  );
};

export default SearchBar;
