import React, { useState } from 'react';
import './../styles/App.css';

const API_KEY = '99eb9fd1';
const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}&`;

function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = () => {
    setError('');
    fetch(`${API_URL}s=${query}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.Response === 'True') {
          setMovies(data.Search);
        } else {
          setMovies([]);
          setError('Invalid movie name. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError('An error occurred while fetching data. Please try again later.');
      });
  };

  return (
    <div className="app">
      <h1>Movie Search</h1>
      <div className="search-bar">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {error && <p className="error">{error}</p>}
      <div className="movies">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="movie">
            <img src={movie.Poster} alt={movie.Title} />
            <div>
              <h3>{movie.Title}</h3>
              <p>{movie.Year}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
