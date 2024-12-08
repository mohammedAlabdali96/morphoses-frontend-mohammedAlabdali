import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieList from "./pages/NowPlaying";
import Header from "./components/Header";

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<MovieList />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
