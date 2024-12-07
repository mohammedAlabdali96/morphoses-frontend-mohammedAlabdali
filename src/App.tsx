import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieList from "./pages/NowPlaying";
import MovieDetails from "./pages/MovieDetails";
import Header from "./components/Header";

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<MovieList />} />
            <Route path="/movies/:id" element={<MovieDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
