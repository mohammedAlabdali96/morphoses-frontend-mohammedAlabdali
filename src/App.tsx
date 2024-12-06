import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieList from "./pages/NowPlaying";
// import Search from "./pages/Search";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MovieList />} />
        {/* <Route path="/search" element={<Search />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
