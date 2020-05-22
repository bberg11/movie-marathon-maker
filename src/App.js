/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';

const TMDB_BASE_API_URL = 'https://api.themoviedb.org/3';
const TMDB_BASE_IMAGE_URL = '//image.tmdb.org/t/p';
const API_KEY = 'c61ec07a6f7727aa86819578ff11a754';

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState();

  const formatResults = async ({ data }) => {
    let enhancedResults = [];
    const fullDetailRequests = [];

    for (const movie of data.results) {
      fullDetailRequests.push(
        axios.get(`${TMDB_BASE_API_URL}/movie/${movie.id}?api_key=${API_KEY}`)
      );
    }

    const fullDetailResponses = await Promise.all(fullDetailRequests);

    enhancedResults = fullDetailResponses.map((response) => response.data);

    setResults(enhancedResults);
  };

  const getMovies = () => {
    return axios.get(
      `${TMDB_BASE_API_URL}/search/movie?api_key=${API_KEY}&query=${query}`
    );
  };

  const handleChange = (event) => {
    setQuery(event.target.value);

    getMovies().then(({ data: { results: movies } }) => setResults(movies));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    getMovies().then(formatResults);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="search">Search</label>
        </div>
        <div>
          <input
            type="text"
            id="search"
            value={query}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Search</button>
      </form>
      <div>
        {results &&
          results.map((movie) => (
            <div key={movie.id}>
              {movie.poster_path ? (
                <img
                  src={`${TMDB_BASE_IMAGE_URL}/w185${movie.poster_path}`}
                  alt={`${movie.title} Movie Poster`}
                />
              ) : (
                ''
              )}
              <p>{movie.title}</p>
              <p>{movie.overview}</p>
              <p>{movie.runtime}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
