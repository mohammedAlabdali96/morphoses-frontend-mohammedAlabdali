import React from 'react';
import NowPlaying from './pages/NowPlaying';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="bg-blue-600 text-white text-center py-4">
        <h1 className="text-2xl font-bold">Now Playing Movies</h1>
      </header>
      <main>
        <NowPlaying />
      </main>
    </div>
  );
};

export default App;
