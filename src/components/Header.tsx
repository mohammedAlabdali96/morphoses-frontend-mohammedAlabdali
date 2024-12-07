import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white p-4 sticky top-0 z-10 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="px-4 py-2 bg-white text-blue-600 rounded-md shadow hover:bg-gray-100 transition duration-200"
        >
          <h1 className="text-xl font-bold">🎬 Movie Explorer</h1>
        </Link>
      </div>
    </header>
  );
};

export default Header;
