import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MovieList from "./pages/NowPlaying";
import MovieDetails from "./pages/MovieDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
