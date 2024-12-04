import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from './store/moviesSlice';
import { RootState, AppDispatch } from './store';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { movies, genres, status } = useSelector((state: RootState) => state.movies);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMovies());
    }
  }, [dispatch, status]);

  useEffect(() => {
    console.log('Movies:', movies);
    console.log('Genres:', genres);
  }, [movies, genres]);

  return (
    <div className="App">
      <h1 className="text-2xl font-bold text-center my-4">Now Playing Movies</h1>
      <p>Status: {status}</p>
    </div>
  );
};

export default App;
